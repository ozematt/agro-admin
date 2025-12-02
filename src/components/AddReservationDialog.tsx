"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { DatePicker } from "@/components";
import { usePathname } from "next/navigation";
import { getCurrentProperty } from "@/utils/helpers";
import { Textarea } from "./ui/textarea";
import {
  addReservationAction,
  ReservationSchema,
  State,
} from "@/app/panel/[slug]/actions";
import { useActionState, useEffect } from "react";
import toast from "react-hot-toast";

export const emptyReservation: ReservationSchema = {
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  reservation_number: "",
  check_in: "",
  check_out: "",
  nights: 0,
  adults: 2,
  children: 0,
  guests: 2,
  property_id: "",
  status: "oczekujący",
  notes: "",
};

export const initialState: State = {
  currentState: emptyReservation,
  success: undefined,
  errors: null,
};

const AddReservationDialog = () => {
  const pathname = usePathname();
  const { name, id, Icon, description } = getCurrentProperty(pathname);

  const [state, formAction, isPending] = useActionState(
    addReservationAction,
    initialState,
  );

  // useEffect(() => {
  //   if (state.success) {
  //     toast.success("Dodano rezerwację pomyślnie!");
  //   }
  // }, [state.success]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Dodaj rezerwację</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dodaj nową rezerwację</DialogTitle>
          <DialogDescription>
            Wprowadź poniżej dane gościa i daty rezerwacji.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          {/* Dane osobowe */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first_name">Imię</Label>
              <Input
                id="first_name"
                name="first_name"
                type="text"
                placeholder="Jan"
                defaultValue={
                  !state.success
                    ? (state?.currentState?.first_name as string)
                    : ""
                }
              />
              {state.errors?.first_name && (
                <p className="text-destructive text-[11px]">
                  {state.errors?.first_name[0]}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last_name">Nazwisko</Label>
              <Input
                id="last_name"
                name="last_name"
                type="text"
                placeholder="Kowalski"
                defaultValue={
                  !state.success
                    ? (state?.currentState?.last_name as string)
                    : ""
                }
              />
              {state.errors?.last_name && (
                <p className="text-destructive text-[11px]">
                  {state.errors?.last_name[0]}
                </p>
              )}
            </div>
          </div>
          {/* Kontakt */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Numer telefonu</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+48 123 456 778"
                defaultValue={
                  !state.success ? (state?.currentState?.phone as string) : ""
                }
              />
              {state.errors?.phone && (
                <p className="text-destructive text-[11px]">
                  {state.errors.phone[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="jan.kowalski@email.com"
                defaultValue={
                  !state.success ? (state?.currentState?.email as string) : ""
                }
              />
              {state.errors?.email && (
                <p className="text-destructive text-[11px]">
                  {state.errors?.email[0]}
                </p>
              )}
            </div>
          </div>

          {/* Liczba gości */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="adults">Dorośli</Label>
              <Input
                id="adults"
                name="adults"
                type="number"
                min="1"
                defaultValue={!state.success ? state?.currentState?.adults : 2}
              />
              {state.errors?.adults && (
                <p className="text-destructive text-[11px]">
                  {state.errors?.adults[0]}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="children">Dzieci</Label>
              <Input
                id="children"
                name="children"
                type="number"
                min="0"
                defaultValue={
                  !state.success ? state?.currentState?.children : 0
                }
              />
              {state.errors?.children && (
                <p className="text-destructive text-[11px]">
                  {state.errors?.children[0]}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <DatePicker
                label="Data zameldowania"
                name="check_in"
                id="check_in"
              />
              {state.errors?.check_in && (
                <p className="text-destructive text-[11px]">
                  {state.errors?.check_in[0]}
                </p>
              )}
            </div>
            <div>
              <DatePicker
                label="Data wymeldowania"
                name="check_out"
                id="check_out"
              />
              {state.errors?.check_out && (
                <p className="text-destructive text-[11px]">
                  {state.errors?.check_out[0]}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="property_id">Obiekt</Label>
            {/* hidden input - PROPERTY */}
            <Input
              type="hidden"
              name="property_id"
              id="property_id"
              value={id}
            />
            <div className="border-border bg-muted/50 flex items-center gap-3 rounded-lg border px-4 py-3">
              <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-md">
                <Icon className="text-primary h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-foreground font-medium">{name}</p>
                <p className="text-muted-foreground text-sm">{description}</p>
              </div>
            </div>
          </div>

          {/* Notatki */}
          <div className="space-y-2">
            <Label htmlFor="notes">Notatki</Label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="Dodatkowe informacje o rezerwacji..."
              className="min-h-[100px] resize-none"
              defaultValue={
                !state.success ? (state?.currentState?.notes as string) : ""
              }
            />
            {state.errors?.notes && (
              <p className="text-destructive text-[11px]">
                {state.errors?.notes[0]}
              </p>
            )}
          </div>
          {/* hidden input - STATUS */}
          <Input type="hidden" name="status" id="status" value="potwierdzony" />
          <DialogFooter className="gap-2">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Anuluj
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Dodaje..." : "Zapisz rezerwację"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReservationDialog;
