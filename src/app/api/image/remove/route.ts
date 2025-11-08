import { NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";
import { revalidatePath } from "next/cache";

const supabase = createAdminClient();

export async function POST(req: Request) {
  try {
    const { bucket, path } = await req.json();
    const { error } = await supabase.storage.from(bucket).remove([path]);

    if (error)
      return NextResponse.json({ error: error.message }, { status: 400 });

    // revalidateTag(`image-${bucket}`, "max");
    revalidatePath(`/panel/${bucket}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Błąd serwera:", error);
    return NextResponse.json(
      { error: "Błąd serwera lub nieprawidłowe dane" },
      { status: 500 },
    );
  }
}
