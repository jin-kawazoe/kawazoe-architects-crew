import Link from "next/link";
import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#faf9f7]">
      <Header />

      <main className="flex-1">

        {/* Hero — フルスクリーン */}
        <section className="relative h-screen min-h-[700px] overflow-hidden">
          <Image
            src="https://kawazoe-architects.com/top_image/kk3-house_entrance.jpg"
            alt="河添建築事務所"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />

          <div className="absolute inset-0 flex flex-col justify-between px-8 sm:px-16 py-12 max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-4">
              <span className="w-10 h-px bg-[#a67c52]" />
              <p className="text-[10px] tracking-[0.5em] text-white/40 font-[family-name:var(--font-jost)]">
                KAWAZOE ARCHITECTS — CREW
              </p>
            </div>

            <div>
              <h1
                className="text-[clamp(3.5rem,10vw,9rem)] font-light leading-[1.0] text-white mb-10"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                ともに、<br />
                <em className="not-italic text-[#a67c52]">つくる。</em>
              </h1>
              <p className="text-sm text-white/50 leading-[2] max-w-sm font-[family-name:var(--font-jost)] font-light">
                建築は、ひとりではつくれない。<br />
                河添建築は、ともに闘える人を探しています。
              </p>
            </div>
          </div>

          <div className="absolute bottom-8 right-8 flex flex-col items-center gap-2">
            <span className="text-[9px] tracking-[0.4em] text-white/20 font-[family-name:var(--font-jost)] [writing-mode:vertical-rl]">SCROLL</span>
            <span className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
          </div>
        </section>

        {/* 大きな引用文 */}
        <section className="bg-[#0a0a0a] px-8 sm:px-16 py-24 sm:py-32">
          <div className="max-w-5xl mx-auto">
            <p
              className="text-[clamp(2rem,5vw,4rem)] font-light text-white leading-[1.4] mb-12"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              「いい建築をつくる」<br />
              その一点で、<br />
              <span className="text-[#a67c52]">つながれる人を探しています。</span>
            </p>
            <div className="flex items-start gap-6 max-w-2xl">
              <span className="w-8 h-px bg-[#a67c52] mt-3 flex-shrink-0" />
              <p className="text-sm text-white/40 leading-[2] font-[family-name:var(--font-jost)] font-light">
                河添建築事務所は、香川・高松と東京を拠点に、住宅・集合住宅・リノベーションなど
                幅広いプロジェクトに取り組む設計事務所です。
                規模の大小にかかわらず、建築の本質に向き合い続けることを大切にしています。
              </p>
            </div>
          </div>
        </section>

        {/* 事務所について */}
        <section className="bg-[#faf9f7] px-8 sm:px-16 py-20 sm:py-28">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-16">
              <span className="w-8 h-px bg-[#a67c52]" />
              <p className="text-[10px] tracking-[0.5em] text-[#a67c52] font-[family-name:var(--font-jost)]">
                ABOUT THE FIRM
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-12 sm:gap-20 items-start">
              {/* 写真 */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src="https://kawazoe-architects.com/office/img/office-tokyo.jpg"
                  alt="河添建築事務所 東京オフィス"
                  fill
                  className="object-cover"
                />
              </div>

              {/* テキスト */}
              <div>
                <h2
                  className="text-3xl sm:text-4xl font-light text-[#0a0a0a] leading-[1.3] mb-8"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  建築との、<br />
                  正直な対話。
                </h2>
                <p className="text-sm text-[#7a756d] leading-[2.2] mb-10 font-[family-name:var(--font-jost)] font-light">
                  香川・高松と東京を拠点に、住宅・集合住宅・
                  リノベーションなど幅広いプロジェクトに取り組む設計事務所です。
                  規模の大小にかかわらず、建築の本質に向き合い続けることを大切にしています。
                </p>
                <dl className="space-y-5 mb-10">
                  {[
                    { label: "LOCATION", value: "香川・高松 / 東京" },
                    { label: "SCOPE", value: "住宅・集合住宅・リノベーション・インテリア" },
                    { label: "STYLE", value: "プロジェクトごとに外部と協働。スタッフと一緒に育てる。" },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex gap-6 text-xs border-t border-[#e8e4df] pt-4">
                      <dt className="text-[#a67c52] tracking-[0.25em] font-[family-name:var(--font-jost)] w-24 flex-shrink-0 pt-0.5">{label}</dt>
                      <dd className="text-[#5a5752] font-[family-name:var(--font-jost)] font-light leading-[1.8]">{value}</dd>
                    </div>
                  ))}
                </dl>
                <a
                  href="https://kawazoe-architects.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-[10px] tracking-[0.3em] text-[#a67c52] hover:gap-5 transition-all duration-300 font-[family-name:var(--font-jost)]"
                >
                  <span className="w-8 h-px bg-[#a67c52]" />
                  kawazoe-architects.com
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Partner — フルスクリーンセクション */}
        <section className="relative min-h-[90vh] overflow-hidden flex">
          <div className="absolute inset-0">
            <Image
              src="https://kawazoe-architects.com/top_image/sa-house-approach.jpg"
              alt="外部パートナー"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[#0a0a0a]/80" />
          </div>

          <div className="relative flex flex-col justify-center px-8 sm:px-16 py-20 max-w-7xl mx-auto w-full">
            <div className="max-w-xl">
              <p className="text-[10px] tracking-[0.5em] text-[#a67c52] mb-8 font-[family-name:var(--font-jost)]">
                01 — EXTERNAL PARTNER
              </p>
              <h2
                className="text-[clamp(2.5rem,6vw,5.5rem)] font-light text-white leading-[1.1] mb-8"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                あなたの仕事が、<br />
                建築になる。
              </h2>
              <p className="text-base text-white/60 leading-[2] mb-6 font-[family-name:var(--font-jost)] font-light">
                設計・監理・グラフィック・CG・模型——<br />
                それぞれの専門性が組み合わさって、<br />
                はじめていい建築が生まれます。
              </p>
              <p className="text-sm text-white/35 leading-[2] mb-4 font-[family-name:var(--font-jost)] font-light">
                フリーランス・個人事業主・法人を問わず登録受付中。
                プロジェクト発生時に直接ご連絡します。業務委託・スポット対応。全国・リモートOK。
              </p>
            </div>
          </div>
        </section>

        {/* Recruit — フルスクリーンセクション */}
        <section className="relative min-h-[90vh] overflow-hidden flex">
          <div className="absolute inset-0">
            <Image
              src="https://kawazoe-architects.com/office/img/studio-takamatsu-facade.jpg"
              alt="採用"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-[#faf9f7]/92" />
          </div>

          <div className="relative flex flex-col justify-center px-8 sm:px-16 py-20 max-w-7xl mx-auto w-full">
            <div className="max-w-xl ml-auto">
              <p className="text-[10px] tracking-[0.5em] text-[#a67c52] mb-8 font-[family-name:var(--font-jost)]">
                02 — STAFF RECRUIT
              </p>
              <h2
                className="text-[clamp(2.5rem,6vw,5.5rem)] font-light text-[#0a0a0a] leading-[1.1] mb-8"
                style={{ fontFamily: "var(--font-cormorant)" }}
              >
                建築で、<br />
                自分を試したい人へ。
              </h2>
              <p className="text-base text-[#5a5752] leading-[2] mb-6 font-[family-name:var(--font-jost)] font-light">
                スキルより、姿勢。<br />
                資格より、熱量。<br />
                自分の頭で考えられる人を求めています。
              </p>
              <p className="text-sm text-[#c4beb5] leading-[2] mb-4 font-[family-name:var(--font-jost)] font-light">
                高松・東京オフィス勤務。意匠設計・CADオペレーター・設計アシスタント・模型製作など。
                正社員・アルバイト応相談。未経験・第二新卒歓迎。
              </p>
            </div>
          </div>
        </section>

        {/* スタンス */}
        <section className="bg-[#faf9f7] px-8 sm:px-16 py-24 sm:py-32">
          <div className="max-w-5xl mx-auto">
            <div className="flex items-center gap-4 mb-20">
              <span className="w-8 h-px bg-[#a67c52]" />
              <p className="text-[10px] tracking-[0.5em] text-[#a67c52] font-[family-name:var(--font-jost)]">
                OUR STANCE
              </p>
            </div>

            <div className="space-y-16">
              {[
                {
                  num: "01",
                  title: "小さい仕事に、本気で向き合う。",
                  body: "住宅1棟も、集合住宅も、リノベーションも。規模にかかわらず、建築としての本質的な問いに正直に向き合うことが、自分たちの仕事だと思っています。",
                },
                {
                  num: "02",
                  title: "要望の先を、考える。",
                  body: "依頼に応えることは最低限。クライアントがまだ気づいていない可能性を引き出すことが、設計事務所としての本来の価値だと考えています。",
                },
                {
                  num: "03",
                  title: "自分の頭で、考えてほしい。",
                  body: "指示通りに動くだけでなく、自分なりの視点を持ってプロジェクトに関わってほしい。建築は、そういう人間が集まったときにこそ、より良くなる。",
                },
              ].map(({ num, title, body }) => (
                <div key={num} className="grid sm:grid-cols-[120px_1fr] gap-6 sm:gap-16 items-start border-t border-[#c4beb5] pt-10">
                  <span
                    className="text-5xl font-light text-[#e8e4df] leading-none"
                    style={{ fontFamily: "var(--font-cormorant)" }}
                  >
                    {num}
                  </span>
                  <div>
                    <p
                      className="text-2xl sm:text-3xl font-light text-[#0a0a0a] leading-snug mb-5"
                      style={{ fontFamily: "var(--font-cormorant)" }}
                    >
                      {title}
                    </p>
                    <p className="text-sm text-[#7a756d] leading-[2] font-[family-name:var(--font-jost)] font-light max-w-xl">
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 最後の選択 CTA — ここで初めて二択を迫る */}
        <section className="bg-[#0a0a0a]">
          {/* リード文 */}
          <div className="px-8 sm:px-16 pt-20 sm:pt-28 pb-16 max-w-5xl mx-auto">
            <p
              className="text-[clamp(2rem,4vw,3.5rem)] font-light text-white leading-[1.3] mb-4"
              style={{ fontFamily: "var(--font-cormorant)" }}
            >
              あなたは、どちらですか。
            </p>
            <p className="text-sm text-white/30 font-[family-name:var(--font-jost)] font-light tracking-wider">
              登録は無料です。まず、つながってみてください。
            </p>
          </div>

          {/* 二択カード */}
          <div className="flex flex-col sm:flex-row border-t border-white/10">

            {/* PARTNER カード */}
            <Link
              href="/partner/"
              className="relative flex-1 flex flex-col justify-between px-10 sm:px-14 py-14 overflow-hidden group border-b sm:border-b-0 sm:border-r border-white/10"
            >
              <div className="absolute inset-0 bg-[#a67c52]/0 group-hover:bg-[#a67c52]/8 transition-all duration-500" />
              <div className="relative z-10">
                <p className="text-[9px] tracking-[0.5em] text-[#a67c52] mb-6 font-[family-name:var(--font-jost)]">
                  01 — EXTERNAL PARTNER
                </p>
                <p
                  className="text-[clamp(1.8rem,3vw,3rem)] font-light text-white leading-[1.2] mb-6"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  専門性を持つ<br />外部パートナーとして
                </p>
                <p className="text-xs text-white/35 leading-[2] max-w-xs font-[family-name:var(--font-jost)] font-light">
                  フリーランス・個人事業主・法人<br />
                  業務委託・スポット対応<br />
                  全国・リモートOK
                </p>
              </div>
              <div className="relative z-10 mt-10 flex items-center justify-between">
                <span className="text-[10px] tracking-[0.3em] text-white/40 group-hover:text-[#a67c52] transition-colors duration-300 font-[family-name:var(--font-jost)]">
                  PARTNER REGISTRATION
                </span>
                <span className="text-white/20 group-hover:text-[#a67c52] group-hover:translate-x-1 transition-all duration-300">→</span>
              </div>
            </Link>

            {/* RECRUIT カード */}
            <Link
              href="/recruit/"
              className="relative flex-1 flex flex-col justify-between px-10 sm:px-14 py-14 overflow-hidden group"
            >
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-500" />
              <div className="relative z-10">
                <p className="text-[9px] tracking-[0.5em] text-[#a67c52] mb-6 font-[family-name:var(--font-jost)]">
                  02 — STAFF RECRUIT
                </p>
                <p
                  className="text-[clamp(1.8rem,3vw,3rem)] font-light text-white leading-[1.2] mb-6"
                  style={{ fontFamily: "var(--font-cormorant)" }}
                >
                  スタッフとして<br />ともに働く人として
                </p>
                <p className="text-xs text-white/35 leading-[2] max-w-xs font-[family-name:var(--font-jost)] font-light">
                  正社員・アルバイト<br />
                  高松・東京オフィス<br />
                  未経験・第二新卒歓迎
                </p>
              </div>
              <div className="relative z-10 mt-10 flex items-center justify-between">
                <span className="text-[10px] tracking-[0.3em] text-white/40 group-hover:text-[#a67c52] transition-colors duration-300 font-[family-name:var(--font-jost)]">
                  ENTRY NOW
                </span>
                <span className="text-white/20 group-hover:text-[#a67c52] group-hover:translate-x-1 transition-all duration-300">→</span>
              </div>
            </Link>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
