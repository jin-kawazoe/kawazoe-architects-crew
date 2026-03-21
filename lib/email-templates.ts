import type { Partner, Recruit } from "./supabase";

export function partnerAutoReply(partner: Partner): {
  subject: string;
  html: string;
} {
  return {
    subject: "【KAWAZOE CREW】外部パートナー登録を受け付けました",
    html: `
<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"></head>
<body style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
  <p style="font-size: 14px; color: #666; letter-spacing: 0.1em;">KAWAZOE CREW</p>
  <h1 style="font-size: 20px; font-weight: 400; border-bottom: 1px solid #e0e0e0; padding-bottom: 16px; margin-bottom: 24px;">
    登録を受け付けました
  </h1>
  <p>${partner.name} 様</p>
  <p style="line-height: 1.8;">
    この度は、KAWAZOE CREWへの外部パートナー登録をありがとうございます。<br>
    ご登録内容を確認のうえ、担当者よりご連絡をさせていただきます。<br>
    しばらくお待ちください。
  </p>
  <table style="width: 100%; border-collapse: collapse; margin: 32px 0; font-size: 14px;">
    <tr style="border-top: 1px solid #e0e0e0;">
      <td style="padding: 12px 8px; color: #666; width: 140px; vertical-align: top;">お名前</td>
      <td style="padding: 12px 8px;">${partner.name}</td>
    </tr>
    <tr style="border-top: 1px solid #e0e0e0;">
      <td style="padding: 12px 8px; color: #666; vertical-align: top;">メールアドレス</td>
      <td style="padding: 12px 8px;">${partner.email}</td>
    </tr>
    ${partner.area ? `
    <tr style="border-top: 1px solid #e0e0e0;">
      <td style="padding: 12px 8px; color: #666; vertical-align: top;">居住エリア</td>
      <td style="padding: 12px 8px;">${partner.area}</td>
    </tr>` : ""}
    <tr style="border-top: 1px solid #e0e0e0; border-bottom: 1px solid #e0e0e0;">
      <td style="padding: 12px 8px; color: #666; vertical-align: top;">職種</td>
      <td style="padding: 12px 8px;">${partner.skills.join("、")}</td>
    </tr>
  </table>
  <p style="font-size: 13px; color: #999; line-height: 1.8;">
    本メールは自動送信です。心当たりのない場合はお手数ですが下記までご連絡ください。<br>
    <a href="mailto:info@kawazoe-architects.com" style="color: #1a1a1a;">info@kawazoe-architects.com</a>
  </p>
  <p style="font-size: 12px; color: #bbb; margin-top: 40px; border-top: 1px solid #e0e0e0; padding-top: 16px;">
    河添建築事務所 / kawazoe-architects.com
  </p>
</body>
</html>`,
  };
}

