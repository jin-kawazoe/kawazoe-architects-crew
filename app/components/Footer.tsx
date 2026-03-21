export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#c4beb5] bg-[#faf9f7]">
      <div className="max-w-3xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-[10px] tracking-[0.3em] text-[#c4beb5] font-[family-name:var(--font-jost)]">
          KAWAZOE-ARCHITECTS
        </p>
        <a
          href="https://kawazoe-architects.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] tracking-[0.2em] text-[#c4beb5] hover:text-[#a67c52] transition-colors font-[family-name:var(--font-jost)]"
        >
          kawazoe-architects.com ↗
        </a>
      </div>
    </footer>
  );
}
