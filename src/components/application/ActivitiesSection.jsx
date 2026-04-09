import React from "react";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

export default function ActivitiesSection() {
  return (
    <>
      <div className="mb-8">
        <p className="text-sm text-slate-700 mb-4 leading-relaxed">
          Reporting activities can help a college better understand your life outside of the classroom. Your activities may include arts, athletics, clubs, employment, personal commitments, and other pursuits.
        </p>
        <label className="block text-sm font-bold text-slate-700 mb-3">
          Do you have any activities that you wish to report?
        </label>
        <div className="space-y-3 mb-5">
          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
            <input type="radio" name="reportActivities" defaultChecked className="w-4 h-4 border-slate-300 text-[#ff7300]" />
            Yes
          </label>
          <label className="flex items-center gap-3 text-sm text-slate-700 cursor-pointer">
            <input type="radio" name="reportActivities" className="w-4 h-4 border-slate-300 text-[#ff7300]" />
            No
          </label>
        </div>
      </div>

      <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
        <div className="mb-6">
          <label className="block text-sm font-bold text-slate-700 mb-2">Activity type</label>
          <select className="flex h-10 w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
            <option value="">Select type...</option>
            <option value="art">Art</option>
            <option value="athletics">Athletics</option>
            <option value="club">Club/Organization</option>
            <option value="community">Community Service</option>
            <option value="work">Work/Employment</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-bold text-slate-700 mb-2">Position/Leadership description</label>
          <Input placeholder="e.g., President, Captain, Founder" className="w-full bg-white" />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-bold text-slate-700 mb-2">Organization name</label>
          <Input className="w-full bg-white" />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-bold text-slate-700 mb-2">Description</label>
          <textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Please describe this activity, including what you accomplished and any recognition you received, etc."></textarea>
        </div>
      </div>
      
      <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-colors">
        <Plus className="w-4 h-4" />
        Add another activity
      </button>
    </>
  );
}