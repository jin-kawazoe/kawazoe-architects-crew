import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "KAWAZOE CREW | 河添建築事務所 採用・パートナー募集",
    template: "%s | 河添建築事務所",
  },
  description:
    "河添建築事務所（香川・高松 / 東京）の採用エントリー・外部パートナー登録サイト。意匠設計・CADオペレーター・設計アシスタントを募集中。未経験・第二新卒歓迎。フリーランス・業務委託も受付中。",
  keywords: [
    "河添建築事務所", "建築事務所 求人", "建築 採用", "設計事務所 スタッフ募集",
    "高松 建築 求人", "東京 建築 求人", "意匠設計 求人", "CADオペレーター 求人",
    "建築 アルバイト", "設計事務所 アルバイト", "建築 未経験", "第二新卒 建築",
    "建築 パートナー", "建築 業務委託", "フリーランス 建築",
  ],
  openGraph: {
    title: "KAWAZOE CREW | 河添建築事務所 採用・パートナー募集",
    description:
      "河添建築事務所（香川・高松 / 東京）の採用エントリー・外部パートナー登録サイト。未経験・第二新卒歓迎。",
    siteName: "KAWAZOE CREW",
    locale: "ja_JP",
    type: "website",
    url: "https://kawazoe-architects.com/crew/",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://kawazoe-architects.com/crew/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`h-full ${cormorant.variable} ${jost.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PV96M93');`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PV96M93"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
