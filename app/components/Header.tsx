import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-[#c4beb5] bg-[#faf9f7]">
      <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link
          href="/"
          className="text-xs tracking-[0.3em] text-[#0a0a0a] hover:text-[#a67c52] transition-colors font-[family-name:var(--font-jost)]"
        >
          KAWAZOE-ARCHITECTS
        </Link>
        <nav className="flex gap-8">
          <Link
            href="/partner/"
            className="text-[10px] tracking-[0.25em] text-[#7a756d] hover:text-[#a67c52] transition-colors font-[family-name:var(--font-jost)]"
          >
            PARTNER
          </Link>
          <Link
            href="/recruit/"
            className="text-[10px] tracking-[0.25em] text-[#7a756d] hover:text-[#a67c52] transition-colors font-[family-name:var(--font-jost)]"
          >
            RECRUIT
          </Link>
        </nav>
      </div>
    </header>
  );
}
