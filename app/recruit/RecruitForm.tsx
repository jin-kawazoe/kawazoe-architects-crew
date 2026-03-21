"use client";

import { useState, useRef } from "react";
import {
  FormField,
  Input,
  Select,
  Textarea,
  CheckboxGroup,
  SectionHeading,
} from "../components/FormField";
import SubmitButton from "../components/SubmitButton";
import { SOFTWARE_GROUPS, PREFECTURES } from "../components/SOFTWARE_OPTIONS";
import { supabase } from "@/lib/supabase";
import type { Recruit } from "@/lib/supabase";

const POSITION_OPTIONS = [
  "意匠設計",
  "CADオペレーター",
  "設計アシスタント",
  "模型製作",
  "その他",
];

const EXPERIENCE_OPTIONS = [
  "未経験",
  "1年未満",
  "1〜3年",
  "3〜5年",
  "5〜10年",
  "10年以上",
];

const LOCATION_OPTIONS = ["高松", "東京", "どちらでも"];

const AVAILABLE_FROM_OPTIONS = ["即日", "1ヶ月以内", "3ヶ月以内", "相談"];

const EMPLOYMENT_STATUS_OPTIONS = ["在職中", "離職中", "新卒（学生）", "その他"];

type FormState = {
  name: string;
  email: string;
  phone: string;
  address: string;
  age: string;
  education: string;
  employment_status: string;
  position: string;
  experience_years: string;
  qualifications: string;
  work_history: string;
  softwares: string[];
  otherSoftware: string;
  preferred_location: string;
  available_from: string;
  motivation: string;
  portfolio_url: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  age: "",
  education: "",
  employment_status: "",
  position: "",
  experience_years: "",
  qualifications: "",
  work_history: "",
  softwares: [],
  otherSoftware: "",
  preferred_location: "",
  available_from: "",
  motivation: "",
  portfolio_url: "",
};

type Status = "idle" | "loading" | "success" | "error";

