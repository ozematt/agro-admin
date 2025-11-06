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

type GalleryImage = {
  name: string;
  url: string;
  path: string;
  size: number;
  createdAt: string;
  id: string;
};
type Prop = { images: GalleryImage[]; error?: string; bucketName: string };

export function PhotoGallery({ images, error, bucketName }: Prop) {
  async function handleDelete(bucket: string, path: string) {
    const res = await fetch("/api/image/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bucket, path }),
    });
    if (res.ok) console.log("Plik usunięty");
    else console.error("Błąd:", await res.json());
  }

  let content;

  if (error) {
    return (content = <div className="p-8 text-red-500">Błąd: {error}</div>);
  } else if (images.length === 0) {
    content = (
      <span className="text-muted-foreground/50 grid h-50 place-items-center">
        <span> Brak zdjęć w galerii</span>
      </span>
    );
  } else {
    content = (
      <div className="grid max-h-[350px] grid-cols-2 gap-4 overflow-y-auto sm:grid-cols-3">
        {images.map((image) => (
          <div
            key={image.id}
            className="group bg-muted hover:ring-primary relative aspect-square overflow-hidden rounded-lg border transition-all hover:ring-2"
          >
            <Image
              width={100}
              height={100}
              src={image.url}
              alt="gallery photo"
              className="h-full w-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                variant="destructive"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleDelete(bucketName, image.path)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Galeria zdjęć</CardTitle>
        <CardDescription>Zarządzaj zdjęciami swojego obiektu</CardDescription>
      </CardHeader>
      <CardContent>{content}</CardContent>
    </Card>
  );
}

// TODO: Dialog przy usuwaniu pliku === czy na pewno usunąć.
// TODO: ogarnąć api
// TODO: dodac licznik procentowy pojemności
// TODO: dodac galerie przeglądania zdjęć
