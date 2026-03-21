"use client";

import { useState } from "react";

export default function AdminLogin({ onLogin }: { onLogin: (pw: string) => boolean }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = onLogin(password);
    if (!ok) {
      setError(true);
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-8">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-4 mb-12">
          <span className="w-8 h-px bg-[#a67c52]" />
          <p className="text-[10px] tracking-[0.5em] text-white/30 font-[family-name:var(--font-jost)]">
            KAWAZOE CREW — ADMIN
          </p>
        </div>

        <h1
          className="text-4xl font-light text-white mb-10 leading-tight"
          style={{ fontFamily: "var(--font-cormorant)" }}
        >
          管理画面
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] tracking-[0.3em] text-white/30 mb-3 font-[family-name:var(--font-jost)]">
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(false); }}
              autoFocus
              className="w-full bg-transparent border-b border-white/20 pb-3 text-white text-sm font-[family-name:var(--font-jost)] font-light focus:outline-none focus:border-[#a67c52] transition-colors placeholder:text-white/20"
              placeholder="パスワードを入力"
            />
          </div>

          {error && (
            <p className="text-xs text-red-400/70 font-[family-name:var(--font-jost)]">
              パスワードが正しくありません
            </p>
          )}

          <button
            type="submit"
            className="w-full border border-[#a67c52] py-3.5 text-[11px] tracking-[0.3em] text-[#a67c52] hover:bg-[#a67c52] hover:text-white transition-all duration-300 font-[family-name:var(--font-jost)]"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}
