import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { ArrowRight, Search, FileText, CheckCircle } from "lucide-react";

export default function UniversitySection() {
  const features = [
    { icon: Search, title: "Search & Filter", desc: "Find the perfect Korean university for your major and budget." },
    { icon: FileText, title: "Streamlined Applications", desc: "Apply to multiple universities using our unified general form." },
    { icon: CheckCircle, title: "Track Progress", desc: "Monitor your application status through a simple dashboard." }
  ];

  return (
    <section className="py-24 bg-slate-50 border-y border-slate-100 relative z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-orange-600 font-semibold tracking-wide uppercase text-sm mb-3">University Applications</div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Your fastest route to top Korean universities.
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              We've simplified the complex application process. Search programs, fill out one general form, and let us handle the rest. Secure payment and tracking included.
            </p>
            
            <div className="space-y-6 mb-10">
              {features.map((f, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center text-orange-600">
                    <f.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-1">{f.title}</h4>
                    <p className="text-slate-600">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Link to={createPageUrl("Universities")}>
              <button className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-medium transition-all flex items-center gap-2">
                Explore Universities <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
          
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-200 to-amber-100 rounded-[3rem] transform rotate-3 scale-105 opacity-50 z-0 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110" />
            <div className="relative bg-white rounded-[2.5rem] shadow-xl border border-slate-100 p-8 z-10 transition-transform duration-500 group-hover:-translate-y-2">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80" 
                alt="Students" 
                className="w-full h-64 object-cover rounded-2xl mb-6 shadow-inner"
              />
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center mb-4">
                  <div className="font-semibold text-slate-900">Application Dashboard</div>
                  <div className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">Active</div>
                </div>
                <div className="space-y-3">
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 w-3/4 rounded-full" />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Documents Review</span>
                    <span>75% Complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}