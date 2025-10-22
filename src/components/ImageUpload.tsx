"use client";

import { useState, useRef, useEffect } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { useImageUpload } from "@/hooks/useImageUpload";

interface ImageUploadProps {
  onImageChange: (imageUrl: string | null) => void;
  existingImage?: string;
  userId: string;
}

export function ImageUpload({
  onImageChange,
  existingImage,
  userId,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(existingImage || null);
  const [isDeleting, setIsDeleting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadImage, deleteImage, uploading, error, clearError } =
    useImageUpload();

  // Update preview when existingImage changes
  useEffect(() => {
    setPreview(existingImage || null);
  }, [existingImage]);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Clear any previous errors
    clearError();

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);

    try {
      // Upload to Supabase
      const imageUrl = await uploadImage(file, userId);
      onImageChange(imageUrl);
    } catch (err) {
      // Reset preview on error
      setPreview(null);
      onImageChange(null);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = async () => {
    if (!preview) return;

    setIsDeleting(true);
    try {
      // Only delete from storage if it's a URL (not a data URL preview)
      if (preview.startsWith("http")) {
        await deleteImage(preview);
      }
      setPreview(null);
      onImageChange(null);
      clearError();
    } catch (err) {
      // console.error removed
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUploadAreaClick = () => {
    if (!uploading && !isDeleting) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="space-y-4">
      {/* Preview */}
      {preview && (
        <div className="relative inline-block">
          <img
            src={preview}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg border"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            disabled={isDeleting}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <X className="w-4 h-4" />
            )}
          </button>
        </div>
      )}

      {/* Upload Area */}
      {!preview && (
        <div
          className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors ${
            uploading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleUploadAreaClick}
        >
          {uploading ? (
            <Loader2 className="w-8 h-8 text-gray-400 mx-auto mb-2 animate-spin" />
          ) : (
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          )}
          <p className="text-sm text-gray-600">
            {uploading ? "Uploading..." : "Click to upload product image"}
          </p>
          <p className="text-xs text-gray-500 mt-1">PNG, JPG, JPEG up to 5MB</p>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={uploading || isDeleting}
      />

      {/* Error Message */}
      {error && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-red-600">{error}</p>
          <button
            onClick={clearError}
            className="text-sm text-red-600 hover:text-red-800"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
