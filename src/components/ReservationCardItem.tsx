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
import { cn } from "@/lib/utils";
import { ReservationDetailsCard } from "@/components";

type Props = {
  first_name: string;
  last_name: string;
  reservationDate: string;
  nights: number;
  guests: number;
  status: "oczekujący" | "potwierdzony" | "odrzucony";
  reservationId: number;
};

const ReservationCardItem = ({
  first_name,
  last_name,
  reservationDate,
  nights,
  guests,
  status,
  reservationId,
}: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  const statusColors = {
    oczekujący:
      "dark:bg-chart-3/20 bg-chart-4/10 text-chart-4 dark:text-chart-3 border-chart-4 dark:border-chart-3",
    potwierdzony:
      "dark:bg-chart-2/20 bg-chart-2/10 text-chart-2 dark:text-chart-2 border-chart-2 dark:border-chart-2",
    odrzucony:
      "dark:bg-destructive/20 bg-destructive/10 text-destructive dark:text-destructive border-destructive dark:border-destructive",
  };

  return (
    <div
      className={cn(
        "hover:bg-secondary/20 bg-card relative rounded-xl border p-5 transition-all duration-200",
        status === "odrzucony" && "opacity-60",
      )}
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
                {first_name} {last_name}
              </h3>
            </div>
            <span
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium",
                status === "oczekujący" && statusColors.oczekujący,
                status === "potwierdzony" && statusColors.potwierdzony,
                status === "odrzucony" && statusColors.odrzucony,
              )}
            >
              {status}
            </span>
          </div>

          {/* Daty i goście */}
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="text-foreground/50 h-4 w-4" />
              <span className="font-medium">{reservationDate}</span>
              <span className="text-muted-foreground/80">• {nights} noce</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="text-foreground/50 h-4 w-4" />
              <span className="font-medium"> {guests} osoby</span>
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
            className={cn(
              "cursor-pointer rounded-lg bg-emerald-500/10 p-2 text-emerald-400 transition-colors hover:bg-emerald-500/20",
              status === "potwierdzony" && "hidden",
              status === "odrzucony" && "hidden",
            )}
            title="Zatwierdź"
          >
            <Check className="h-5 w-5" />
          </button>
          <button
            className={cn(
              "cursor-pointer rounded-lg bg-red-500/10 p-2 text-red-400 transition-colors hover:bg-red-500/20",
              status === "potwierdzony" && "hidden",
              status === "odrzucony" && "hidden",
            )}
            title="Odrzuć"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            className={cn(
              "bg-muted-foreground/10 dark:text-destructive border-destructive dark:border-destructive text-bleck hover:bg-destructive/60 cursor-pointer rounded-lg p-2 transition-colors hover:text-white dark:hover:text-black/80",
              status === "potwierdzony" && "hidden",
            )}
            title="Usuń"
          >
            <Trash2 className="h-5 w-5" />
          </button>
          <button
            className={cn(
              "hover:bg-muted-foreground/30 bg-muted-foreground/10 ml-1 cursor-pointer rounded-lg p-2 text-black transition-colors dark:text-white/50",
              status === "odrzucony" && "hidden",
            )}
            title="Szczegóły"
            onClick={() => setOpenDetails(true)}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Mobilna wersja akcji - zawsze widoczna */}
        {/* <div className="flex items-center gap-2 md:hidden">
            <button className="rounded-lg bg-zinc-800 p-2 text-zinc-400">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div> */}
      </div>

      {openDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpenDetails(false)}
          />
          <div className="relative z-10">
            <ReservationDetailsCard />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationCardItem;
