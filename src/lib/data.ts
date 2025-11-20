import { createAdminClient } from "@/utils/supabase/admin";

const supabase = createAdminClient();

// NOTE: Functions for images fetching from supabase bucket
export async function getAllImagesFromBucket(bucketName: string) {
  try {
    const { data: files, error } = await supabase.storage
      .from(bucketName)
      .list("images", {
        limit: 1000,
        offset: 0,
        sortBy: { column: "created_at", order: "desc" },
      });

    if (error) throw error;

    const images = files
      .filter((file) => !file.name.endsWith(".emptyFolderPlaceholder"))
      .map((file) => {
        const filepath = "images/" + `${file.name}`;
        const { data: urlData } = supabase.storage
          .from(bucketName)
          .getPublicUrl(filepath);

        return {
          title: file.name,
          src: urlData.publicUrl,
          path: filepath,
          // width:"",
          // height:"",
          // alt:"",
          size: file.metadata?.size || 0,
          createdAt: file.created_at,
          id: file.id,
        };
      });
    return { success: true, images };
  } catch (error) {
    return {
      success: false,
      images: [],
      error: error instanceof Error ? error.message : "Nieznany błąd",
    };
  }
}
