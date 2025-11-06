import { NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";

const supabase = createAdminClient();

export async function POST(req: Request) {
  const { bucket, path } = await req.json();
  const { error } = await supabase.storage.from(bucket).remove([path]);
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}
