"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ReportIssueButton from "@/components/ReportIssueButton";
import { X } from "lucide-react";

export default function AddIssueDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="w-full sm:w-auto"
        size="lg"
      >
        Add Issue
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-2xl rounded-lg bg-white dark:bg-zinc-950 shadow-2xl border border-zinc-200 dark:border-zinc-800 p-6 text-center">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 rounded-full p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="pb-4 space-y-2">
              <h2 className="text-xl font-semibold">Create a new issue</h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Capture a photo, add details, and submit your report.
              </p>
            </div>
            <div className="flex justify-center">
              <ReportIssueButton ctaText="Start Capture" skipNavigate />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
