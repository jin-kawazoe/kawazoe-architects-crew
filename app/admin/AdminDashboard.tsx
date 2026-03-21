"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import type { Partner, Recruit } from "../../lib/supabase";

type Tab = "partner" | "recruit";

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState<Tab>("partner");
  const [partners, setPartners] = useState<Partner[]>([]);
  const [recruits, setRecruits] = useState<Recruit[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Partner | Recruit | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [{ data: p }, { data: r }] = await Promise.all([
        supabase.from("partners").select("*").order("created_at", { ascending: false }),
        supabase.from("recruits").select("*").order("created_at", { ascending: false }),
      ]);
      setPartners(p ?? []);
      setRecruits(r ?? []);
      setLoading(false);
    }
    fetchData();
  }, []);

  const filteredPartners = partners.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase())
  );

  const filteredRecruits = recruits.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (str?: string) => {
    if (!str) return "—";
    return new Date(str).toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  const handleDelete = async (id: string, type: Tab) => {
    const table = type === "partner" ? "partners" : "recruits";
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) {
      alert("削除に失敗しました");
      return;
    }
    if (type === "partner") {
      setPartners((prev) => prev.filter((p) => p.id !== id));
    } else {
      setRecruits((prev) => prev.filter((r) => r.id !== id));
    }
    setSelected(null);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* ヘッダー */}
      <header className="border-b border-white/10 px-8 sm:px-12 py-5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="w-6 h-px bg-[#a67c52]" />
          <p className="text-[10px] tracking-[0.5em] text-white/40 font-[family-name:var(--font-jost)]">
            KAWAZOE CREW — ADMIN
          </p>
        </div>
        <button
          onClick={onLogout}
          className="text-[10px] tracking-[0.3em] text-white/30 hover:text-white/60 transition-colors font-[family-name:var(--font-jost)]"
        >
          LOGOUT
        </button>
      </header>

      <div className="px-8 sm:px-12 py-10 max-w-6xl mx-auto">
        {/* タブ＋検索 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
          <div className="flex gap-0">
            <button
              onClick={() => { setTab("partner"); setSelected(null); setSearch(""); }}
              className={`px-6 py-3 text-[11px] tracking-[0.3em] border transition-all duration-200 font-[family-name:var(--font-jost)] ${
                tab === "partner"
                  ? "border-[#a67c52] bg-[#a67c52]/10 text-[#a67c52]"
                  : "border-white/10 text-white/30 hover:text-white/60"
              }`}
            >
              PARTNER
              <span className="ml-2 text-[10px]">
                {loading ? "…" : partners.length}
              </span>
            </button>
            <button
              onClick={() => { setTab("recruit"); setSelected(null); setSearch(""); }}
              className={`px-6 py-3 text-[11px] tracking-[0.3em] border-t border-b border-r transition-all duration-200 font-[family-name:var(--font-jost)] ${
                tab === "recruit"
                  ? "border-[#a67c52] bg-[#a67c52]/10 text-[#a67c52]"
                  : "border-white/10 text-white/30 hover:text-white/60"
              }`}
            >
              RECRUIT
              <span className="ml-2 text-[10px]">
                {loading ? "…" : recruits.length}
              </span>
            </button>
          </div>

          <input
            type="text"
            placeholder="名前・メールで検索"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setSelected(null); }}
            className="bg-transparent border-b border-white/20 pb-2 text-sm text-white font-[family-name:var(--font-jost)] font-light focus:outline-none focus:border-[#a67c52] transition-colors placeholder:text-white/20 w-full sm:w-64"
          />
        </div>

        {loading ? (
          <p className="text-white/30 text-sm font-[family-name:var(--font-jost)]">読み込み中…</p>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* リスト */}
            <div className="flex-1 min-w-0">
              {tab === "partner" && (
                <PartnerList
                  partners={filteredPartners}
                  selected={selected as Partner}
                  onSelect={setSelected}
                  formatDate={formatDate}
                />
              )}
              {tab === "recruit" && (
                <RecruitList
                  recruits={filteredRecruits}
                  selected={selected as Recruit}
                  onSelect={setSelected}
                  formatDate={formatDate}
                />
              )}
            </div>

            {/* 詳細パネル */}
            {selected && (
              <div className="lg:w-80 flex-shrink-0">
                <DetailPanel
                  item={selected}
                  type={tab}
                  onClose={() => setSelected(null)}
                  onDelete={handleDelete}
                  formatDate={formatDate}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Partner リスト ──
function PartnerList({
  partners,
  selected,
  onSelect,
  formatDate,
}: {
  partners: Partner[];
  selected: Partner | null;
  onSelect: (p: Partner) => void;
  formatDate: (s?: string) => string;
}) {
  if (partners.length === 0) {
    return <p className="text-white/20 text-sm font-[family-name:var(--font-jost)]">該当なし</p>;
  }
  return (
    <div className="border border-white/10 divide-y divide-white/10">
      <div className="grid grid-cols-[1fr_1fr_auto_auto] gap-4 px-5 py-3 text-[9px] tracking-[0.3em] text-white/30 font-[family-name:var(--font-jost)]">
        <span>NAME</span>
        <span>EMAIL</span>
        <span>SKILLS</span>
        <span>DATE</span>
      </div>
      {partners.map((p) => (
        <button
          key={p.id}
          onClick={() => onSelect(p)}
          className={`w-full grid grid-cols-[1fr_1fr_auto_auto] gap-4 px-5 py-4 text-left transition-colors ${
            selected?.id === p.id ? "bg-[#a67c52]/10" : "hover:bg-white/5"
          }`}
        >
          <span className="text-sm text-white font-[family-name:var(--font-jost)] font-light truncate">
            {p.name}
          </span>
          <span className="text-xs text-white/40 font-[family-name:var(--font-jost)] truncate">
            {p.email}
          </span>
          <span className="text-xs text-[#a67c52] font-[family-name:var(--font-jost)] whitespace-nowrap">
            {p.skills?.slice(0, 2).join(" / ")}
            {p.skills?.length > 2 && " …"}
          </span>
          <span className="text-xs text-white/25 font-[family-name:var(--font-jost)] whitespace-nowrap">
            {formatDate(p.created_at)}
          </span>
        </button>
      ))}
    </div>
  );
}

// ── Recruit リスト ──
function RecruitList({
  recruits,
  selected,
  onSelect,
  formatDate,
}: {
  recruits: Recruit[];
  selected: Recruit | null;
  onSelect: (r: Recruit) => void;
  formatDate: (s?: string) => string;
}) {
  if (recruits.length === 0) {
    return <p className="text-white/20 text-sm font-[family-name:var(--font-jost)]">該当なし</p>;
  }
  return (
    <div className="border border-white/10 divide-y divide-white/10">
      <div className="grid grid-cols-[1fr_1fr_auto_auto] gap-4 px-5 py-3 text-[9px] tracking-[0.3em] text-white/30 font-[family-name:var(--font-jost)]">
        <span>NAME</span>
        <span>EMAIL</span>
        <span>POSITION</span>
        <span>DATE</span>
      </div>
      {recruits.map((r) => (
        <button
          key={r.id}
          onClick={() => onSelect(r)}
          className={`w-full grid grid-cols-[1fr_1fr_auto_auto] gap-4 px-5 py-4 text-left transition-colors ${
            selected?.id === r.id ? "bg-[#a67c52]/10" : "hover:bg-white/5"
          }`}
        >
          <span className="text-sm text-white font-[family-name:var(--font-jost)] font-light truncate">
            {r.name}
          </span>
          <span className="text-xs text-white/40 font-[family-name:var(--font-jost)] truncate">
            {r.email}
          </span>
          <span className="text-xs text-[#a67c52] font-[family-name:var(--font-jost)] whitespace-nowrap">
            {r.position ?? "—"}
          </span>
          <span className="text-xs text-white/25 font-[family-name:var(--font-jost)] whitespace-nowrap">
            {formatDate(r.created_at)}
          </span>
        </button>
      ))}
    </div>
  );
}

// ── 詳細パネル ──
type RowItem = { label: string; value: string | undefined; isLink?: boolean };

function DetailPanel({
  item,
  type,
  onClose,
  onDelete,
  formatDate,
}: {
  item: Partner | Recruit;
  type: Tab;
  onClose: () => void;
  onDelete: (id: string, type: Tab) => Promise<void>;
  formatDate: (s?: string) => string;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const rows: RowItem[] =
    type === "partner"
      ? [
          { label: "名前", value: (item as Partner).name },
          { label: "メール", value: (item as Partner).email },
          { label: "電話", value: (item as Partner).phone },
          { label: "エリア", value: (item as Partner).area },
          { label: "契約形態", value: (item as Partner).business_type },
          { label: "スキル", value: (item as Partner).skills?.join(", ") },
          { label: "ソフト", value: (item as Partner).softwares?.join(", ") },
          { label: "資格", value: (item as Partner).qualifications },
          { label: "対応エリア", value: (item as Partner).coverage_areas?.join(", ") },
          { label: "単価目安", value: (item as Partner).rate_range },
          { label: "稼働状況", value: (item as Partner).availability },
          { label: "ポートフォリオ", value: (item as Partner).portfolio_url, isLink: true },
          { label: "備考", value: (item as Partner).note },
          { label: "登録日", value: formatDate(item.created_at) },
        ]
      : [
          { label: "名前", value: (item as Recruit).name },
          { label: "メール", value: (item as Recruit).email },
          { label: "電話", value: (item as Recruit).phone },
          { label: "年齢", value: (item as Recruit).age ? `${(item as Recruit).age}歳` : undefined },
          { label: "住所", value: (item as Recruit).address },
          { label: "現在の状況", value: (item as Recruit).employment_status },
          { label: "最終学歴", value: (item as Recruit).education },
          { label: "職務経歴", value: (item as Recruit).work_history },
          { label: "希望職種", value: (item as Recruit).position },
          { label: "経験年数", value: (item as Recruit).experience_years },
          { label: "資格", value: (item as Recruit).qualifications },
          { label: "使用ソフト", value: (item as Recruit).softwares?.join(", ") },
          { label: "希望勤務地", value: (item as Recruit).preferred_location },
          { label: "就業可能時期", value: (item as Recruit).available_from },
          { label: "志望動機", value: (item as Recruit).motivation },
          { label: "ポートフォリオ", value: (item as Recruit).portfolio_url, isLink: true },
          { label: "履歴書", value: (item as Recruit).resume_url, isLink: true },
          { label: "登録日", value: formatDate(item.created_at) },
        ];

  return (
    <div className="border border-[#a67c52]/40 p-6 sticky top-8">
      <div className="flex items-center justify-between mb-6">
        <p className="text-[9px] tracking-[0.4em] text-[#a67c52] font-[family-name:var(--font-jost)]">
          {type === "partner" ? "PARTNER" : "RECRUIT"} DETAIL
        </p>
        <button
          onClick={onClose}
          className="text-white/20 hover:text-white/60 transition-colors text-lg leading-none"
        >
          ×
        </button>
      </div>

      <div className="space-y-4">
        {rows.map(({ label, value, isLink }) =>
          value ? (
            <div key={label} className="border-t border-white/10 pt-3">
              <p className="text-[9px] tracking-[0.3em] text-white/30 mb-1 font-[family-name:var(--font-jost)]">
                {label.toUpperCase()}
              </p>
              {isLink ? (
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#a67c52] underline font-[family-name:var(--font-jost)] break-all"
                >
                  {label === "履歴書" ? "ダウンロード" : value}
                </a>
              ) : (
                <p className="text-xs text-white/70 font-[family-name:var(--font-jost)] font-light leading-relaxed break-words whitespace-pre-line">
                  {value}
                </p>
              )}
            </div>
          ) : null
        )}
      </div>

      {/* 削除 */}
      <div className="mt-8 pt-6 border-t border-white/10">
        {!confirmDelete ? (
          <button
            onClick={() => setConfirmDelete(true)}
            className="w-full py-2.5 text-[10px] tracking-[0.3em] text-white/20 border border-white/10 hover:border-red-500/50 hover:text-red-400/70 transition-all duration-200 font-[family-name:var(--font-jost)]"
          >
            DELETE
          </button>
        ) : (
          <div className="space-y-2">
            <p className="text-[10px] text-white/40 text-center font-[family-name:var(--font-jost)]">
              本当に削除しますか？
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex-1 py-2 text-[10px] tracking-[0.2em] text-white/30 border border-white/10 hover:text-white/60 transition-colors font-[family-name:var(--font-jost)]"
              >
                キャンセル
              </button>
              <button
                disabled={deleting}
                onClick={async () => {
                  if (!item.id) return;
                  setDeleting(true);
                  await onDelete(item.id, type);
                  setDeleting(false);
                  setConfirmDelete(false);
                }}
                className="flex-1 py-2 text-[10px] tracking-[0.2em] text-red-400 border border-red-500/40 hover:bg-red-500/10 transition-colors font-[family-name:var(--font-jost)] disabled:opacity-40"
              >
                {deleting ? "削除中…" : "削除する"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
