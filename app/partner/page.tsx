import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PartnerForm from "./PartnerForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "外部パートナー登録 | KAWAZOE CREW",
  description:
    "河添建築事務所の外部パートナーとして登録する。設計・監理・グラフィックなど各分野の専門家を募集しています。",
};

export default function PartnerPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f7]">
      <Header />

      <main className="flex-1">

        {/* ページヘッダー */}
        <section className="border-b border-[#c4beb5] bg-[#0a0a0a]">
          <div className="max-w-4xl mx-auto px-8 py-16 sm:py-20">
            <div className="flex items-center gap-3 mb-8">
              <Link
                href="/"
                className="text-[10px] tracking-[0.25em] text-white/30 hover:text-[#a67c52] transition-colors font-[family-name:var(--font-jost)]"
              >
                CREW
              </Link>
              <span className="text-white/20 text-xs">—</span>
              <span className="text-[10px] tracking-[0.25em] text-[#a67c52] font-[family-name:var(--font-jost)]">
                PARTNER
              </span>
            </div>
            <h1
              className="text-4xl sm:text-6xl font-light text-white leading-tight mb-8"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              あなたの専門性を、<br />
              河添建築のプロジェクトへ。
            </h1>
            <p className="text-sm text-white/50 leading-loose max-w-xl font-[family-name:var(--font-jost)] font-light">
              河添建築事務所では、プロジェクトの内容に応じて
              外部の専門家と協働しています。
              ご登録いただいた情報を元に、マッチするプロジェクト発生時に
              直接ご連絡します。
            </p>
          </div>
        </section>

        {/* 説明セクション */}
        <section className="border-b border-[#c4beb5]">
          <div className="max-w-4xl mx-auto px-8 py-14 grid sm:grid-cols-3 gap-10">
            <div>
              <p className="text-[10px] tracking-[0.3em] text-[#a67c52] mb-4 font-[family-name:var(--font-jost)]">
                FLOW
              </p>
              <p
                className="text-lg font-light text-[#0a0a0a] mb-3 leading-snug"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                登録の流れ
              </p>
              <ol className="space-y-2 text-xs text-[#7a756d] font-[family-name:var(--font-jost)] font-light leading-loose">
                <li>1. このフォームで情報を登録</li>
                <li>2. 内容を確認・データベースに保存</li>
                <li>3. 案件発生時に個別にご連絡</li>
                <li>4. 条件合意後、業務委託契約</li>
              </ol>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] text-[#a67c52] mb-4 font-[family-name:var(--font-jost)]">
                FIELDS
              </p>
              <p
                className="text-lg font-light text-[#0a0a0a] mb-3 leading-snug"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                募集職種
              </p>
              <p className="text-xs text-[#7a756d] font-[family-name:var(--font-jost)] font-light leading-loose">
                意匠設計 / 構造・設備設計 / 積算 / 施工監理 /
                確認申請 / インテリア / グラフィック / サイン /
                Web / 写真・動画 / 模型 / パース（3DCG）/ その他
              </p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.3em] text-[#a67c52] mb-4 font-[family-name:var(--font-jost)]">
                NOTE
              </p>
              <p
                className="text-lg font-light text-[#0a0a0a] mb-3 leading-snug"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                ご注意
              </p>
              <p className="text-xs text-[#7a756d] font-[family-name:var(--font-jost)] font-light leading-loose">
                すべての登録が仕事につながるわけではありません。
                ただし、いただいた情報は必ず確認し、
                ご縁があればプロジェクトごとにご連絡します。
              </p>
            </div>
          </div>
        </section>

        {/* フォーム */}
        <section className="max-w-4xl mx-auto px-8 py-16">
          <p className="text-[10px] tracking-[0.3em] text-[#a67c52] mb-10 font-[family-name:var(--font-jost)]">
            REGISTRATION FORM
          </p>
          <PartnerForm />
        </section>

      </main>

      <Footer />
    </div>
  );
}
