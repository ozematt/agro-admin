import { z } from "zod";

export const reservationSchema = z
  .object({
    first_name: z
      .string()
      .min(2, "Imię musi mieć co najmniej 2 znaki")
      .nonempty("Imię jest wymagane"),
    last_name: z
      .string()
      .min(2, "Nazwisko musi mieć co najmniej 2 znaki")
      .nonempty("Nazwisko jest wymagane"),
    phone: z
      .string()
      .nonempty("Numer telefonu jest wymagany") // najpierw sprawdzamy pustą wartość
      .refine((val) => {
        const digits = val.replace(/\D/g, ""); // zostają tylko cyfry
        return digits.length >= 9;
      }, "Numer telefonu musi zawierać co najmniej 9 cyfr"),
    email: z
      .email("Nieprawidłowy adres e-mail")
      .nonempty("Email jest wymagany"),
    reservation_number: z.string(),
    check_in: z.string().nonempty("Data zameldowania jest wymagana"),
    check_out: z.string().nonempty("Data wymeldowania jest wymagana"),
    nights: z.coerce.number(),
    adults: z.coerce
      .number()
      .min(1, "Liczba dorosłych musi wynosić co najmniej 1"),
    children: z.coerce.number().optional(),
    guests: z.coerce.number().min(1, "Liczba gości musi wynosić co najmniej 1"),
    property_id: z.string().min(1, "ID domku jest wymagane"),
    status: z.enum(["potwierdzony", "oczekujący", "odrzucony"]),
    notes: z
      .string()
      .max(1000, "Notatka może mieć maksymalnie 1000 znaków")
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.check_in || !data.check_out) return true; // inne walidacje obsługują empty
      const checkInDate = new Date(data.check_in);
      const checkOutDate = new Date(data.check_out);
      return checkInDate < checkOutDate;
    },
    {
      message: "Data zameldowania musi być wcześniejsza niż data wymeldowania",
      path: ["check_out"], // przypisz błąd do pola check_out
    },
  );
