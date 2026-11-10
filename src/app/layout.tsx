import type { Metadata, Viewport } from "next";
import PwaBootstrap from "@/components/PwaBootstrap";
import "./globals.css";

export const metadata: Metadata = {
  title: "প্রাথমিক পাঠশালা | Prathomik Pathshala",
  description: "বাংলাদেশের প্রাক-প্রাথমিক থেকে ৫ম শ্রেণির শিক্ষার্থী ও শিক্ষকদের জন্য আধুনিক, ইন্টারঅ্যাক্টিভ ও আনন্দময় শিক্ষামূলক প্ল্যাটফর্ম।",
  applicationName: "প্রাথমিক পাঠশালা",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "প্রাথমিক পাঠশালা",
  },
  icons: {
    icon: [
      { url: "/pwa-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/pwa-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#059669",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anek+Bangla:wght@400;500;600;700&family=Atma:wght@400;600;700&family=Hind+Siliguri:wght@400;500;600;700&family=Mina:wght@400;700&family=Noto+Sans+Bengali:wght@400;600;700&family=Noto+Serif+Bengali:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var p = localStorage.getItem('pp_paper_mode');
                if (p === 'true') document.documentElement.classList.add('paper-mode');
                var f = localStorage.getItem('pp_active_font_id');
                var s = localStorage.getItem('pp_active_font_size_id');
                var fontMap = {
                  'hind-siliguri': "'Hind Siliguri', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  'kalpurush': "'Kalpurush', 'SolaimanLipi', 'Hind Siliguri', sans-serif",
                  'noto-sans': "'Noto Sans Bengali', -apple-system, BlinkMacSystemFont, sans-serif",
                  'atma': "'Atma', cursive, sans-serif",
                  'anek-bangla': "'Anek Bangla', sans-serif",
                  'mina': "'Mina', sans-serif",
                  'noto-serif': "'Noto Serif Bengali', serif"
                };
                var sizeMap = {
                  'normal': '100%',
                  'medium': '110%',
                  'large': '125%'
                };
                if (f && fontMap[f]) document.documentElement.style.setProperty('--font-active', fontMap[f]);
                if (s && sizeMap[s]) document.documentElement.style.setProperty('--font-scale', sizeMap[s]);
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-slate-50 text-slate-800 antialiased" suppressHydrationWarning>
        <PwaBootstrap />
        {children}
      </body>
    </html>
  );
}
