/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

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
      // DEBUG: Log all inputs
      console.log("🔍 [DEBUG] uploadImage called with:");
      console.log("🔍 [DEBUG] - User ID:", userId);
      console.log("🔍 [DEBUG] - File name:", file.name);
      console.log("🔍 [DEBUG] - File type:", file.type);
      console.log("🔍 [DEBUG] - File size:", file.size);

      // TEMPORARY FIX: If userId is "products", use a different identifier
      let actualUserId = userId;
      if (userId === "products") {
        // console.warn removed
        // Use session storage to maintain consistency for this browser session
        let sessionUserId = sessionStorage.getItem("temp_user_id");
        if (!sessionUserId) {
          sessionUserId = `temp-${crypto.randomUUID().slice(0, 8)}`;
          sessionStorage.setItem("temp_user_id", sessionUserId);
        }
        actualUserId = sessionUserId;
        console.log("🔄 Using temporary user ID:", actualUserId);
      }

      // Validate file type and size
      if (!file.type.startsWith("image/")) {
        throw new Error("Please upload an image file (JPEG, PNG, etc.)");
      }
      if (file.size > 5 * 1024 * 1024) {
        throw new Error("File size must be less than 5MB");
      }

      const fileExt = file.name.split(".").pop() || "jpg";
      const fileName = `${actualUserId}/${crypto.randomUUID()}.${fileExt}`;

      console.log("🔍 [DEBUG] - Final upload path:", fileName);
      console.log("🔍 [DEBUG] - Bucket: products");

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from("products")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        // console.error removed
        throw new Error(`Upload failed: ${error.message}`);
      }

      console.log("✅ [DEBUG] Upload successful:", data);

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from("products")
        .getPublicUrl(data.path);

      console.log("🔗 [DEBUG] Public URL:", publicUrlData.publicUrl);
      return publicUrlData.publicUrl;
    } catch (err: unknown) {
      // console.error removed
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
      console.log("🔍 [DEBUG] deleteImage called with:", imageUrl);

      // Extract path from URL
      const urlParts = imageUrl.split("/");
      const path = urlParts.slice(-2).join("/"); // gets "userId/filename.jpg"

      console.log("🔍 [DEBUG] Extracted path to delete:", path);

      const { error } = await supabase.storage.from("products").remove([path]);

      if (error) {
        // console.error removed
        throw new Error(`Delete failed: ${error.message}`);
      }

      console.log("✅ [DEBUG] Delete successful");
    } catch (err: any) {
      // console.error removed
      setError(err.message);
      throw err;
    }
  };

  // Test function to check bucket access
  const testBucketAccess = async (): Promise<boolean> => {
    try {
      console.log("🧪 [DEBUG] Testing bucket access...");

      const { data: buckets, error: bucketsError } =
        await supabase.storage.listBuckets();

      if (bucketsError) {
        // console.error removed
        return false;
      }

      console.log("📦 [DEBUG] Available buckets:", buckets);

      const productsBucket = buckets.find(
        (bucket) => bucket.name === "products"
      );
      if (!productsBucket) {
        // console.error removed
        return false;
      }

      console.log('✅ [DEBUG] "products" bucket found:', productsBucket);
      return true;
    } catch (error) {
      // console.error removed
      return false;
    }
  };

  return {
    uploadImage,
    deleteImage,
    testBucketAccess,
    uploading,
    error,
    clearError: () => setError(null),
  };
}
