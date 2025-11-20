"use server";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import Image from "next/image";
import { ImageRemoveAlert } from "@/components";
import { getAllImagesFromBucket } from "@/lib/data";
import toast from "react-hot-toast";
import { cacheTag } from "next/cache";
import ImageViewer from "./ImageViewer";
import { Suspense } from "react";
import { Skeleton } from "./ui/skeleton";

type Prop = { bucketName: string };

// TODO: dodac galerie przeglądania zdjęć
// TODO: dodac licznik procentowy pojemności

const PhotoGallery = async ({ bucketName }: Prop) => {
  "use cache";
  const { images, error } = await getAllImagesFromBucket(bucketName);

  cacheTag(`images-${bucketName}`);

  if (error) {
    toast.error(error);
  }

  return (
    <>
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
    </>
  );
};

export default PhotoGallery;

// <div className="grid max-h-[350px] grid-cols-2 gap-4 overflow-y-auto sm:grid-cols-3">
//   {images.map((image) => (
//     <ImageItem
//       key={image.id}
//       image={image}
//       bucketName={bucketName}
//     />
//   ))}
// </div>

// NOTE: single image
// const ImageItem = ({ image, bucketName, onClick }: WrapperProp) => {
//   return (
//     <div
//       onClick={onClick}
//       className="group bg-muted hover:ring-primary relative aspect-square overflow-hidden rounded-lg border transition-all hover:ring-2"
//     >
//       <Image
//         width={100}
//         height={100}
//         src={image.src}
//         alt="gallery photo"
//         className="h-full w-full object-cover"
//         loading="eager"
//       />
//       <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
//         <ImageRemoveAlert imagePath={image.path} bucketName={bucketName} />
//       </div>
//     </div>
//   );
// };
// NOTE: skeleton for six images
const ImagesSkeleton = () => {
  const array = Array.from({ length: 6 }).map((_, index) => index + 1);

  return (
    <div className="grid aspect-square grid-cols-2 gap-4 sm:grid-cols-3">
      {array.map((el) => (
        <Skeleton key={el} className="h-45 max-w-45" />
      ))}
    </div>
  );
};
