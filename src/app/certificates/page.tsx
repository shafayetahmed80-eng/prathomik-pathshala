"use client";

import StudentCertificateStudio from "@/components/StudentCertificateStudio";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function CertificatesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-amber-50/40 via-white to-emerald-50/30 text-slate-900 w-full overflow-x-clip">
      <SiteHeader
        pageTitle="প্রত্যয়নপত্র ও সনদপত্র স্টুডিও"
        pageSubtitle="৫টি সরকারি ফরম্যাটে প্রত্যয়নপত্র, ছাড়পত্র ও প্রশংসা সনদ"
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-6 sm:py-8 print:p-0 print:m-0 print:max-w-none">
        <StudentCertificateStudio />
      </main>

      <SiteFooter />
    </div>
  );
}
