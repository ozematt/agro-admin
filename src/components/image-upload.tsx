"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import Image from "next/image";

export function ImageUpload() {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearPreview = () => {
    setPreview(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prześlij zdjęcia</CardTitle>
        <CardDescription>
          Dodaj nowe zdjęcia do galerii swojego obiektu
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {preview ? (
            <div className="bg-muted relative aspect-video overflow-hidden rounded-lg border">
              <Image
                width={200}
                height={200}
                src={preview || "/placeholder.svg"}
                alt="Preview"
                className="h-full w-full object-cover"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={clearPreview}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <label className="border-border hover:border-primary hover:bg-secondary/50 flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors">
              <div className="flex flex-col items-center gap-2 p-6 text-center">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
                  <Upload className="text-primary h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium">Kliknij, aby przesłać</p>
                  <p className="text-muted-foreground text-sm">
                    lub przeciągnij i upuść
                  </p>
                </div>
                <p className="text-muted-foreground text-xs">
                  PNG, JPG, WebP do 5MB
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          )}

          <div className="flex gap-2">
            <Button className="flex-1" disabled={!preview}>
              Prześlij zdjęcie
            </Button>
            {preview && (
              <Button variant="outline" onClick={clearPreview}>
                Anuluj
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
