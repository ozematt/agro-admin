import { z } from "zod";

export const reservationDialogSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  guests: z.coerce.number(),
  checkIn: z.string(),
  checkOut: z.string(),
  property: z.string(),
});
