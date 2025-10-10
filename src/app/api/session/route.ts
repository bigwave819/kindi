import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await auth.api.getSession({ headers: new Headers() });
    return NextResponse.json(session);
  } catch (err) {
    console.error("Failed to fetch session:", err);
    return NextResponse.json({ error: "Failed to get session" }, { status: 500 });
  }
}
