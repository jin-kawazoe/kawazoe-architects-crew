"use client";

import { useState } from "react";
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
import type { Partner } from "@/lib/supabase";

const SKILL_OPTIONS = [
  "意匠設計",
  "構造設計",
  "設備設計",
  "積算",
  "現場監理",
  "確認申請",
  "インテリア",
  "グラフィック",
  "サイン",
  "Web制作",
  "写真",
  "動画",
  "模型製作",
  "パース制作（3DCG）",
  "その他",
];

const COVERAGE_AREAS = [
  "北海道・東北",
  "関東",
  "北陸・甲信越",
  "東海",
  "近畿",
  "中国・四国",
  "九州・沖縄",
  "全国対応可",
  "リモートのみ",
];

const AVAILABILITY_OPTIONS = ["週1程度", "月数回", "スポット", "相談可"];

const BUSINESS_TYPE_OPTIONS = ["個人事業主", "法人", "その他"];

type FormState = {
  name: string;
  email: string;
  phone: string;
  area: string;
  business_type: string;
  skills: string[];
  softwares: string[];
  otherSoftware: string;
  qualifications: string;
  coverage_areas: string[];
  rate_range: string;
  availability: string;
  portfolio_url: string;
  note: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  area: "",
  business_type: "",
  skills: [],
  softwares: [],
  otherSoftware: "",
  qualifications: "",
  coverage_areas: [],
  rate_range: "",
  availability: "",
  portfolio_url: "",
  note: "",
};

type Status = "idle" | "loading" | "success" | "error";

export default function PartnerForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const setField = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const toggleArrayField = (
    key: "skills" | "softwares" | "coverage_areas",
    value: string
  ) => {
    setForm((prev) => {
      const arr = prev[key];
      return {
        ...prev,
        [key]: arr.includes(value)
          ? arr.filter((v) => v !== value)
          : [...arr, value],
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const allSoftwares = form.otherSoftware
      ? [...form.softwares, form.otherSoftware]
      : form.softwares;

    const partner: Partner = {
      name: form.name,
      email: form.email,
      phone: form.phone || undefined,
      area: form.area || undefined,
      business_type: form.business_type || undefined,
      skills: form.skills,
      softwares: allSoftwares,
      qualifications: form.qualifications || undefined,
      coverage_areas: form.coverage_areas,
      rate_range: form.rate_range || undefined,
      availability: form.availability || undefined,
      portfolio_url: form.portfolio_url || undefined,
      note: form.note || undefined,
    };

    try {
      const { error } = await supabase.from("partners").insert([partner]);
      if (error) throw new Error("データの保存に失敗しました");
      setStatus("success");
      setForm(initialState);
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
          登録を受け付けました
        </h2>
        <p className="text-sm text-[#666] leading-loose mb-8">
          確認メールをお送りしました。<br />
          内容を確認の上、担当者よりご連絡します。
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-xs text-[#999] hover:text-[#1a1a1a] underline transition-colors"
        >
          新しく登録する
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

      <FormField label="居住エリア">
        <Select
          value={form.area}
          onChange={(e) => setField("area", e.target.value)}
        >
          <option value="">都道府県を選択</option>
          {PREFECTURES.map((pref) => (
            <option key={pref} value={pref}>
              {pref}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField label="契約形態">
        <div className="flex flex-wrap gap-2">
          {BUSINESS_TYPE_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() =>
                setField("business_type", opt === form.business_type ? "" : opt)
              }
              className={`px-3 py-1.5 text-xs border transition-colors ${
                form.business_type === opt
                  ? "border-[#1a1a1a] bg-[#1a1a1a] text-white"
                  : "border-[#e0e0e0] bg-white text-[#666] hover:border-[#999]"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </FormField>

      {/* 職種 */}
      <SectionHeading>職種タグ</SectionHeading>

      <FormField label="得意分野" hint="複数選択可">
        <CheckboxGroup
          options={SKILL_OPTIONS}
          selected={form.skills}
          onChange={(v) => toggleArrayField("skills", v)}
        />
      </FormField>

      {/* 使用ソフト */}
      <SectionHeading>使用ソフト</SectionHeading>

      {SOFTWARE_GROUPS.map((group) => (
        <FormField key={group.label} label={group.label} hint="複数選択可">
          <CheckboxGroup
            options={[...group.options]}
            selected={form.softwares}
            onChange={(v) => toggleArrayField("softwares", v)}
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

      {/* 条件 */}
      <SectionHeading>条件・稼働について</SectionHeading>

      <FormField label="保有資格" hint="自由記入">
        <Input
          type="text"
          placeholder="一級建築士、など"
          value={form.qualifications}
          onChange={(e) => setField("qualifications", e.target.value)}
        />
      </FormField>

      <FormField label="対応可能エリア" hint="複数選択可">
        <CheckboxGroup
          options={COVERAGE_AREAS}
          selected={form.coverage_areas}
          onChange={(v) => toggleArrayField("coverage_areas", v)}
        />
      </FormField>

      <FormField label="単価感" hint="任意・目安">
        <Input
          type="text"
          placeholder="¥5,000/h、月30万〜、など"
          value={form.rate_range}
          onChange={(e) => setField("rate_range", e.target.value)}
        />
      </FormField>

      <FormField label="稼働頻度">
        <div className="flex flex-wrap gap-2">
          {AVAILABILITY_OPTIONS.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() =>
                setField("availability", opt === form.availability ? "" : opt)
              }
              className={`px-3 py-1.5 text-xs border transition-colors ${
                form.availability === opt
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

      <FormField label="自己PR・備考">
        <Textarea
          placeholder="実績・得意分野・働き方の希望など、自由にご記入ください。"
          value={form.note}
          onChange={(e) => setField("note", e.target.value)}
          rows={6}
        />
      </FormField>

      {/* Submit */}
      <div className="mt-10 flex flex-col items-start gap-4">
        {status === "error" && (
          <p className="text-sm text-red-600">{errorMessage}</p>
        )}
        <SubmitButton loading={status === "loading"} label="登録する" />
        <p className="text-xs text-[#999] leading-relaxed">
          送信いただいた情報は、業務連絡以外には使用しません。
        </p>
      </div>
    </form>
  );
}
