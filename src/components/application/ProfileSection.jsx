import React from "react";
import { Input } from "@/components/ui/input";

export default function ProfileSection() {
  return (
    <>
      <div className="mb-8">
        <label className="block text-sm font-bold text-slate-700 mb-2">
          Program Type<span className="text-red-500">*</span>
        </label>
        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <option value="">Select program type...</option>
          <option value="language">Language Program</option>
          <option value="bachelor">Bachelor's Degree</option>
          <option value="master">Master's Degree</option>
          <option value="phd">Ph.D. Program</option>
        </select>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-bold text-slate-700 mb-2">
          Preferred Admission Season<span className="text-red-500">*</span>
        </label>
        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <option value="">Select season...</option>
          <option value="spring">Spring (March Intake)</option>
          <option value="fall">Fall (September Intake)</option>
        </select>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-bold text-slate-700 mb-2">
          Legal first/given name<span className="text-red-500">*</span>
        </label>
        <Input defaultValue="Bat" className="w-full" />
      </div>

      <div className="mb-8">
        <label className="block text-sm font-bold text-slate-700 mb-3">
          Would you like to share a different first name that people call you?
        </label>
        <div className="space-y-3 mb-5">
          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
            <input type="radio" name="diffName" className="w-4 h-4 border-slate-300 text-[#ff7300]" />
            Yes
          </label>
          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
            <input type="radio" name="diffName" defaultChecked className="w-4 h-4 border-slate-300 text-[#ff7300]" />
            No
          </label>
        </div>
        <button className="px-4 py-1.5 border border-slate-300 rounded-full text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
          Clear answer
        </button>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-bold text-slate-700 mb-2">
          Middle name
        </label>
        <Input className="w-full" />
      </div>

      <div className="mb-8">
        <label className="block text-sm font-bold text-slate-700 mb-2">
          Last/family/surname<span className="text-red-500">*</span>
        </label>
        <Input defaultValue="Bold" className="w-full" />
      </div>
      
      <div className="mb-8">
        <label className="block text-sm font-bold text-slate-700 mb-2">
          Suffix
        </label>
        <Input className="w-full" />
      </div>
    </>
  );
}