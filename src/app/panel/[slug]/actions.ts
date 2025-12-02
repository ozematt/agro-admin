"use server";

import { checkReservation } from "@/lib/reservations";
import { reservationSchema } from "@/lib/schemas";
import { createReservationNumber, getNights } from "@/utils/helpers";
import { createAdminClient } from "@/utils/supabase/admin";
import { refresh, revalidateTag } from "next/cache";
import z from "zod";

const supabase = createAdminClient();

// NOTE: Nie używamy bibliotek klienckich (toast)
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

  const parsed = reservationSchema.safeParse(data);

  if (!parsed.success) {
    const currentState = {
      ...prevState.currentState,
      ...data,
    };
    const flatten = z.flattenError(parsed.error);
    return {
      currentState,
      success: false,
      errors: flatten.fieldErrors,
    };
  }
  // sprawdzanie dostępności terminu rezerwacji
  const isAvailable = await checkReservation(
    parsed.data.check_in,
    parsed.data.check_out,
    "",
    Number(parsed.data.property_id),
  );

  if (!isAvailable) {
    return {
      currentState: prevState.currentState,
      success: false,
      errors: {
        check_in: ["Termin zajety"],
        check_out: ["Termin zajęty"],
      },
    };
  }

  // obiekt dla bazy danych
  const guest = {
    first_name: parsed.data.first_name,
    last_name: parsed.data.last_name,
    email: parsed.data.email,
    phone: Number(parsed.data.phone),
  };

  let guestId = 0;

  // Dodawanie gościa do bazy danych
  try {
    // Sprawdzanie czy mamy już dane gościa
    const { data, error } = await supabase
      .from("guests")
      .select()
      .eq("first_name", guest.first_name)
      .eq("last_name", guest.last_name)
      .eq("email", guest.email)
      .eq("phone", guest.phone);

    if (error) {
      guestId = 0;
      throw new Error("Błąd:", error);
    }

    if (data?.length > 0) {
      // jeśli mamy dane przypisujemy id gości do zmiennej
      guestId = data[0].id;
    } else {
      // jeśli nie mamy dodajemy go do bazy danych
      try {
        const { data, error } = await supabase
          .from("guests")
          .insert([guest])
          .select("id");
        if (error) {
          guestId = 0;
          throw new Error("Błąd:", error);
        }
        // przypisujemy id nowo dodanego gościa do zmiennej
        guestId = data[0].id;
      } catch (error) {
        throw error;
      }
    }

    if (error) {
      throw new Error("Błąd:", error);
    }
  } catch (error) {
    console.error("Błąd dodawania gościa:", error);
  }

  // obiekt dla bazy danych
  const reservation = {
    reservation_number: parsed.data.reservation_number,
    property_id: Number(parsed.data.property_id),
    check_in: parsed.data.check_in,
    check_out: parsed.data.check_out,
    nights: Number(parsed.data.nights),
    status: parsed.data.status,
    guests: Number(parsed.data.guests),
    adults: Number(parsed.data.adults),
    children: Number(parsed.data.children),
    guest_id: Number(guestId),
    notes: parsed.data.notes,
  };

  // dodawanie rezerwacji do bazy dancyh
  try {
    if (guestId === 0) {
      throw new Error("Nie dodano gościa");
    }
    const { data, error } = await supabase
      .from("reservation")
      .insert([reservation])
      .select();

    if (error) {
      throw new Error("Błąd:", error);
    }
    console.log("Nowa rezerwacja:", data);
  } catch (error) {
    console.log(error);
  }

  // rewalidacja danych z cache
  revalidateTag("reservation", "max");
  refresh();

  return {
    currentState: parsed.data,
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
