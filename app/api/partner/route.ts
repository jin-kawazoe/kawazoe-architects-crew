import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";
import { partnerAutoReply, partnerAdminNotify } from "@/lib/email-templates";
import type { Partner } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const FROM_EMAIL = "noreply@kawazoe-architects.com";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: "氏名とメールアドレスは必須です" },
        { status: 400 }
      );
    }

    const partner: Partner = {
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      area: body.area || null,
      skills: Array.isArray(body.skills) ? body.skills : [],
      softwares: Array.isArray(body.softwares) ? body.softwares : [],
      qualifications: body.qualifications || null,
      coverage_areas: Array.isArray(body.coverage_areas) ? body.coverage_areas : [],
      rate_range: body.rate_range || null,
      availability: body.availability || null,
      portfolio_url: body.portfolio_url || null,
      note: body.note || null,
    };

    // Save to Supabase
    const { error: dbError } = await supabase
      .from("partners")
      .insert([partner]);

    if (dbError) {
      console.error("Supabase error:", dbError);
      return NextResponse.json(
        { error: "データの保存に失敗しました" },
        { status: 500 }
      );
    }

    // Send emails
    const autoReply = partnerAutoReply(partner);
    const adminNotify = partnerAdminNotify(partner);

    await Promise.allSettled([
      resend.emails.send({
        from: `KAWAZOE CREW <${FROM_EMAIL}>`,
        to: partner.email,
        subject: autoReply.subject,
        html: autoReply.html,
      }),
      resend.emails.send({
        from: `KAWAZOE CREW <${FROM_EMAIL}>`,
        to: ADMIN_EMAIL,
        subject: adminNotify.subject,
        html: adminNotify.html,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
