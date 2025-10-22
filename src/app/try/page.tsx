"use client";

import { useState } from "react";
import { MyListingDialog } from "@/components/MyListingModal";

export default function TryPage() {
  const [dialogOpen, setDialogOpen] = useState(true);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <MyListingDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        listing={null}
        onSave={() => {}}
      />
      <button
        onClick={() => setDialogOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Simulate New Listing
      </button>
    </div>
  );
}
