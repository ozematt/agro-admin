"use server";

import { reservationDialogSchema } from "@/lib/schemas";

type State = {
  firstName: string;
  lastName: string;
  guests: number;
  checkIn: string;
  checkOut: string;
  property: string;
};

export async function submitForm(prevState: State, formData: FormData) {
  console.log(Object.fromEntries(formData.entries()));

  const parsedData = reservationDialogSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    guests: formData.get("guests"),
    checkIn: formData.get("checkIn"),
    checkOut: formData.get("checkOut"),
    property: formData.get("property"),
  });

  if (!parsedData.success) {
    return { error: parsedData.error.flatten().fieldErrors };
  }

  return { success: "dane wysłane" };
}
