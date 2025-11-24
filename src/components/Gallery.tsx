"use server";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllImagesFromBucket } from "@/lib/data";
import toast from "react-hot-toast";
import { cacheTag } from "next/cache";
import ImageViewer from "./ImageViewer";

type Prop = { bucketName: string };

// TODO: dodac licznik procentowy pojemności

const Gallery = async ({ bucketName }: Prop) => {
  "use cache";
  const { images, error } = await getAllImagesFromBucket(bucketName);

  cacheTag(`images-${bucketName}`);

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
          <ImageViewer images={images} bucketName={bucketName} />
        )}
      </CardContent>
    </Card>
  );
};

export default Gallery;
