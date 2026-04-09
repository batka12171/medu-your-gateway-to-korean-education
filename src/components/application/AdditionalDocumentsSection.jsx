import React from "react";
import { Input } from "@/components/ui/input";

export default function AdditionalDocumentsSection() {
  return (
    <>
      <div className="mb-8">
        <p className="text-sm text-slate-700 mb-4 leading-relaxed">
          Please provide links to any additional documents you wish to submit.
        </p>
        <label className="block text-sm font-bold text-slate-700 mb-2">
          General Documents URL
        </label>
        <Input placeholder="e.g., Google Drive link, personal website" className="w-full" />
      </div>
      <div className="mb-8">
        <label className="block text-sm font-bold text-slate-700 mb-2">
          University-Specific Documents URL (e.g., required study plans)
        </label>
        <Input placeholder="e.g., specific essays, portfolios for a particular university" className="w-full" />
      </div>
      <div className="mb-8">
        <label className="block text-sm font-bold text-slate-700 mb-2">
          Portfolio URL (Required for Art/Design Majors)
        </label>
        <Input placeholder="e.g., Behance, ArtStation, personal portfolio site" className="w-full" />
      </div>
    </>
  );
}