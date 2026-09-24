"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "sonner";
import { X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  endpoint: keyof OurFileRouter;
  value: string;
  onChange: (url?: string) => void;
}

export const FileUpload = ({ endpoint, value, onChange }: FileUploadProps) => {
  if (value) {
    return (
      <div className="relative h-40 w-full">
        <Image
          fill
          src={value}
          alt="Upload"
          className="object-cover rounded-md"
        />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-2 right-2 shadow-sm hover:bg-rose-600 transition-colors"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].ufsUrl);
      }}
      onUploadError={(error: Error) => {
        toast.error(`Error: ${error.message}`);
      }}
      className="ut-label:text-indigo-600 ut-button:bg-indigo-600 ut-button:ut-readying:bg-indigo-600/50 border-indigo-200 bg-slate-50"
    />
  );
};