export default function RecruitForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const setField = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleSoftware = (value: string) => {
    setForm((prev) => ({
      ...prev,
      softwares: prev.softwares.includes(value)
        ? prev.softwares.filter((v) => v !== value)
        : [...prev.softwares, value],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const allSoftwares = form.otherSoftware
      ? [...form.softwares, form.otherSoftware]
      : form.softwares;

    let resume_url: string | undefined;

    // 履歴書アップロード
    if (resumeFile) {
      setUploadProgress("履歴書をアップロード中…");
      const ext = resumeFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(fileName, resumeFile);
      if (uploadError) {
        setStatus("error");
        setErrorMessage("履歴書のアップロードに失敗しました");
        setUploadProgress("");
        return;
      }
      resume_url = supabase.storage.from("resumes").getPublicUrl(fileName).data.publicUrl;
      setUploadProgress("");
    }

    const recruit: Recruit = {
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      address: form.address || undefined,
      age: form.age ? parseInt(form.age, 10) : undefined,
      education: form.education || undefined,
      employment_status: form.employment_status || undefined,
      position: form.position || undefined,
      experience_years: form.experience_years || undefined,
      qualifications: form.qualifications || undefined,
      work_history: form.work_history || undefined,
      softwares: allSoftwares,
      preferred_location: form.preferred_location || undefined,
      available_from: form.available_from || undefined,
      motivation: form.motivation,
      portfolio_url: form.portfolio_url || undefined,
      resume_url,
    };

    try {
      const { error } = await supabase.from("recruits").insert([recruit]);
      if (error) throw new Error("データの保存に失敗しました");
      setStatus("success");
      setForm(initialState);
      setResumeFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "送信に失敗しました");
    }
  };

  if (status === "success") {
    return (
      <div className="py-16 text-center border border-[#e0e0e0]">
        <p className="text-xs tracking-[0.2em] text-[#999] mb-4">THANK YOU</p>
        <h2 className="text-lg font-light text-[#1a1a1a] mb-4">
          エントリーを受け付けました
        </h2>
        <p className="text-sm text-[#666] leading-loose mb-8">
          確認メールをお送りしました。<br />
          内容を確認の上、担当者よりご連絡します。
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-xs text-[#999] hover:text-[#1a1a1a] underline transition-colors"
        >
          新しくエントリーする
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* 基本情報 */}
      <SectionHeading>基本情報</SectionHeading>

      <FormField label="氏名" required>
        <Input
          type="text"
          required
          placeholder="河添 太郎"
          value={form.name}
          onChange={(e) => setField("name", e.target.value)}
        />
      </FormField>

      <FormField label="メールアドレス" required>
        <Input
          type="email"
          required
          placeholder="info@example.com"
          value={form.email}
          onChange={(e) => setField("email", e.target.value)}
        />
      </FormField>

      <FormField label="電話番号">
        <Input
          type="tel"
          placeholder="090-0000-0000"
          value={form.phone}
          onChange={(e) => setField("phone", e.target.value)}
        />
      </FormField>

      <FormField label="年齢">
        <Input
          type="number"
          placeholder="28"
          min="16"
          max="70"
          value={form.age}
          onChange={(e) => setField("age", e.target.value)}
        />
      </FormField>

      <FormField label="現住所">
        <Select
          value={form.address}
          onChange={(e) => setField("address", e.target.value)}
        >
          <option value="">都道府県を選択</option>
          {PREFECTURES.map((pref) => (
            <option key={pref} value={pref}>
              {pref}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField label="現在の状況">
        <div className="flex flex-wrap gap-2">
          {EMPLOYMENT_STATUS_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() =>
                setField("employment_status", opt === form.employment_status ? "" : opt)
              }
              className={`px-3 py-1.5 text-xs border transition-colors ${
                form.employment_status === opt
                  ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
                  : "border-[#e0e0e0] bg-white text-[#666] hover:border-[#999]"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </FormField>

      {/* 学歴・経歴 */}
      <SectionHeading>学歴・経歴</SectionHeading>

      <FormField label="最終学歴" hint="学校名・学科">
        <Input
          type="text"
          placeholder="○○大学 建築学科"
          value={form.education}
          onChange={(e) => setField("education", e.target.value)}
        />
      </FormField>

      <FormField label="職務経歴" hint="勤務先・担当業務など">
        <Textarea
          placeholder="○○建築設計事務所（2020〜2024）住宅・店舗の意匠設計担当&#10;△△アトリエ（2024〜現在）集合住宅の基本設計"
          value={form.work_history}
          onChange={(e) => setField("work_history", e.target.value)}
          rows={4}
        />
      </FormField>

      {/* 経歴・スキル */}
      <SectionHeading>スキル</SectionHeading>

      <FormField label="希望職種">
        <div className="flex flex-wrap gap-2">
          {POSITION_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => setField("position", opt === form.position ? "" : opt)}
              className={`px-3 py-1.5 text-xs border transition-colors ${
                form.position === opt
                  ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
                  : "border-[#e0e0e0] bg-white text-[#666] hover:border-[#999]"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </FormField>

      <FormField label="経験年数">
        <div className="flex flex-wrap gap-2">
          {EXPERIENCE_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() =>
                setField("experience_years", opt === form.experience_years ? "" : opt)
              }
              className={`px-3 py-1.5 text-xs border transition-colors ${
                form.experience_years === opt
                  ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
                  : "border-[#e0e0e0] bg-white text-[#666] hover:border-[#999]"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </FormField>

      <FormField label="保有資格" hint="自由記入">
        <Input
          type="text"
          placeholder="一級建築士、宅地建物取引士、など"
          value={form.qualifications}
          onChange={(e) => setField("qualifications", e.target.value)}
        />
      </FormField>

      {SOFTWARE_GROUPS.map((group) => (
        <FormField key={group.label} label={group.label} hint="複数選択可">
          <CheckboxGroup
            options={[...group.options]}
            selected={form.softwares}
            onChange={toggleSoftware}
          />
        </FormField>
      ))}

      <FormField label="その他ソフト" hint="自由記入">
        <Input
          type="text"
          placeholder="使用しているソフト名を入力"
          value={form.otherSoftware}
          onChange={(e) => setField("otherSoftware", e.target.value)}
        />
      </FormField>

      {/* 勤務の希望 */}
      <SectionHeading>勤務の希望</SectionHeading>

      <FormField label="希望勤務地">
        <div className="flex flex-wrap gap-2">
          {LOCATION_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() =>
                setField("preferred_location", opt === form.preferred_location ? "" : opt)
              }
              className={`px-3 py-1.5 text-xs border transition-colors ${
                form.preferred_location === opt
                  ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
                  : "border-[#e0e0e0] bg-white text-[#666] hover:border-[#999]"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </FormField>

      <FormField label="就業可能時期">
        <div className="flex flex-wrap gap-2">
          {AVAILABLE_FROM_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() =>
                setField("available_from", opt === form.available_from ? "" : opt)
              }
              className={`px-3 py-1.5 text-xs border transition-colors ${
                form.available_from === opt
                  ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
                  : "border-[#e0e0e0] bg-white text-[#666] hover:border-[#999]"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </FormField>

      {/* その他 */}
      <SectionHeading>その他</SectionHeading>

      <FormField label="ポートフォリオURL" hint="任意">
        <Input
          type="url"
          placeholder="https://"
          value={form.portfolio_url}
          onChange={(e) => setField("portfolio_url", e.target.value)}
        />
      </FormField>

      <FormField label="履歴書" hint="PDF・Word可（任意）">
        <div>
          <label className="inline-flex items-center gap-3 cursor-pointer">
            <span className="px-4 py-2 text-xs border border-[#ccc] text-[#666] hover:border-[#999] transition-colors">
              ファイルを選択
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => setResumeFile(e.target.files?.[0] ?? null)}
            />
          </label>
          {resumeFile && (
            <p className="mt-2 text-xs text-[#666]">
              {resumeFile.name}
              <button
                type="button"
                onClick={() => {
                  setResumeFile(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="ml-2 text-[#999] hover:text-[#333]"
              >
                ×
              </button>
            </p>
          )}
        </div>
      </FormField>

      <FormField label="志望動機" required>
        <Textarea
          required
          placeholder="河添建築事務所に興味を持った理由、やってみたいことなど、自由にお書きください。"
          value={form.motivation}
          onChange={(e) => setField("motivation", e.target.value)}
          rows={7}
        />
      </FormField>

      {/* Submit */}
      <div className="mt-10 flex flex-col items-start gap-4">
        {uploadProgress && (
          <p className="text-sm text-[#999]">{uploadProgress}</p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-600">{errorMessage}</p>
        )}
        <SubmitButton loading={status === "loading"} label="エントリーする" />
        <p className="text-xs text-[#999] leading-relaxed">
          送信いただいた情報は、採用業務以外には使用しません。
        </p>
      </div>
    </form>
  );
}
