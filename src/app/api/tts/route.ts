import { NextRequest, NextResponse } from "next/server";
import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";

// In-memory LRU cache for lightning-fast, zero-latency repeated requests
const audioCache = new Map<string, { buffer: Uint8Array; contentType: string }>();
const MAX_CACHE_ENTRIES = 500;

// Persistent MsEdgeTTS client instances for connection reuse
const edgeClients = new Map<string, { client: MsEdgeTTS; readyPromise: Promise<void> | null }>();

// Circuit breaker state to avoid hanging if Microsoft Edge TTS experiences network throttling
let consecutiveEdgeFailures = 0;
let circuitOpenUntil = 0;
const MAX_CONSECUTIVE_FAILURES = 2;
const CIRCUIT_OPEN_COOLDOWN_MS = 60 * 1000; // 1 minute fast-failover

function getOrCreateEdgeClient(voiceName: string): { client: MsEdgeTTS; ready: Promise<void> } {
  let entry = edgeClients.get(voiceName);
  if (!entry) {
    const client = new MsEdgeTTS({ connectionTimeoutMs: 2500 });
    const ready = client.setMetadata(voiceName, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    entry = { client, readyPromise: ready };
    edgeClients.set(voiceName, entry);
  }
  return { client: entry.client, ready: entry.readyPromise! };
}

function resetEdgeClient(voiceName: string) {
  edgeClients.delete(voiceName);
}

function sanitizeTextForTTS(raw: string): string {
  return raw
    .replace(/&/g, " এবং ")
    .replace(/[<>{}[\]\\/]/g, " ")
    .replace(/["'“”‘’]/g, "")
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 1500);
}

async function synthesizeEdgeTts(
  text: string,
  voiceName: string,
  options?: { pitch?: string; rate?: string },
  timeoutMs?: number
): Promise<Buffer> {
  const effectiveTimeout = timeoutMs || Math.max(3500, Math.min(8500, text.length * 14));
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`Edge TTS timed out after ${effectiveTimeout}ms`));
    }, effectiveTimeout);

    try {
      const { client, ready } = getOrCreateEdgeClient(voiceName);
      ready
        .then(() => {
          const streamOptions = {
            pitch: options?.pitch || "+2Hz",
            rate: options?.rate || "-4%",
          };
          const { audioStream } = client.toStream(text, streamOptions);
          const chunks: Buffer[] = [];

          audioStream.on("data", (chunk: Buffer) => chunks.push(chunk));
          audioStream.on("end", () => {
            clearTimeout(timer);
            resolve(Buffer.concat(chunks));
          });
          audioStream.on("error", (err: unknown) => {
            clearTimeout(timer);
            resetEdgeClient(voiceName);
            reject(err);
          });
        })
        .catch((err) => {
          clearTimeout(timer);
          resetEdgeClient(voiceName);
          reject(err);
        });
    } catch (err) {
      clearTimeout(timer);
      resetEdgeClient(voiceName);
      reject(err);
    }
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get("text")?.trim();
  const lang = searchParams.get("lang") || "bn-BD";
  const voice = searchParams.get("voice")?.toLowerCase() || "";
  const reqPitch = searchParams.get("pitch");
  const reqRate = searchParams.get("rate");

  if (!text) {
    return NextResponse.json({ error: "Missing text parameter" }, { status: 400 });
  }

  const isBengali = lang.toLowerCase().startsWith("bn");
  const cleanText = sanitizeTextForTTS(text);

  if (!cleanText) {
    return NextResponse.json({ error: "Invalid text parameter after sanitization" }, { status: 400 });
  }

  // Determine Edge Neural voice
  let edgeVoice = "bn-BD-NabanitaNeural";
  if (isBengali) {
    edgeVoice = voice === "pradeep" ? "bn-BD-PradeepNeural" : "bn-BD-NabanitaNeural";
  } else {
    edgeVoice = voice === "guy" ? "en-US-GuyNeural" : "en-US-AnaNeural";
  }

  // Default prosody adjustments for poetic rhythm & sweet child-friendly tone
  const pitch = reqPitch || (isBengali ? "+2Hz" : "+0Hz");
  const rate = reqRate || (isBengali ? "-4%" : "-2%");

  const cacheKey = `${edgeVoice}:${pitch}:${rate}:${cleanText}`;

  // 1. Check in-memory cache first (0ms latency)
  if (audioCache.has(cacheKey)) {
    const cached = audioCache.get(cacheKey)!;
    return new NextResponse(cached.buffer as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": cached.contentType,
        "Cache-Control": "public, max-age=604800, s-maxage=604800, immutable",
        "Accept-Ranges": "bytes",
      },
    });
  }

  const isCircuitOpen = Date.now() < circuitOpenUntil;

  // 2. Try Microsoft Edge Neural Voice (if circuit is closed)
  if (!isCircuitOpen) {
    try {
      const audioBuffer = await synthesizeEdgeTts(cleanText, edgeVoice, { pitch, rate });

      if (audioBuffer && audioBuffer.length > 500) {
        consecutiveEdgeFailures = 0; // Reset failure count on success
        const uint8 = new Uint8Array(audioBuffer);

        if (audioCache.size >= MAX_CACHE_ENTRIES) {
          const oldestKey = audioCache.keys().next().value;
          if (oldestKey) audioCache.delete(oldestKey);
        }
        audioCache.set(cacheKey, { buffer: uint8, contentType: "audio/mpeg" });

        return new NextResponse(uint8 as unknown as BodyInit, {
          status: 200,
          headers: {
            "Content-Type": "audio/mpeg",
            "Cache-Control": "public, max-age=604800, s-maxage=604800, immutable",
            "Accept-Ranges": "bytes",
          },
        });
      }
    } catch {
      consecutiveEdgeFailures++;
      if (consecutiveEdgeFailures >= MAX_CONSECUTIVE_FAILURES) {
        circuitOpenUntil = Date.now() + CIRCUIT_OPEN_COOLDOWN_MS;
      }
      resetEdgeClient(edgeVoice);
    }
  }

  // 3. Ultra-fast Secondary Fallback: Google Cloud TTS Proxy (~180ms latency)
  try {
    const tl = isBengali ? "bn" : "en";
    const fallbackText = cleanText.slice(0, 180);
    const googleTtsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(
      fallbackText
    )}&tl=${tl}&client=tw-ob`;

    const response = await fetch(googleTtsUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Referer: "https://translate.google.com/",
      },
      next: { revalidate: 604800 },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `TTS upstream returned status ${response.status}` },
        { status: 502 }
      );
    }

    const contentType = response.headers.get("content-type") || "audio/mpeg";
    const buffer = await response.arrayBuffer();
    const uint8 = new Uint8Array(buffer);

    if (audioCache.size >= MAX_CACHE_ENTRIES) {
      const oldestKey = audioCache.keys().next().value;
      if (oldestKey) audioCache.delete(oldestKey);
    }
    audioCache.set(cacheKey, { buffer: uint8, contentType });

    return new NextResponse(uint8 as unknown as BodyInit, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=604800, s-maxage=604800, immutable",
        "Accept-Ranges": "bytes",
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal TTS generation error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
