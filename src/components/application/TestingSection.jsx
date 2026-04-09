import React from "react";

export default function TestingSection() {
  return (
    <>
      <div className="mb-8">
        <p className="text-sm text-slate-700 mb-4 leading-relaxed">
          In addition to sending official score reports as required by colleges, you have the option to self-report scores or future test dates for any of the following standardized tests: ACT, SAT/SAT Subject Tests, AP, IB, TOEFL, PTE Academic, and IELTS.
        </p>
        <label className="block text-sm font-bold text-slate-700 mb-3">
          Do you wish to self-report scores or future test dates for any of these standardized tests?
        </label>
        <div className="space-y-3 mb-5">
          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
            <input type="radio" name="reportTests" className="w-4 h-4 border-slate-300 text-[#ff7300]" />
            Yes
          </label>
          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
            <input type="radio" name="reportTests" defaultChecked className="w-4 h-4 border-slate-300 text-[#ff7300]" />
            No
          </label>
        </div>
      </div>

      <div className="mb-8 border-t border-slate-200 pt-8">
        <label className="block text-sm font-bold text-slate-700 mb-2">
          International Applicants
        </label>
        <p className="text-sm text-slate-700 mb-4 leading-relaxed">
          Is promotion within your educational system based upon standard leaving examinations given at the end of lower and/or senior secondary school by a state or national leaving examinations board? (Students studying in the US typically answer no to this question.)
        </p>
        <div className="space-y-3 mb-5">
          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
            <input type="radio" name="intlTests" className="w-4 h-4 border-slate-300 text-[#ff7300]" />
            Yes
          </label>
          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
            <input type="radio" name="intlTests" defaultChecked className="w-4 h-4 border-slate-300 text-[#ff7300]" />
            No
          </label>
        </div>
      </div>
    </>
  );
}