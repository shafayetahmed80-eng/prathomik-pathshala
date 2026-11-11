# ☁️ Cloudflare R2 PDF CDN Architecture & Setup Guide
### প্রাথমিক পাঠশালা • ৯০টি সরকারি পিডিএফ বই (~২.৪৮ GB) ক্লাউড হোস্টিং ও আপলোড গাইড

এই ডকুমেন্টটি **প্রাথমিক পাঠশালা** অ্যাপের ৯০টি এনসিটিবি পাঠ্যবই ও শিক্ষক সহায়িকা (মোট সাইজ প্রায় ২,৪৮৪ MB / ২.৪৮ GB) কীভাবে **Cloudflare R2 CDN**-এর মাধ্যমে শূন্য সার্ভার-মেমরি খরচে এবং সুপার-ফাস্ট স্পিডে লাইভ সার্ভ হয়, তার সম্পূর্ণ টেকনিক্যাল ব্যাখ্যা ও ধাপে ধাপে ব্যবহারবিধি।

---

## 🏗️ ১. এই সিস্টেমটি কীভাবে কাজ করে? (Architecture)

আমাদের ৯০টি বই ইতিমধ্যেই `scripts/optimize-pdf.mjs` দিয়ে `qpdf --linearize` (**Fast Web View**) ফরম্যাটে অপ্টিমাইজ করা আছে, যার ফলে ৭০ MB সাইজের একটি বড় বইয়েরও প্রথম কয়েক পাতা সম্পূর্ণ ডাউনলোড না হয়েই **১–২ সেকেন্ডে** খুলে যায়।

```text
[ব্রাউজার / মোবাইল রিডার (BookReaderModal.tsx)]
        │
        ├── 1) HEAD /api/pdf?class=...&type=...&file=...
        │        └─► সার্ভার (src/app/api/pdf/route.ts) প্রথমে লোকাল ডিস্কে খোঁজে;
        │            না পেলে NCTB_PDF_CDN_URL থেকে সার্ভার-সাইড HEAD চেক করে 200 বা
        │            X-PDF-Error-Code সহ 404 ফেরত দেয় (ব্রাউজারে কোনো CORS এরর হয় না)।
        │
        └── 2) GET /api/pdf?class=...&type=...&file=...
                 ├─► [লোকাল পিসিতে]: NCTB_Primary_Collection_Web/ থেকে
                 │                  HTTP 200 / 206 Byte-Range স্ট্রিম করে।
                 │
                 └─► [লাইভ cPanel সার্ভারে]: কোনোকিছু প্রক্সি না করে সরাসরি
                     HTTP 307 Redirect দিয়ে Cloudflare R2 CDN-এ পাঠিয়ে দেয়
                     (cPanel Node.js সার্ভারের RAM/Bandwidth ০% খরচ হয়!)।
```

### সংশ্লিষ্ট গুরুত্বপূর্ণ ফাইলসমূহ:
| ফাইল | কাজ |
| :--- | :--- |
| [`src/data/pdfManifest.ts`](src/data/pdfManifest.ts) | `CLASSES_DATA`-এর সব ৯০টি বইকে নির্ভুল R2 অবজেক্ট কী-তে রূপান্তর (`resolvePdfObjectKey`), যার মধ্যে ১ম ও ২য় শ্রেণির ৮টি শিক্ষক সহায়িকার বিশেষ নাম-ওভাররাইডও অন্তর্ভুক্ত। |
| [`src/app/api/pdf/route.ts`](src/app/api/pdf/route.ts) | `HEAD` ও `GET` হ্যান্ডলার; লোকাল ডিস্ক অগ্রাধিকার দিয়ে রানটাইম এনভায়রনমেন্ট ভেরিয়েবল `NCTB_PDF_CDN_URL` (বা `NCTB_PDF_BASE_URL` / `NEXT_PUBLIC_PDF_CDN_URL`) অনুযায়ী `307 Redirect` করে। |
| [`src/components/BookReaderModal.tsx`](src/components/BookReaderModal.tsx) | ইন-ব্রাউজার রিডার মডাল; ফাইল অনুপস্থিত থাকলে (`PDF_STORAGE_NOT_CONFIGURED` / `CDN_FILE_MISSING`) পরিচ্ছন্ন বাংলা বার্তা ও `nctb.portal.gov.bd` লিংক দেখায়। |
| [`scripts/upload-r2.mjs`](scripts/upload-r2.mjs) | শূন্য-ডিপেন্ডেন্সি Node.js AWS SigV4 আপলোডার; `.env.r2` থেকে ক্রেডেনশিয়াল পড়ে রিজিউমেবল মোডে ৯০টি বই R2-তে আপলোড করে। |

