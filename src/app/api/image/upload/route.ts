import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/admin";
import sharp from "sharp";
import { revalidateTag } from "next/cache";

const supabase = createAdminClient();

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    // Pobiera bucketName z formData
    const bucketName = formData.get("bucketName") as string;

    // Pobiera pliki z formData
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "Brak plików" }, { status: 400 });
    }

    const results = await Promise.allSettled(
      files.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Kompresja
        const compressedBuffer = await sharp(buffer)
          .resize({ width: 1200 })
          .webp()
          .toBuffer();

        // Generuj nazwę
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(7);
        const filename = `${timestamp}-${randomString}.webp`;
        const filepath = `images/${filename}`;

        // Upload do Supabase
        const { error } = await supabase.storage
          .from(bucketName)
          .upload(filepath, compressedBuffer, {
            contentType: "image/webp",
            cacheControl: "3600",
            upsert: false,
          });

        if (error) throw new Error(error.message);

        const { data: urlData } = supabase.storage
          .from(bucketName)
          .getPublicUrl(filepath);

        return {
          url: urlData.publicUrl,
          path: filepath,
          originalSize: buffer.length,
          compressedSize: compressedBuffer.length,
        };
      }),
    );

    const successful = results.filter((r) => r.status === "fulfilled");
    const failed = results.filter((r) => r.status === "rejected");

    // Rewalidacja tagu
    revalidateTag(`images-${bucketName}`, "max");

    return NextResponse.json({
      success: true,
      uploaded: successful.length,
      failed: failed.length,
      images: successful.map(
        (r) => (r as PromiseFulfilledResult<unknown>).value,
      ),
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Upload failed" },
      { status: 500 },
    );
  }
}
