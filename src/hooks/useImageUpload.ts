"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Singleton Supabase client (fixes Q5 — new client per render)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File, userId: string): Promise<string> => {
    setUploading(true);
    setError(null);

    try {
      // Validate file type and size
      if (!file.type.startsWith("image/")) {
        throw new Error("Please upload an image file (JPEG, PNG, etc.)");
      }
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("File size must be less than 5MB");
      }

      const fileExt = file.name.split(".").pop() || "jpg";
      const fileName = `${userId}/${crypto.randomUUID()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from("products")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        throw new Error(`Upload failed: ${error.message}`);
      }

      const { data: publicUrlData } = supabase.storage
        .from("products")
        .getPublicUrl(data.path);

      return publicUrlData.publicUrl;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred during upload");
      }
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (imageUrl: string): Promise<void> => {
    try {
      // Extract path from URL: last two segments = "userId/filename.jpg"
      const urlParts = imageUrl.split("/");
      const path = urlParts.slice(-2).join("/");

      const { error } = await supabase.storage.from("products").remove([path]);

      if (error) {
        throw new Error(`Delete failed: ${error.message}`);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      }
      throw err;
    }
  };

  return {
    uploadImage,
    deleteImage,
    uploading,
    error,
    clearError: () => setError(null),
  };
}
