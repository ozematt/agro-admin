import { createAdminClient } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/client";

//

// TODO: Function for reservation feaching

// NOTE: Functions for images fetching from supabase bucket
export async function getAllImagesFromBucket(bucketName: string) {
  const supabase = createAdminClient();

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

// nazwa domku/property
export async function getReservation(propertyName: string) {
  const supabase = createClient();
  try {
    const propertyId = await getPropertyId(propertyName);

    if (propertyId.error) {
      throw new Error("Nie ma tekiego obiektu.");
    }

    const { data, error } = await supabase
      .from("reservation")
      .select(`*, guest_id(id, first_name, last_name)`)
      .eq("property_id", propertyId.propertyId[0].id);

    if (error) {
      throw new Error(`Błąd Supabase: ${error.message}`);
    }
    return { success: true, reservations: data, error: undefined };
  } catch (error) {
    return {
      success: false,
      reservation: [],
      error: error instanceof Error ? error.message : "Nieznany błąd",
    };
  }
}

export async function getPropertyId(propertyName: string) {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("property")
      .select("id")
      .eq("name", propertyName);
    if (error) {
      throw new Error(`Błąd Supabase: ${error.message}`);
    }

    return { success: true, propertyId: data, error: undefined };
  } catch (error) {
    throw error;
  }
}

// export async function getGuestsInfo(guestsId: number) {
//   const supabase = createClient();
//   try {
//     const { data, error } = await supabase
//       .from("guests")
//       .select()
//       .eq("id", guestsId);

//     if (error) {
//       throw new Error(`Błąd Supabase: ${error.message}`);
//     }

//     return { success: true, guestsInfo: data, error: undefined };
//   } catch (error) {
//     return {
//       success: false,
//       guestsInfo: [],
//       error: error instanceof Error ? error.message : "Nieznany błąd",
//     };
//   }
// }