---

## 💰 ২. Cloudflare R2 ফ্রি প্ল্যান সুবিধা ও আমাদের হিসাব

| সুবিধা | মাসিক ফ্রি কোটা | আমাদের প্রকল্পের প্রয়োজন |
| :--- | :--- | :--- |
| **স্টোরেজ (Storage)** | **১০ GB / মাস** | **২.৪৮ GB** (মোট ফ্রি কোটার মাত্র ~২৫%) |
| **ডাউনলোড ট্রাফিক (Zero Egress)** | **আনলিমিটেড ফ্রি (`$0`)** | শিক্ষার্থীরা যত হাজার GB পড়ুক ব্যান্ডউইথ ফি নেই |
| **Class A Operations (Upload / PUT)** | **১০ লক্ষ / মাস** | প্রথমবার ৯০টি বই আপলোডে মাত্র ~১৮০টি খরচ হয় |
| **Class B Operations (Read / GET, HEAD)** | **১ কোটি / মাস** | মাসে লক্ষ লক্ষ বই খোলা ও পড়া ফ্রি কোটার ভেতরেই থাকে |

> **সতর্কতা:** R2 চালু করার সময় কার্ড/PayPal ভেরিফিকেশন লাগে, কিন্তু ফ্রি কোটার ভেতরে মাসিক ফি **`$0`** থাকে। পরবর্তীতে চাইলে `r2.dev`-এর বদলে কাস্টম ডোমেইন (`books.connecttutorsbd.com`) যুক্ত করে Cloudflare Edge Cache ও WAF সুরক্ষা নেওয়া যাবে।

---

## 🚀 ৩. সব ৯০টি বই লাইভ করার ৩টি সহজ ধাপ

