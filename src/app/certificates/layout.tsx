import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "প্রত্যয়নপত্র ও সনদপত্র মেকার | প্রাথমিক পাঠশালা",
  description:
    "বাংলাদেশ প্রাথমিক বিদ্যালয়ের শিক্ষার্থীদের জন্য সরকারি ফরম্যাটে প্রত্যয়নপত্র ও সনদপত্র তৈরি, কাস্টমাইজ, প্রিন্ট ও PDF ডাউনলোড স্টুডিও।",
  keywords: [
    "প্রত্যয়নপত্র মেকার",
    "সনদপত্র মেকার",
    "প্রাথমিক বিদ্যালয় প্রত্যয়নপত্র",
    "Primary School Certificate",
    "Testimonial Maker",
    "A4 Certificate Maker Bangladesh"
  ],
  openGraph: {
    title: "প্রত্যয়নপত্র ও সনদপত্র মেকার | প্রাথমিক পাঠশালা",
    description:
      "৫টি সরকারি ফরম্যাটে প্রাথমিক বিদ্যালয়ের শিক্ষার্থীদের জন্য প্রিন্ট-রেডি প্রত্যয়নপত্র ও সনদপত্র তৈরি করুন।"
  }
};

export default function CertificatesLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return children;
}
