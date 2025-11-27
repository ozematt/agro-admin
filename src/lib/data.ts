import { createAdminClient } from "@/utils/supabase/admin";
import { createClient } from "@/utils/supabase/client";

// Pobera wszystkie zdjęcia z backet w supabase
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

// Pobiera wszystkie dane związane z rezerwacją dla konkretego obiektu
export async function getReservation(propertyName: string) {
  const supabase = createClient();
  try {
    const propertyId = await getPropertyId(propertyName);

    if (propertyId.error) {
      throw new Error("Nie ma tekiego obiektu.");
    }

    const { data, error } = await supabase
      .from("reservation")
      .select(`*, property_id(*), guest_id(*)`)
      .eq("property_id", propertyId.propertyId[0].id);

    if (error) {
      throw new Error(`Błąd Supabase: ${error.message}`);
    }
    return { success: true, reservations: data, error: undefined };
  } catch (error) {
    return {
      success: false,
      reservations: [],
      error: error instanceof Error ? error.message : "Nieznany błąd",
    };
  }
}

// pobiera id konkretnego obiektu
export async function getPropertyId(propertyName: string) {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("property")
      .select("id")
      .eq("slug", propertyName);
    if (error) {
      throw new Error(`Błąd Supabase: ${error.message}`);
    }

    return { success: true, propertyId: data, error: undefined };
  } catch (error) {
    throw error;
  }
}

// Pobiera dni rezerwacji dla danego obiektu
export async function getReservationDays(propertyName: string) {
  const supabase = createClient();
  try {
    const propertyId = await getPropertyId(propertyName);

    if (propertyId.error) {
      throw new Error("Nie ma tekiego obiektu.");
    }

    const { data, error } = await supabase
      .from("reservation")
      .select("check_in, check_out")
      .eq("property_id", propertyId.propertyId[0].id);
    if (error) {
      throw new Error(`Błąd Supabase: ${error.message}`);
    }

    return { success: true, reservationDays: data, error: undefined };
  } catch (error) {
    return {
      success: false,
      reservationDays: [],
      error: error instanceof Error ? error.message : "Nieznany błąd",
    };
  }
}

// Pobiera dane o obiektach do wynajęcia
// export async function getPropertyNames() {
//   const supabase = createClient();
//   try {
//     const { data, error } = await supabase.from("property").select("name");

//     if (error) {
//       throw new Error(`Błąd Supabase: ${error.message}`);
//     }

//     return { success: true, property: data, error: undefined };
//   } catch (error) {
//     return {
//       success: false,
//       property: [],
//       error: error instanceof Error ? error.message : "Nieznany błąd",
//     };
//   }
// }
