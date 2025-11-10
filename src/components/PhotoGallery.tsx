"use server";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ImageRemoveAlert } from "@/components";
import { getAllImagesFromBucket } from "@/app/panel/[name]/actions";
import toast from "react-hot-toast";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";

type GalleryImage = {
  name: string;
  url: string;
  path: string;
  size: number;
  createdAt: string;
  id: string;
};
type Prop = { bucketName: string };
type WrapperProp = { bucketName: string; image: GalleryImage };

// TODO: dodac licznik procentowy pojemności
// TODO: dodac galerie przeglądania zdjęć

const PhotoGallery = async ({ bucketName }: Prop) => {
  const { images, error } = await getAllImagesFromBucket(bucketName);

  if (error) {
    toast.error(error);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Galeria zdjęć</CardTitle>
        <CardDescription>Zarządzaj zdjęciami swojego obiektu</CardDescription>
      </CardHeader>
      <CardContent>
        {images.length === 0 ? (
          <span className="text-muted-foreground/50 grid h-50 place-items-center">
            <span> Brak zdjęć w galerii</span>
          </span>
        ) : (
          <Suspense fallback={<ImagesSkeleton />}>
            <div className="grid max-h-[350px] grid-cols-2 gap-4 overflow-y-auto sm:grid-cols-3">
              {images.map((image) => (
                <ImageItem
                  key={image.id}
                  image={image}
                  bucketName={bucketName}
                />
              ))}
            </div>
          </Suspense>
        )}
      </CardContent>
    </Card>
  );
};

export default PhotoGallery;

// NOTE: singe image
const ImageItem = ({ image, bucketName }: WrapperProp) => {
  return (
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
        <ImageRemoveAlert imagePath={image.path} bucketName={bucketName} />
      </div>
    </div>
  );
};

// NOTE: skeleton for six images
const ImagesSkeleton = () => {
  const array = Array.from({ length: 6 }).map((_, index) => index + 1);

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
      {array.map((el) => (
        <Skeleton key={el} className="h-45 max-w-45" />
      ))}
    </div>
  );
};
