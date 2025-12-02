"use server";

import { reservationSchema } from "@/lib/schemas";
import { createReservationNumber, getNights } from "@/utils/helpers";
import { createAdminClient } from "@/utils/supabase/admin";
import { refresh, revalidateTag } from "next/cache";
import z from "zod";

const supabase = createAdminClient();

// NOTE: Nie używamy bibliotek klienckich (toast)
export type Errors = {
  formErrors: string[];
  fieldErrors: { [key: string]: string[] };
};

export type ReservationSchema = z.infer<typeof reservationSchema>;

export type State = {
  currentState?: Partial<ReservationSchema>;
  success?: boolean;
  errors?: { [key: string]: string[] } | null;
};

export async function addReservationAction(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const check_in = formData.get("check_in") as string;
  const check_out = formData.get("check_out") as string;
  const adults = Number(formData.get("adults") ?? 2);
  const children = Number(formData.get("children") ?? 0);

  const guests = adults + children;
  const nights = getNights(check_in, check_out);
  const reservationNumber = createReservationNumber(check_in);

  formData.append("guests", guests.toString());
  formData.append("nights", nights.toString());
  formData.append("reservation_number", reservationNumber);

  const data = Object.fromEntries(formData.entries());

  const parsedData = reservationSchema.safeParse(data);

  if (!parsedData.success) {
    const currentState = {
      ...prevState.currentState,
      ...data,
    };
    const flatten = z.flattenError(parsedData.error);
    return {
      currentState,
      success: false,
      errors: flatten.fieldErrors,
    };
  }

  // TODO: Add logic to save the reservation to the database (e.g., Supabase)
  // const { error } = await supabase.from('reservations').insert([parsedData.data]);

  return {
    currentState: parsedData.data,
    success: true,
    errors: null,
  };
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