export function partnerAdminNotify(partner: Partner): {
  subject: string;
  html: string;
} {
  return {
    subject: `【CREW】新規パートナー登録: ${partner.name}`,
    html: `
<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"></head>
<body style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
  <h1 style="font-size: 18px; font-weight: 400;">新規パートナー登録がありました</h1>
  <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
    <tr style="border-top: 1px solid #e0e0e0;">
      <td style="padding: 10px 8px; color: #666; width: 140px; vertical-align: top;">氏名</td>
      <td style="padding: 10px 8px;">${partner.name}</td>
    </tr>
    <tr style="border-top: 1px solid #e0e0e0;">
      <td style="padding: 10px 8px; color: #666; vertical-align: top;">メール</td>
      <td style="padding: 10px 8px;"><a href="mailto:${partner.email}" style="color: #1a1a1a;">${partner.email}</a></td>
    </tr>
    ${partner.phone ? `<tr style="border-top: 1px solid #e0e0e0;">
      <td style="padding: 10px 8px; color: #666; vertical-align: top;">電話</td>
      <td style="padding: 10px 8px;">${partner.phone}</td>
    </tr>` : ""}
    ${partner.area ? `<tr style="border-top: 1px solid #e0e0e0;">
      <td style="padding: 10px 8px; color: #666; vertical-align: top;">居住エリア</td>
      <td style="padding: 10px 8px;">${partner.area}</td>
    </tr>` : ""}
    <tr style="border-top: 1px solid #e0e0e0;">
      <td style="padding: 10px 8px; color: #666; vertical-align: top;">職種</td>
      <td style="padding: 10px 8px;">${partner.skills.join("、") || "—"}</td>
    </tr>
    <tr style="border-top: 1px solid #e0e0e0;">
      <td style="padding: 10px 8px; color: #666; vertical-align: top;">使用ソフト</td>
      <td style="padding: 10px 8px;">${partner.softwares.join("、") || "—"}</td>
    </tr>
    <tr style="border-top: 1px solid #e0e0e0;">
      <td style="padding: 10px 8px; color: #666; vertical-align: top;">対応エリア</td>
      <td style="padding: 10px 8px;">${partner.coverage_areas.join("、") || "—"}</td>
    </tr>
    ${partner.qualifications ? `<tr style="border-top: 1px solid #e0e0e0;">
      <td style="padding: 10px 8px; color: #666; vertical-align: top;">保有資格</td>
      <td style="padding: 10px 8px;">${partner.qualifications}</td>
    </tr>` : ""}
    ${partner.rate_range ? `<tr style="border-top: 1px solid #e0e0e0;">
      <td style="padding: 10px 8px; color: #666; vertical-align: top;">単価感</td>
      <td style="padding: 10px 8px;">${partner.rate_range}</td>
    </tr>` : ""}
    ${partner.availability ? `<tr style="border-top: 1px solid #e0e0e0;">
      <td style="padding: 10px 8px; color: #666; vertical-align: top;">稼働頻度</td>
      <td style="padding: 10px 8px;">${partner.availability}</td>
    </tr>` : ""}
    ${partner.portfolio_url ? `<tr style="border-top: 1px solid #e0e0e0;">
      <td style="padding: 10px 8px; color: #666; vertical-align: top;">ポートフォリオ</td>
      <td style="padding: 10px 8px;"><a href="${partner.portfolio_url}" style="color: #1a1a1a;">${partner.portfolio_url}</a></td>
    </tr>` : ""}
    ${partner.note ? `<tr style="border-top: 1px solid #e0e0e0; border-bottom: 1px solid #e0e0e0;">
      <td style="padding: 10px 8px; color: #666; vertical-align: top;">自己PR・備考</td>
      <td style="padding: 10px 8px; white-space: pre-wrap;">${partner.note}</td>
    </tr>` : ""}
  </table>
</body>
</html>`,
  };
}

export function recruitAutoReply(recruit: Recruit): {
  subject: string;
  html: string;
} {
  return {
    subject: "【KAWAZOE CREW】採用エントリーを受け付けました",
    html: `
<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"></head>
<body style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
  <p style="font-size: 14px; color: #666; letter-spacing: 0.1em;">KAWAZOE CREW</p>
  <h1 style="font-size: 20px; font-weight: 400; border-bottom: 1px solid #e0e0e0; padding-bottom: 16px; margin-bottom: 24px;">
    エントリーを受け付けました
  </h1>
  <p>${recruit.name} 様</p>
  <p style="line-height: 1.8;">
    この度は、河添建築事務所への採用エントリーをありがとうございます。<br>
    ご応募内容を確認のうえ、担当者よりご連絡をさせていただきます。<br>
    しばらくお待ちください。
  </p>
  <table style="width: 100%; border-collapse: collapse; margin: 32px 0; font-size: 14px;">
    <tr style="border-top: 1px solid #e0e0e0;">
      <td style="padding: 12px 8px; color: #666; width: 140px; vertical-align: top;">お名前</td>
      <td style="padding: 12px 8px;">${recruit.name}</td>
    </tr>
    <tr style="border-top: 1px solid #e0e0e0;">
      <td style="padding: 12px 8px; color: #666; vertical-align: top;">メールアドレス</td>
      <td style="padding: 12px 8px;">${recruit.email}</td>
    </tr>
    ${recruit.position ? `<tr style="border-top: 1px solid #e0e0e0;">
      <td style="padding: 12px 8px; color: #666; vertical-align: top;">希望職種</td>
      <td style="padding: 12px 8px;">${recruit.position}</td>
    </tr>` : ""}
    <tr style="border-top: 1px solid #e0e0e0; border-bottom: 1px solid #e0e0e0;">
      <td style="padding: 12px 8px; color: #666; vertical-align: top;">就業可能時期</td>
      <td style="padding: 12px 8px;">${recruit.available_from || "—"}</td>
    </tr>
  </table>
  <p style="font-size: 13px; color: #999; line-height: 1.8;">
    本メールは自動送信です。心当たりのない場合はお手数ですが下記までご連絡ください。<br>
    <a href="mailto:info@kawazoe-architects.com" style="color: #1a1a1a;">info@kawazoe-architects.com</a>
  </p>
  <p style="font-size: 12px; color: #bbb; margin-top: 40px; border-top: 1px solid #e0e0e0; padding-top: 16px;">
    河添建築事務所 / kawazoe-architects.com
  </p>
</body>
</html>`,
  };
}

