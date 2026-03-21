import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Resend } from "resend";
import { recruitAutoReply, recruitAdminNotify } from "@/lib/email-templates";
import type { Recruit } from "@/lib/supabase";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL!;
const FROM_EMAIL = "noreply@kawazoe-architects.com";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.motivation) {
      return NextResponse.json(
        { error: "氏名・メールアドレス・志望動機は必須です" },
        { status: 400 }
      );
    }

    const recruit: Recruit = {
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      address: body.address || null,
      position: body.position || null,
      experience_years: body.experience_years || null,
      qualifications: body.qualifications || null,
      softwares: Array.isArray(body.softwares) ? body.softwares : [],
      preferred_location: body.preferred_location || null,
      available_from: body.available_from || null,
      motivation: body.motivation,
    };

    // Save to Supabase
    const { error: dbError } = await supabase
      .from("recruits")
      .insert([recruit]);

    if (dbError) {
      console.error("Supabase error:", dbError);
      return NextResponse.json(
        { error: "データの保存に失敗しました" },
        { status: 500 }
      );
    }

    // Send emails
    const autoReply = recruitAutoReply(recruit);
    const adminNotify = recruitAdminNotify(recruit);

    await Promise.allSettled([
      resend.emails.send({
        from: `KAWAZOE CREW <${FROM_EMAIL}>`,
        to: recruit.email,
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
