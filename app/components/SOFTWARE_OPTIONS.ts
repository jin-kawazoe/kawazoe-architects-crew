export const SOFTWARE_GROUPS = [
  {
    label: "BIM",
    options: ["ArchiCAD", "Revit", "Vectorworks", "GLOOBE"],
  },
  {
    label: "2D CAD",
    options: ["AutoCAD", "Jw_CAD", "DraftSight"],
  },
  {
    label: "3Dモデリング",
    options: ["SketchUp", "Rhinoceros", "Blender", "FormZ"],
  },
  {
    label: "レンダリング・ビジュアライゼーション",
    options: [
      "Twinmotion",
      "Lumion",
      "D5 Render",
      "Unreal Engine",
      "V-Ray",
      "Enscape",
    ],
  },
  {
    label: "住宅業務支援",
    options: ["アーキトレンドZERO", "ホームズ君"],
  },
  {
    label: "構造・設備計算",
    options: ["ホームズ君構造EX", "KOZOSEI", "UC-1"],
  },
  {
    label: "グラフィック・デザイン",
    options: [
      "Illustrator",
      "Photoshop",
      "InDesign",
      "Figma",
      "Canva",
    ],
  },
  {
    label: "動画・VR",
    options: ["Premiere Pro", "After Effects"],
  },
  {
    label: "積算・見積",
    options: ["ホームズ君あっと簡単見積", "建て役者", "楽王"],
  },
] as const;

export const PREFECTURES = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県",
  "山形県", "福島県", "茨城県", "栃木県", "群馬県",
  "埼玉県", "千葉県", "東京都", "神奈川県", "新潟県",
  "富山県", "石川県", "福井県", "山梨県", "長野県",
  "岐阜県", "静岡県", "愛知県", "三重県", "滋賀県",
  "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県",
  "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県", "福岡県",
  "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県",
  "鹿児島県", "沖縄県",
] as const;
