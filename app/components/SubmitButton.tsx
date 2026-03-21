"use client";

type Props = {
  loading: boolean;
  label?: string;
};

export default function SubmitButton({ loading, label = "送信する" }: Props) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full sm:w-auto min-w-[180px] px-8 py-3.5 bg-[#1a1a1a] text-white text-sm tracking-wider hover:bg-[#333] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
    >
      {loading ? "送信中..." : label}
    </button>
  );
}