export function recruitAdminNotify(recruit: Recruit): {
  subject: string;
  html: string;
} {
  return {
    subject: `【CREW】新規採用エントリー: ${recruit.name}`,
    html: `
<!DOCTYPE html>
<html lang="ja">
<head><meta charset="UTF-8"></head>
<body style="font-family: 'Helvetica Neue', Arial, sans-serif; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
  <h1 style="font-size: 18px; font-weight: 400;">新規採用エントリーがありました</h1>
  <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
    <tr style="border-top: 1px solid #e0e0e0;">
      <td style="padding: 10px 8px; color: #666; width: 140px; vertical-align: top;">氏名</td>
      <td style="padding: 10px 8px;">${recruit.name}</td>
    </tr>
    <tr style="border-top: 1px solid #e0e0e0;">
      <td style="padding: 10px 8px; color: #666; vertical-align: top;">メール</td>
      <td style="padding: 10px 8px;"><a href="mailto:${recruit.email}" style="color: #1a1a1a;">${recruit.email}</a></td>
    </tr>
    ${recruit.phone ? `<tr style="border-top: 1px solid #e0e0e0;">
      <td style="padding: 10px 8px; color: #666; vertical-align: top;">電話</td>
      <td style="padding: 10px 8px;">${recruit.phone}</td>
    </tr>` : ""}
    ${recruit.address ? `<tr style="border-top: 1px solid #e0e0e0;">
      <td style="padding: 10px 8px; color: #666; vertical-align: top;">現住所</td>
      <td style="padding: 10px 8px;">${recruit.address}</td>
    </tr>` : ""}
    ${recruit.position ? `<tr style="border-top: 1px solid #e0e0e0;">
      <td style="padding: 10px 8px; color: #666; vertical-align: top;">希望職種</td>
      <td style="padding: 10px 8px;">${recruit.position}</td>
    </tr>` : ""}
    ${recruit.experience_years ? `<tr style="border-top: 1px solid #e0e0e0;">
      <td style="padding: 10px 8px; color: #666; vertical-align: top;">経験年数</td>
      <td style="padding: 10px 8px;">${recruit.experience_years}</td>
    </tr>` : ""}
    ${recruit.qualifications ? `<tr style="border-top: 1px solid #e0e0e0;">
      <td style="padding: 10px 8px; color: #666; vertical-align: top;">保有資格</td>
      <td style="padding: 10px 8px;">${recruit.qualifications}</td>
    </tr>` : ""}
    <tr style="border-top: 1px solid #e0e0e0;">
      <td style="padding: 10px 8px; color: #666; vertical-align: top;">使用ソフト</td>
      <td style="padding: 10px 8px;">${recruit.softwares.join("、") || "—"}</td>
    </tr>
    ${recruit.preferred_location ? `<tr style="border-top: 1px solid #e0e0e0;">
      <td style="padding: 10px 8px; color: #666; vertical-align: top;">希望勤務地</td>
      <td style="padding: 10px 8px;">${recruit.preferred_location}</td>
    </tr>` : ""}
    ${recruit.available_from ? `<tr style="border-top: 1px solid #e0e0e0;">
      <td style="padding: 10px 8px; color: #666; vertical-align: top;">就業可能時期</td>
      <td style="padding: 10px 8px;">${recruit.available_from}</td>
    </tr>` : ""}
    <tr style="border-top: 1px solid #e0e0e0; border-bottom: 1px solid #e0e0e0;">
      <td style="padding: 10px 8px; color: #666; vertical-align: top;">志望動機</td>
      <td style="padding: 10px 8px; white-space: pre-wrap;">${recruit.motivation}</td>
    </tr>
  </table>
</body>
</html>`,
  };
}
