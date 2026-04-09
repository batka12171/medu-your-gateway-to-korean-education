import React from "react";

export default function FamilySection() {
  return (
    <>
      <div className="mb-8">
        <label className="block text-sm font-bold text-slate-700 mb-2">
          Parents' marital status
        </label>
        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <option value="">Select status...</option>
          <option value="married">Married</option>
          <option value="separated">Separated</option>
          <option value="divorced">Divorced</option>
          <option value="never_married">Never married</option>
          <option value="widowed">Widowed</option>
        </select>
      </div>
      <div className="mb-8">
        <label className="block text-sm font-bold text-slate-700 mb-2">
          With whom do you make your permanent home?
        </label>
        <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <option value="">Select...</option>
          <option value="both_parents">Both parents</option>
          <option value="parent_1">Parent 1</option>
          <option value="parent_2">Parent 2</option>
          <option value="legal_guardian">Legal Guardian</option>
          <option value="ward_of_court">Ward of the Court/State</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="mb-8">
        <label className="block text-sm font-bold text-slate-700 mb-2">
          Do you have any children?
        </label>
        <div className="space-y-3 mb-5">
          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
            <input type="radio" name="hasChildren" className="w-4 h-4 border-slate-300 text-[#ff7300]" />
            Yes
          </label>
          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
            <input type="radio" name="hasChildren" defaultChecked className="w-4 h-4 border-slate-300 text-[#ff7300]" />
            No
          </label>
        </div>
      </div>
    </>
  );
}