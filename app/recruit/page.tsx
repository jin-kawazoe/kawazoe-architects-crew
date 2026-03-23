import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RecruitForm from "./RecruitForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "採用エントリー | 河添建築事務所 KAWAZOE CREW",
  description:
    "河添建築事務所（高松・東京）の採用エントリー。意匠設計・CADオペレーター・設計アシスタントを募集。未経験・第二新卒歓迎。建築への熱量がある方のご応募お待ちしています。",
};

const jobPostingSchema = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: "建築設計スタッフ（意匠設計 / CADオペレーター / 設計アシスタント）",
  description:
    "河添建築事務所にて建築設計業務をともに進めるスタッフを募集しています。意匠設計・CADオペレーター・設計アシスタント・模型製作など。経験・資格よりも、建築に向き合う姿勢と自分の頭で考えようとする人柄を重視しています。未経験・第二新卒も歓迎。",
  datePosted: "2026-01-01",
  employmentType: ["FULL_TIME", "PART_TIME", "OTHER"],
  hiringOrganization: {
    "@type": "Organization",
    name: "河添建築事務所",
    sameAs: "https://kawazoe-architects.com",
    logo: "https://kawazoe-architects.com/crew/favicon.ico",
  },
  jobLocation: [
    {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "高松市",
        addressRegion: "香川県",
        addressCountry: "JP",
      },
    },
    {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "東京都",
        addressCountry: "JP",
      },
    },
  ],
  baseSalary: {
    "@type": "MonetaryAmount",
    currency: "JPY",
    value: {
      "@type": "QuantitativeValue",
      description: "経験・スキルに応じて応相談",
    },
  },
  qualifications: "建築への熱量がある方。未経験・第二新卒歓迎。",
  skills: "建築設計、CAD、模型製作",
  industry: "建築設計",
  occupationalCategory: "建築・設計",
  applicantLocationRequirements: {
    "@type": "Country",
    name: "JP",
  },
  directApply: true,
  url: "https://kawazoe-architects.com/crew/recruit/",
};

export default function RecruitPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f7]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }}
      />
      <Header />

      <main className="flex-1">

        {/* ページヘッダー */}
        <section className="border-b border-[#c4beb5]" style={{ background: "#f0eeeb" }}>
          <div className="max-w-4xl mx-auto px-8 py-16 sm:py-20">
            <div className="flex items-center gap-3 mb-8">
              <Link
                href="/"
                className="text-[10px] tracking-[0.25em] text-[#c4beb5] hover:text-[#a67c52] transition-colors font-[family-name:var(--font-jost)]"
              >
                CREW
              </Link>
              <span className="text-[#c4beb5] text-xs">—</span>
              <span className="text-[10px] tracking-[0.25em] text-[#a67c52] font-[family-name:var(--font-jost)]">
                RECRUIT
              </span>
            </div>
            <h1
              className="text-4xl sm:text-6xl font-light text-[#0a0a0a] leading-tight mb-8"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              建築の仕事に、<br />
              本気で向き合う人へ。
            </h1>
            <p className="text-sm text-[#7a756d] leading-loose max-w-xl font-[family-name:var(--font-jost)] font-light">
              高松または東京のオフィスで、設計業務をともに進めるスタッフを募集しています。
              経験・資格よりも、建築に向き合う姿勢と
              自分の頭で考えようとする人柄を重視しています。
            </p>
          </div>
        </section>

        {/* 説明セクション */}
        <section className="border-b border-[#c4beb5]">
          <div className="max-w-4xl mx-auto px-8 py-14 grid sm:grid-cols-3 gap-10">
            <div>
              <p className="text-[10px] tracking-[0.3em] text-[#a67c52] mb-4 font-[family-name:var(--font-jost)]">
                POSITION
              </p>
              <p
                className="text-lg font-light text-[#0a0a0a] mb-3 leading-snug"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                募集職種
              </p>
              <p className="text-xs text-[#7a756d] font-[family-name:var(--font-jost)] font-light leading-loose">
                意匠設計 / CADオペレーター / 設計アシスタント / 模型製作 / その他<br /><br />
                正社員・アルバイト応相談。<br />
                就業時期・条件は柔軟に対応します。
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] text-[#a67c52] mb-4 font-[family-name:var(--font-jost)]">
                OFFICE
              </p>
              <p
                className="text-lg font-light text-[#0a0a0a] mb-3 leading-snug"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                拠点
              </p>
              <p className="text-xs text-[#7a756d] font-[family-name:var(--font-jost)] font-light leading-loose">
                <span className="text-[#0a0a0a]">高松オフィス</span><br />
                香川県高松市<br /><br />
                <span className="text-[#0a0a0a]">東京オフィス</span><br />
                東京都内
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] text-[#a67c52] mb-4 font-[family-name:var(--font-jost)]">
                CULTURE
              </p>
              <p
                className="text-lg font-light text-[#0a0a0a] mb-3 leading-snug"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                求める人物像
              </p>
              <p className="text-xs text-[#7a756d] font-[family-name:var(--font-jost)] font-light leading-loose">
                指示を待つのではなく、自分なりの視点を持って
                プロジェクトに関われる人。
                未経験・第二新卒も歓迎。
                建築への熱量があれば十分です。
              </p>
            </div>
          </div>
        </section>

        {/* フォーム */}
        <section className="max-w-4xl mx-auto px-8 py-16">
          <p className="text-[10px] tracking-[0.3em] text-[#a67c52] mb-10 font-[family-name:var(--font-jost)]">
            ENTRY FORM
          </p>
          <RecruitForm />
        </section>

      </main>

      <Footer />
    </div>
  );
}
