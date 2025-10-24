"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Image from "next/image";

const photos = [
  {
    id: 1,
    url: "/cozy-cabin-exterior-with-mountain-view.jpg",
    alt: "Cabin exterior",
  },
  {
    id: 2,
    url: "/modern-cabin-living-room-with-fireplace.jpg",
    alt: "Living room",
  },
  {
    id: 3,
    url: "/cabin-bedroom-with-large-windows.jpg",
    alt: "Bedroom",
  },
  {
    id: 4,
    url: "/cabin-kitchen-with-wooden-counters.jpg",
    alt: "Kitchen",
  },
  {
    id: 5,
    url: "/cabin-deck-with-mountain-sunset-view.jpg",
    alt: "Deck view",
  },
  {
    id: 6,
    url: "/cabin-bathroom-with-modern-fixtures.jpg",
    alt: "Bathroom",
  },
  {
    id: 7,
    url: "/cabin-kitchen-with-wooden-counters.jpg",
    alt: "Kitchen",
  },
  {
    id: 8,
    url: "/cabin-deck-with-mountain-sunset-view.jpg",
    alt: "Deck view",
  },
  {
    id: 9,
    url: "/cabin-bathroom-with-modern-fixtures.jpg",
    alt: "Bathroom",
  },
];

export function PhotoGallery() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Galeria zdjęć</CardTitle>
        <CardDescription>Zarządzaj zdjęciami swojego obiektu</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid max-h-[350px] grid-cols-2 gap-4 overflow-y-scroll sm:grid-cols-3">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group bg-muted hover:ring-primary relative aspect-square overflow-hidden rounded-lg border transition-all hover:ring-2"
            >
              <Image
                width={100}
                height={100}
                src={photo.url || "/placeholder.svg"}
                alt={photo.alt}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                <Button variant="destructive" size="icon" className="h-8 w-8">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
