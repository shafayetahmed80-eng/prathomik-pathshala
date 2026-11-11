export type PdfResourceType = "textbook" | "teachers_guide";

export const CLASS_FOLDER_MAP: Record<string, string> = {
  "pre-primary": "Pre_Primary",
  "class-1": "Class_1",
  "class-2": "Class_2",
  "class-3": "Class_3",
  "class-4": "Class_4",
  "class-5": "Class_5",
};

/**
 * Exact object-key overrides for the 8 curriculum entries whose on-disk PDF
 * filenames differ from their display titles in `CLASSES_DATA`.
 */
const PDF_KEY_OVERRIDES: Record<string, string> = {
  "class-1::teachers_guide::বাংলা শিক্ষক সহায়িকা": "Class_1/শিক্ষক সহায়িকা/বাংলা.pdf",
  "class-1::teachers_guide::English Teacher's Guide": "Class_1/শিক্ষক সহায়িকা/ইংরেজি.pdf",
  "class-1::teachers_guide::গণিত শিক্ষক সহায়িকা": "Class_1/শিক্ষক সহায়িকা/প্রাথমিক গণিত.pdf",
  "class-1::teachers_guide::শিল্পকলা শিক্ষক সহায়িকা": "Class_1/শিক্ষক সহায়িকা/শিল্পকলা.pdf",
  "class-2::teachers_guide::বাংলা শিক্ষক সহায়িকা": "Class_2/শিক্ষক সহায়িকা/বাংলা.pdf",
  "class-2::teachers_guide::English Teacher's Guide": "Class_2/শিক্ষক সহায়িকা/ইংরেজি.pdf",
  "class-2::teachers_guide::গণিত শিক্ষক সহায়িকা": "Class_2/শিক্ষক সহায়িকা/প্রাথমিক গণিত.pdf",
  "class-2::teachers_guide::শিল্পকলা শিক্ষক সহায়িকা": "Class_2/শিক্ষক সহায়িকা/শিল্পকলা.pdf",
};

function stripDirectory(raw: string): string {
  const parts = raw.split(/[/\\]/);
  return parts[parts.length - 1] || raw;
}

/**
 * Resolves the canonical relative object key inside `NCTB_Primary_Collection_Web`
 * or an external Cloudflare R2 / CDN bucket for a given curriculum book.
 */
export function resolvePdfObjectKey(
  classId: string,
  type: PdfResourceType,
  fileName: string
): string {
  const cleanName = stripDirectory(fileName).replace(/\.pdf$/i, "").trim();
  const overrideKey = `${classId}::${type}::${cleanName}`;
  if (PDF_KEY_OVERRIDES[overrideKey]) {
    return PDF_KEY_OVERRIDES[overrideKey];
  }

  const folderName = CLASS_FOLDER_MAP[classId] || stripDirectory(classId);
  const subFolder = type === "textbook" ? "পাঠ্যবই" : "শিক্ষক সহায়িকা";
  return `${folderName}/${subFolder}/${cleanName}.pdf`;
}

/**
 * URL-encodes each path segment of a CDN object key without encoding slashes.
 */
export function encodePdfObjectKey(objectKey: string): string {
  return objectKey
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

/**
 * Normalizes a configured CDN base URL (e.g. `https://pub-xxx.r2.dev` or
 * `https://books.connecttutorsbd.com`) by trimming whitespace and trailing slashes.
 */
export function normalizeCdnBaseUrl(raw?: string | null): string | null {
  if (!raw) return null;
  const trimmed = raw.trim().replace(/\/+$/, "");
  if (!/^https?:\/\//i.test(trimmed)) return null;
  return trimmed;
}
