import { NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";
import sharp from "sharp";

const supabase = createAdminClient();

export async function POST(req) {
  const formData = await req.formData();
  const files = formData.getAll("files");
  const urls = [];

  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = `images/${Date.now()}-${file.name}`;

    // Kompresja obrazu
    const compressedBuffer = await sharp(buffer)
      .resize({ width: 1200 })
      .webp()
      .toBuffer();

    const { error } = await supabase.storage
      .from("images")
      .upload(filePath, compressedBuffer, { contentType: file.type });

    if (!error) {
      const { data } = supabase.storage.from("images").getPublicUrl(filePath);
      urls.push(data.publicUrl);
    }
  }
  //TODO: dodać revalidation
  return NextResponse.json({ urls });
}
