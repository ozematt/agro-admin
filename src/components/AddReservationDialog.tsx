"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building, Building2, House, Plus } from "lucide-react";

import { DatePicker } from "@/components";
import { usePathname } from "next/navigation";
import { useActionState } from "react";
import { submitForm } from "@/app/panel/[name]/actions";

const PROPERTIES = [
  {
    name: "Domek 1",
    slug: "domek-1",
    description: "Super domek",
    icon: House,
    id: 1,
  },
  {
    name: "Domek 2",
    slug: "domek-2",
    description: "Super domek",
    icon: Building,
    id: 2,
  },
  {
    name: "Domek 3",
    slug: "domek-3",
    description: "Super domek",
    icon: Building2,
    id: 3,
  },
];

const initialState = { error: {}, success: "" };

const AddReservationDialog = () => {
  const pathname = usePathname();
  const slug = pathname.split("/")[2];
  const property = PROPERTIES.find((property) => property.slug === slug);

  const [state, formAction] = useActionState(submitForm, initialState);

  // console.log(state);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Dodaj rezerwację</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form action={formAction} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Dodaj nową rezerwację</DialogTitle>
            <DialogDescription>
              Wprowadź poniżej dane gościa i daty rezerwacji.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">Imię</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Jan"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Nazwisko</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Kowalski"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="guests">Ilość gości</Label>
            <Input
              id="guests"
              name="guests"
              type="number"
              min="1"
              max="10"
              defaultValue="2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <DatePicker label="Data zameldowania" name="checkIn" id="checkIn" />
            <DatePicker
              label="Data wymeldowania"
              name="checkOut"
              id="checkOut"
            />
          </div>

          {property && (
            <div className="grid gap-2">
              <Label htmlFor="property">Domek</Label>
              {/* hidden input - PROPERTY */}
              <Input
                type="hidden"
                name="property"
                id="property"
                value={property.slug}
              />
              <div className="border-border bg-muted/50 flex items-center gap-3 rounded-lg border px-4 py-3">
                <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-md">
                  {property.icon && (
                    <property.icon className="text-primary h-5 w-5" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-foreground font-medium">{property.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {property.description}
                  </p>
                </div>
              </div>
            </div>
          )}
          {/* hidden input - STATUS */}
          <Input type="hidden" name="status" id="status" value="potwierdzony" />
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" type="button">
              Anuluj
            </Button>
            <Button type="submit">Zapisz rezerwację</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddReservationDialog;
