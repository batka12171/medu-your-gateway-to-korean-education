import React from "react";
import { Input } from "@/components/ui/input";

export default function EducationSection() {
  return (
    <>
      <div className="mb-8">
        <label className="block text-sm font-bold text-slate-700 mb-2">
          Intended Major / Area of Study<span className="text-red-500">*</span>
        </label>
        <Input placeholder="e.g. Business Administration, Computer Science, Fine Arts" className="w-full" />
        <p className="text-xs text-slate-500 mt-2">If you are applying for a language program, you can leave this blank or specify your future major.</p>
      </div>
      <div className="mb-8">
        <label className="block text-sm font-bold text-slate-700 mb-2">
          Current or most recent secondary/high school
        </label>
        <Input placeholder="Find school..." className="w-full" />
        <p className="text-xs text-slate-500 mt-2">Search by school name, city, state, or CEEB code</p>
      </div>
      <div className="mb-8">
        <label className="block text-sm font-bold text-slate-700 mb-2">
          Date of entry
        </label>
        <Input type="month" className="w-full" />
      </div>
      <div className="mb-8">
        <label className="block text-sm font-bold text-slate-700 mb-2">
          Is this a boarding school?
        </label>
        <div className="space-y-3 mb-5">
          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
            <input type="radio" name="isBoarding" className="w-4 h-4 border-slate-300 text-[#ff7300]" />
            Yes
          </label>
          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
            <input type="radio" name="isBoarding" defaultChecked className="w-4 h-4 border-slate-300 text-[#ff7300]" />
            No
          </label>
        </div>
      </div>
      <div className="mb-8">
        <label className="block text-sm font-bold text-slate-700 mb-2">
          Did or will you graduate from this school?
        </label>
        <div className="space-y-3 mb-5">
          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
            <input type="radio" name="willGraduate" defaultChecked className="w-4 h-4 border-slate-300 text-[#ff7300]" />
            Yes
          </label>
          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
            <input type="radio" name="willGraduate" className="w-4 h-4 border-slate-300 text-[#ff7300]" />
            No
          </label>
        </div>
      </div>
    </>
  );
}