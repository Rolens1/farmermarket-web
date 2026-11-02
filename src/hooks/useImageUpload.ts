/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { createClient } from "@insforge/sdk";

const rawWebUrl =
  process.env.NEXT_PUBLIC_INSFORGE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL;
const baseUrl =
  rawWebUrl && !rawWebUrl.includes("supabase.co")
    ? rawWebUrl
    : "https://pprn26i7.us-east.insforge.app";

const rawWebKey =
  process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const anonKey =
  rawWebKey && !rawWebKey.startsWith("eyJ")
    ? rawWebKey
    : "anon_d05d2e2d6987608e7786bd21c23125abd753514256ca0b2d4577447612f4e7db";

const insforge = createClient({
  baseUrl,
  anonKey,
});

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File, userId: string): Promise<string> => {
    setUploading(true);
    setError(null);

    try {
      if (!file.type.startsWith("image/")) {
        throw new Error("Please upload an image file (JPEG, PNG, etc.)");
      }
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("File size must be less than 5MB");
      }

      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;
      if (token && (insforge as any).tokenManager) {
        (insforge as any).tokenManager.setAccessToken(token);
      }

      const fileExt = file.name.split(".").pop() || "jpg";
      const fileName = `${userId}/${crypto.randomUUID()}.${fileExt}`;

      const { data, error } = await insforge.storage
        .from("products")
        .upload(fileName, file);

      if (error) {
        throw new Error(`Upload failed: ${error.message}`);
      }

      return data?.url || "";
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
      const urlParts = imageUrl.split("/");
      const path = urlParts.slice(-2).join("/");

      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;
      if (token && (insforge as any).tokenManager) {
        (insforge as any).tokenManager.setAccessToken(token);
      }

      const { error } = await insforge.storage.from("products").remove(path);
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
