"use server";

import { reservationDialogSchema } from "@/lib/schemas";
import { createAdminClient } from "@/utils/supabase/admin";

type State = {
  error?: Record<string, string[]>;
  success?: string;
};

const supabase = createAdminClient();

export async function submitForm(
  prevState: State,
  formData: FormData,
): Promise<State> {
  console.log(Object.fromEntries(formData.entries()));

  const parsedData = reservationDialogSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    guests: formData.get("guests"),
    checkIn: formData.get("checkIn"),
    checkOut: formData.get("checkOut"),
    property: formData.get("property"),
    status: formData.get("status"),
  });

  if (!parsedData.success) {
    return { error: parsedData.error.flatten().fieldErrors };
  }

  // TODO: Add logic to save the reservation to the database (e.g., Supabase)
  // const { error } = await supabase.from('reservations').insert([parsedData.data]);

  return { success: "dane wysłane" };
}

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
          name: file.name,
          url: urlData.publicUrl,
          path: filepath,
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

// obliczanie miejsca we wiadrze:
// import { createClient } from '@supabase/supabase-js';

// // --- KONFIGURACJA ---
// const SUPABASE_URL = 'https://twoj-projekt.supabase.co';
// const SUPABASE_KEY = 'twój-klucz-serwisowy'; // użyj service_role key
// const BUCKET_NAME = 'nazwa_bucketu';

// // --- KOD ---
// const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// async function obliczUzycieBucketu(bucket) {
//   let totalBytes = 0;
//   let page = 0;
//   const pageSize = 1000;

//   while (true) {
//     const { data, error } = await supabase.storage
//       .from(bucket)
//       .list('', { limit: pageSize, offset: page * pageSize });

//     if (error) {
//       console.error('Błąd przy pobieraniu:', error);
//       break;
//     }

//     if (!data || data.length === 0) break;

//     for (const file of data) {
//       if (file.metadata?.size) {
//         totalBytes += file.metadata.size;
//       }
//     }

//     if (data.length < pageSize) break;
//     page++;
//   }

//   const mb = (totalBytes / (1024 * 1024)).toFixed(2);
//   console.log(`Bucket "${bucket}" zajmuje ${mb} MB`);
// }

// obliczUzycieBucketu(BUCKET_NAME);
