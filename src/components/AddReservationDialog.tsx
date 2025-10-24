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
import { Plus } from "lucide-react";

import { DatePicker } from "@/components";

const AddReservationDialog = () => {
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
          <DialogTitle>Dodaj nową rezerwacje</DialogTitle>
          <DialogDescription>
            Wprowadź poniżej dane gościa i date rezerwacji.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName">Imię</Label>
            <Input id="firstName" placeholder="Jan" className="w-full" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Nazwisko</Label>
            <Input id="lastName" placeholder="Kowalski" className="w-full" />
          </div>
        </div>

        {/* Number of Guests Input Field */}
        <div className="grid gap-2">
          <Label htmlFor="guests">Ilość Gości</Label>
          <Input
            id="guests"
            type="number"
            min="1"
            max="10"
            defaultValue="2"
            placeholder="2"
            className="w-full"
          />
        </div>

        {/* Date Input */}
        <div className="grid gap-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <div className="relative">
                <DatePicker label="Data zameldowania" />
              </div>
            </div>
            <div className="grid gap-2">
              <DatePicker label="Data wymeldowania" />
            </div>
          </div>
        </div>

        {/* Static Hotel Display */}
        <div className="grid gap-2">
          <Label>Domek</Label>
          <div className="border-border bg-muted/50 flex items-center gap-3 rounded-lg border px-4 py-3">
            <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-md"></div>
            <div className="flex-1">
              <p className="text-foreground font-medium">Hotel A</p>
              <p className="text-muted-foreground text-sm">Luxury Suite</p>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" type="button">
            Anuluj
          </Button>
          <Button type="submit">Zapisz Rezerwacje</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddReservationDialog;
