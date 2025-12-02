import { PROPERTIES } from "@/config";
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
export async function getReservation(
  propertySlug?: string,
  propertyId?: number,
) {
  const supabase = createClient();

  try {
    let id;
    if (!propertyId && propertySlug) {
      id = await getPropertyId(propertySlug);
    } else {
      id = propertyId;
    }

    const { data, error } = await supabase
      .from("reservation")
      .select(`*, guest_id(*)`)
      .eq("property_id", id);

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

// Pobiera dni rezerwacji dla danego obiektu
export async function getReservedDays(propertySlug: string) {
  const supabase = createClient();
  try {
    const propertyId = await getPropertyId(propertySlug);

    const { data, error } = await supabase
      .from("reservation")
      .select("check_in, check_out")
      .eq("property_id", propertyId);
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
export async function getPropertyId(propertySlug: string) {
  try {
    const property = PROPERTIES.find(
      (property) => property.slug === propertySlug,
    );
    if (!property) throw new Error("Nie znaleziono obiektu");
    return property.id;
  } catch (error) {
    console.error("Błąd:", error);
  }
}
