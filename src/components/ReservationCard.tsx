"use client";

import { useState } from "react";
import {
  User,
  Calendar,
  Users,
  Trash2,
  Check,
  X,
  ChevronRight,
} from "lucide-react";
import { formatDateRange } from "@/utils/helpers";
import { Reservation } from "./ReservationViewer";
import { cn } from "@/lib/utils";

type Prop = {
  reservation: Reservation;
};

const ReservationCard = ({ reservation }: Prop) => {
  const { check_in, check_out, status } = reservation;
  const [isHovered, setIsHovered] = useState(false);
  const reservationDate = formatDateRange(check_in, check_out);

  const statusColors = {
    oczekujący:
      "dark:bg-chart-3/20 bg-chart-4/10 text-chart-4 dark:text-chart-3 border-chart-4 dark:border-chart-3",
    potwierdzony:
      "dark:bg-chart-2/20 bg-chart-2/10 text-chart-2 dark:text-chart-2 border-chart-2 dark:border-chart-2",
    odrzucony:
      "dark:bg-destructive/20 bg-destructive/10 text-destructive dark:text-destructive border-destructive dark:border-destructive",
  };

  if (status === "oczekujący") {
    return (
      <div
        className="hover:bg-secondary/20 bg-card relative cursor-pointer rounded-xl border p-5 transition-all duration-200 hover:shadow-lg hover:shadow-black/20"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-start justify-between gap-4">
          {/* Lewa sekcja - Główne info */}
          <div className="flex-1 space-y-3">
            {/* Gość i status */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="bg-muted-foreground/10 flex h-10 w-10 items-center justify-center rounded-full">
                  <User className="text-foreground/70 h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">
                  {reservation.guest_id.first_name}{" "}
                  {reservation.guest_id.last_name}
                </h3>
              </div>
              <span
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium",
                  statusColors.oczekujący,
                )}
              >
                {reservation.status}
              </span>
            </div>

            {/* Daty i goście */}
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="text-foreground/50 h-4 w-4" />
                <span className="font-medium">{reservationDate}</span>
                <span className="text-muted-foreground/80">
                  • {reservation.nights} noce
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-foreground/50 h-4 w-4" />
                <span className="font-medium"> {reservation.guests} osoby</span>
              </div>
            </div>
          </div>

          {/* Prawa sekcja - Akcje */}
          <div
            className={cn(
              "flex items-center gap-2 transition-opacity duration-200",
              isHovered ? "opacity-100" : "opacity-0",
            )}
          >
            <button
              className="rounded-lg bg-emerald-500/10 p-2 text-emerald-400 transition-colors hover:bg-emerald-500/20"
              title="Zatwierdź"
            >
              <Check className="h-5 w-5" />
            </button>
            <button
              className="rounded-lg bg-red-500/10 p-2 text-red-400 transition-colors hover:bg-red-500/20"
              title="Odrzuć"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              className="hover:bg-zinc-750 rounded-lg bg-zinc-800 p-2 text-zinc-400 transition-colors hover:text-zinc-300"
              title="Usuń"
            >
              <Trash2 className="h-5 w-5" />
            </button>
            <button
              className="hover:bg-zinc-750 ml-1 rounded-lg bg-zinc-800 p-2 text-zinc-400 transition-colors hover:text-zinc-300"
              title="Szczegóły"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Mobilna wersja akcji - zawsze widoczna */}
          <div className="flex items-center gap-2 md:hidden">
            <button className="rounded-lg bg-zinc-800 p-2 text-zinc-400">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (status === "potwierdzony") {
    return (
      <div className="bg-card rounded-xl border p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="bg-muted-foreground/10 flex h-10 w-10 items-center justify-center rounded-full">
                  <User className="text-foreground/70 h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">
                  {reservation.guest_id.first_name}{" "}
                  {reservation.guest_id.last_name}
                </h3>
              </div>
              <span
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium",
                  statusColors.potwierdzony,
                )}
              >
                {reservation.status}
              </span>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="text-foreground/50 h-4 w-4" />
                <span className="font-medium">{reservationDate}</span>
                <span className="text-muted-foreground/80">
                  • {reservation.nights} noce
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-foreground/50 h-4 w-4" />
                <span className="font-medium"> {reservation.guests} osoby</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl space-y-4">
      {/* Wersja odrzucona */}
      <div className="bg-card rounded-xl border p-5 opacity-60">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="bg-muted-foreground/10 flex h-10 w-10 items-center justify-center rounded-full">
                  <User className="text-foreground/70 h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">
                  {reservation.guest_id.first_name}{" "}
                  {reservation.guest_id.last_name}
                </h3>
              </div>
              <span
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium",
                  statusColors.odrzucony,
                )}
              >
                {reservation.status}
              </span>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="text-foreground/50 h-4 w-4" />
                <span className="font-medium">{reservationDate}</span>
                <span className="text-muted-foreground/80">
                  • {reservation.nights} noce
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-foreground/50 h-4 w-4" />
                <span className="font-medium"> {reservation.guests} osoby</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