### ধাপ ১: Cloudflare R2 Bucket তৈরি ও Public Access চালু
1. [Cloudflare Dashboard](https://dash.cloudflare.com/)-এ লগইন করে বাম মেনু থেকে **R2 Object Storage**-এ যান (প্রয়োজন হলে ফ্রি R2 সাবস্ক্রিপশন অ্যাক্টিভেট করুন)।
2. **Create bucket** বাটনে ক্লিক করে বাকেটের নাম দিন (যেমন: `pathshala-books`) এবং Create করুন।
3. বাকেটের ভেতরে **Settings** ট্যাবে গিয়ে **Public Development URL (`r2.dev`)** অংশ থেকে **Enable** করুন *(অথবা Custom Domain হিসেবে `books.connecttutorsbd.com` যুক্ত করুন)*।
4. প্রাপ্ত **Public URL** টি কপি করে রাখুন (উদাহরণ: `https://pub-xxxxxxxxxxxxxxxx.r2.dev`)।

### ধাপ ২: API Token তৈরি ও পিসি থেকে ৯০টি বই আপলোড
1. Cloudflare R2 Overview পেজ থেকে **Manage R2 API Tokens** → **Create API Token** দিন:
   - **Permissions:** `Object Read & Write`
   - **Specify bucket(s):** `pathshala-books` (অথবা All buckets)
2. টোকেন তৈরির পর **Account ID**, **Access Key ID**, ও **Secret Access Key** কপি করুন।
3. আপনার লোকাল প্রজেক্ট ফোল্ডারে (`c:\Projects\prathomik-pathshala\.env.r2`) ফাইলটি তৈরি করুন *(নোট: `.gitignore`-এ `.env*` থাকায় এই ফাইল কখনো GitHub-এ আপলোড হবে না)*:
   ```env
   R2_ACCOUNT_ID=আপনার_cloudflare_account_id
   R2_ACCESS_KEY_ID=আপনার_r2_access_key_id
   R2_SECRET_ACCESS_KEY=আপনার_r2_secret_access_key
   R2_BUCKET_NAME=pathshala-books
   ```
4. প্রজেক্ট রুটে টার্মিনাল খুলে প্রথমে ড্রাই-রান এবং এরপর আসল আপলোড চালান:
   ```bash
   # ১) তালিকা যাচাই (কোনো ফাইল আপলোড না করে)
   node scripts/upload-r2.mjs --dry-run

   # ২) সব ৯০টি বই (২.৪৮ GB) Cloudflare R2-তে আপলোড শুরু
   node scripts/upload-r2.mjs
   ```
   > **টিপস:** আপলোড চলাকালীন ইন্টারনেট সংযোগ বিচ্ছিন্ন হলে ভয়ের কিছু নেই—পুনরায় `node scripts/upload-r2.mjs` চালালে স্ক্রিপ্টটি `HEAD` রিকোয়েস্ট দিয়ে ইতিমধ্যে আপলোড হওয়া বইগুলো `Skip` করে কেবল বাকি বইগুলোই আপলোড করবে!

### ধাপ ৩: cPanel সার্ভার আপডেট ও CDN লিংক সংযুক্তি (কোনো কোড রিবিল্ড ছাড়াই)
1. cPanel Terminal-এ লগইন করে সর্বশেষ `main` কোড নামান:
   ```bash
   bind 'set enable-bracketed-paste off'
   bash ~/pathshala_app/update.sh
   ```
2. cPanel ড্যাশবোর্ডে **Setup Node.js App** → আপনার অ্যাপ (`PATHSHALA.CONNECTTUTORSBD.COM`) খুলে নিচে **Environment variables** সেকশনে **ADD VARIABLE** ক্লিক করুন:
   - **Name:** `NCTB_PDF_CDN_URL`
   - **Value:** `https://pub-xxxxxxxxxxxxxxxx.r2.dev` *(শেষে কোনো `/` দেবেন না)*
3. উপরে ডানে **SAVE** বাটনে ক্লিক করে এরপর **RESTART** বাটনে চাপুন।
4. [https://pathshala.connecttutorsbd.com/books](https://pathshala.connecttutorsbd.com/books) ভিজিট করে যেকোনো বই খুলুন—সাথে সাথেই বই পড়া ও ডাউনলোড শুরু হয়ে যাবে!

### ব্রাউজার থেকে সরাসরি Range স্ট্রিমিং (R2 CORS) চালু করা (ঐচ্ছিক কিন্তু প্রস্তাবিত)

অ্যাপের ইন-অ্যাপ PDF.js রিডার R2-এর CORS চালু না থাকলেও স্বয়ংক্রিয়ভাবে সার্ভার প্রক্সি (`&proxy=1`) হয়ে কাজ করে। তবে R2 বাকেটে CORS চালু থাকলে ব্রাউজার সরাসরি Cloudflare CDN থেকে ২৫৬ KB রেঞ্জ চাঙ্ক নিতে পারে, ফলে মোবাইলে পেজ আরও দ্রুত লোড হয় এবং সার্ভারের ব্যান্ডউইথ বাঁচে:

```bash
node scripts/upload-r2.mjs --setup-cors
```

---

## 🔧 ৪. ভবিষ্যতে বই আপডেট বা ট্রাবলশুটিং

- **নতুন বা সংশোধিত বই আপলোড করলে:**  
  `NCTB_Primary_Collection_Web/` ফোল্ডারে নতুন `.pdf` ফাইলটি রাখুন। বইয়ের নাম [`src/data/curriculum.ts`](src/data/curriculum.ts)-এর নামের সাথে হুবহু না মিললে [`src/data/pdfManifest.ts`](src/data/pdfManifest.ts)-এর `PDF_KEY_OVERRIDES`-এ যুক্ত করুন। এরপর `node scripts/upload-r2.mjs` চালালেই আপডেট হয়ে যাবে।
- **লাইভ স্ট্যাটাস পরীক্ষা করার উপায়:**  
  ব্রাউজার বা টার্মিনালে নিচের যেকোনো URL-এ `HEAD`/`GET` রিকোয়েস্ট দিয়ে তাৎক্ষণিক অবস্থা জানা যাবে:
  - `GET /api/pdf?class=class-1&type=textbook&file=আমার%20বাংলা%20বই` → সঠিকভাবে সেটআপ থাকলে `307 Redirect` হয়ে সরাসরি R2 URL-এ নিয়ে যাবে।
  - `HEAD /api/pdf?...` → `X-PDF-Source: cloudflare-r2` হেডারসহ `200 OK` দেখাবে; আর লিংক সেট না থাকলে `X-PDF-Error-Code: PDF_STORAGE_NOT_CONFIGURED` বা ফাইল না থাকলে `X-PDF-Error-Code: CDN_FILE_MISSING` দেখাবে।
