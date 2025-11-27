"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import ImageRemoveAlert from "./ImageRemoveAlert";


type GalleryImage = {
  title: string;
  src: string;
  path: string;
  size: number;
  createdAt: string;
  id: string;
};

type Props = {
  bucketName: string;
  images: GalleryImage[];
};

// TODO: poprawic położenie przycisku do usuwania zdjęcia

const ImageViewer = ({ images, bucketName }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);

  const currentImage = images[currentIndex];
  const hasNext = currentIndex < images.length - 1;
  const hasPrev = currentIndex > 0;

  const goToNext =useCallback( () => {
    if (hasNext) {
      setCurrentIndex((prev) => prev + 1);
      setImageError(false);
    }


  },[hasNext]);

  const goToPrev = useCallback(() => {
    if (hasPrev) {
      setCurrentIndex((prev) => prev - 1);
      setImageError(false);
    }
  },[hasPrev]);
  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, goToNext, goToPrev]);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setImageError(false);
    setIsOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => openModal(index)}
            className="group bg-muted relative aspect-square cursor-pointer overflow-hidden rounded-lg transition-all"
            aria-label={`Open ${image.title || `image ${index + 1}`}`}
          >
            <Image
              src={image.src}
              alt={image.title || `Gallery image ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </button>
        ))}
      </div>
      {/* Modal Dialog */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="fixed inset-0 z-10 flex items-center justify-center bg-black/60"
        >
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-4 right-4 z-50 rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-white focus-visible:ring-white"
            aria-label="Close image viewer"
          >
            <X className="h-5 w-5" />
          </Button>
          <div
            className="relative h-full max-h-[80%] w-full max-w-[80%] overflow-hidden rounded-2xl bg-black"
            aria-describedby="image-viewer-description"
          >
            <span id="image-viewer-description" className="sr-only">
              Przeglądarka obrazów. Użyj klawiszy strzałek lub przesuń palcem,
              aby nawigować. Naciśnij Escape lub kliknij przycisk X, aby
              zamknąć.
            </span>
            {imageError ? (
              <div className="flex flex-col items-center gap-4 text-white">
                <p className="text-lg font-medium">
                  Nie udało się załadować obrazu
                </p>
                <Button
                  variant="secondary"
                  onClick={() => setImageError(false)}
                >
                  Retry
                </Button>
              </div>
            ) : (
              <div className="">
                <Image
                  src={currentImage.src || "/placeholder.svg"}
                  alt={
                    currentImage.title || `Gallery image ${currentIndex + 1}`
                  }
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
              </div>
            )}
          </div>
          {/* Previous Button */}
          {hasPrev && (
            <Button
              size="icon"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                goToPrev();
              }}
              className="absolute top-1/2 left-4 z-50 h-12 w-12 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-white focus-visible:ring-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
          )}
          {/* Next Button */}
          {hasNext && (
            <Button
              size="icon"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              className="absolute top-1/2 right-4 z-50 h-12 w-12 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/70 hover:text-white focus-visible:ring-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-8 w-8" />
            </Button>
          )}

          {/* Action Buttons */}
          <div className="absolute bottom-22 left-1/2 z-50 -translate-x-1/2">
            <div onClick={(e) => e.stopPropagation()}>
              <ImageRemoveAlert
                imagePath={currentImage.path}
                bucketName={bucketName}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageViewer;

// export const ImageViewerWrapper = ({ images, bucketName }) => {
//   return (
//     <Suspense fallback={<ImagesSkeleton />}>
//       <ImageViewer images={images} bucketName={bucketName} />
//     </Suspense>
//   );
// };

// // NOTE: skeleton for six images
// const ImagesSkeleton = () => {
//   const array = Array.from({ length: 6 }).map((_, index) => index + 1);

//   return (
//     <div className="grid aspect-square grid-cols-2 gap-4 sm:grid-cols-3">
//       {array.map((el) => (
//         <Skeleton key={el} className="h-45 max-w-45" />
//       ))}
//     </div>
//   );
// };
