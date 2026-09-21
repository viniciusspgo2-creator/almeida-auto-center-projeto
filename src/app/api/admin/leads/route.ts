import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

/** Public endpoint for the WhatsApp pre-scheduling form: stores the lead
 *  so the admin can follow up, then returns the wa.me link (same UX as the
 *  original PHP site, which opened WhatsApp directly). */
export async function POST(req: NextRequest) {
  try {
    const b = (await req.json().catch(() => ({}))) as Record<string, string>;
    const name = String(b.name || "").trim();
    if (!name) return NextResponse.json({ ok: false }, { status: 400 });

    await db.contactLead.create({
      data: {
        name: name.slice(0, 120),
        vehicle: String(b.vehicle || "").slice(0, 120),
        km: String(b.km || "").slice(0, 40),
        service: String(b.service || "").slice(0, 120),
        message: String(b.message || "").slice(0, 2000),
      },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function GET() {
  if (!(await isAuthenticated()))
    return NextResponse.json({ ok: false }, { status: 401 });
  const leads = await db.contactLead.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
  });
  return NextResponse.json({ ok: true, leads });
}
