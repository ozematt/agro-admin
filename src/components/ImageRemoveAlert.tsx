"use client";

import { deleteImageFromBucket } from "@/app/panel/[slug]/actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";

type Prop = {
  imagePath: string;
  bucketName: string;
};

const ImageRemoveAlert = ({ imagePath, bucketName }: Prop) => {
  const handleImageDelete = async () => {
    const formData = new FormData();
    formData.append("bucket", bucketName);
    formData.append("path", imagePath);

    const result = await deleteImageFromBucket(formData);

    if (result.success) {
      toast.success("Plik został usunięty pomyślnie.");
    } else {
      toast.error(
        result.message || "Wystąpił nieznany błąd podczas usuwania pliku.",
      );
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="icon" className="h-8 w-8">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Czy na pewno chcesz usunąć to zdjęcie?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Ten plik graficzny zostanie trwale usunięty z Twojej galerii. Tej
            operacji nie będzie można cofnąć. Upewnij się, że na pewno chcesz
            kontynuować.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Anuluj</AlertDialogCancel>
          <AlertDialogAction onClick={handleImageDelete}>
            Tak, usuń
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ImageRemoveAlert;
