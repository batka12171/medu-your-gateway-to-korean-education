import React from "react";

export default function HowItWorksSection() {
  const steps = [
    { num: "01", title: "Create Profile", desc: "Sign up and tell us about your goals, interests, and academic background." },
    { num: "02", title: "Discover & Connect", desc: "Find the right university, browse upcoming events, and match with a mentor." },
    { num: "03", title: "Apply & Settle", desc: "Submit your applications securely, pay fees directly, and prepare for your move." }
  ];

  return (
    <section className="py-24 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="text-emerald-600 font-semibold tracking-wide uppercase text-sm mb-3">How It Works</div>
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-16">Your seamless journey to Korea</h2>
        
        <div className="grid md:grid-cols-3 gap-12 relative">
          <div className="hidden md:block absolute top-12 left-[16.66%] right-[16.66%] h-0.5 bg-slate-100 -z-10" />
          {steps.map((s, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 bg-white border-4 border-slate-50 shadow-xl shadow-emerald-900/5 rounded-full flex items-center justify-center text-2xl font-black text-emerald-600 mb-6">
                {s.num}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h3>
              <p className="text-slate-600 max-w-xs">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}