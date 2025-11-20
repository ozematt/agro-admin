"use server";

import { reservationDialogSchema } from "@/lib/schemas";
import { createAdminClient } from "@/utils/supabase/admin";
import { refresh, revalidateTag } from "next/cache";

const supabase = createAdminClient();

// NOTE: Nie używamy bibliotek klienckich (toast)

type State = {
  error?: Record<string, string[]>;
  success?: string;
};

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

export async function deleteImageFromBucket(formData: FormData) {
  const bucketName = formData.get("bucket") as string;
  const path = formData.get("path") as string;

  const { error } = await supabase.storage.from(bucketName).remove([path]);

  if (error) {
    return { success: false, message: "Błąd serwera: " + error.message };
  }

  revalidateTag(`images-${bucketName}`, "max");
  refresh();
  return { success: true, message: "Plik został usunięty" };
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
