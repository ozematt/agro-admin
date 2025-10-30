"use server";

import { reservationDialogSchema } from "@/lib/schemas";

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

  return { success: "dane wysłane" };
}
