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
import { DatePicker } from "@/components";
import { usePathname } from "next/navigation";
import { Textarea } from "./ui/textarea";
import {
  addReservationAction,
  updateReservationAction,
  type ReservationSchema,
  type State,
} from "@/app/panel/[slug]/actions";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getCurrentProperty } from "@/lib/data";
import { Reservation } from "./ReservationViewer";

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
  errors: undefined,
};

type Props = {
  reservation?: Reservation;
  buttonTrigger?: React.ReactNode;
  variant?: "edit" | "add";
};

// TODO: wymiecić kalendarze na te z wykluczającymi datami z croos

const AddReservationDialog = ({
  reservation,
  buttonTrigger,
  variant = "add",
}: Props) => {
  const pathname = usePathname();
  const { name, id, Icon, description } = getCurrentProperty(pathname);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [state, formAction, isPending] = useActionState(
    variant === "add" ? addReservationAction : updateReservationAction,
    initialState,
  );

  useEffect(() => {
    if (state.success) {
      toast.success("Dodano rezerwację pomyślnie!");
      setIsDialogOpen(false);
    }
    if (state.errors) {
      toast.error("Błąd dodawania rezerwacji");
    }
  }, [state.success, state.errors]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{buttonTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {variant === "add" ? "Dodaj nową" : "Edytuj"} rezerwację
          </DialogTitle>
          <DialogDescription>
            Wprowadź poniżej dane gościa i daty rezerwacji.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          {/* Hidden inputs */}
          {reservation && (
            <>
              <Input
                type="hidden"
                name="reservation_id"
                value={reservation.id}
              />
              <Input
                type="hidden"
                name="guest_id"
                value={reservation.guest_id.id}
              />
            </>
          )}
          {/* hidden status */}
          <Input type="hidden" name="status" id="status" value="potwierdzony" />
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
                  reservation?.guest_id.first_name ??
                  state?.currentState?.first_name ??
                  ""
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
                  reservation?.guest_id.last_name ??
                  state?.currentState?.last_name ??
                  ""
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
                  reservation?.guest_id.phone ??
                  state?.currentState?.phone ??
                  ""
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
                  reservation?.guest_id.email ??
                  state?.currentState?.email ??
                  ""
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
                defaultValue={
                  reservation?.adults ?? state?.currentState?.adults ?? ""
                }
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
                  reservation?.children ?? state?.currentState?.children ?? 0
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
                defaultValue={reservation && new Date(reservation.check_in)}
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
                defaultValue={reservation && new Date(reservation.check_out)}
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
                reservation?.notes ?? state?.currentState?.notes ?? ""
              }
            />
            {state.errors?.notes && (
              <p className="text-destructive text-[11px]">
                {state.errors?.notes[0]}
              </p>
            )}
          </div>

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
