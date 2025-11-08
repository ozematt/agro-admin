"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ImageRemoveAlert } from "@/components";

type GalleryImage = {
  name: string;
  url: string;
  path: string;
  size: number;
  createdAt: string;
  id: string;
};
type Prop = { images: GalleryImage[]; error?: string; bucketName: string };

// TODO: dodac licznik procentowy pojemności
// TODO: dodac galerie przeglądania zdjęć

const PhotoGallery = ({ images, error, bucketName }: Prop) => {
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
              <ImageRemoveAlert
                imagePath={image.path}
                bucketName={bucketName}
              />
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
};

export default PhotoGallery;
