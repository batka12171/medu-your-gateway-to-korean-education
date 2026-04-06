import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { MapPin, Calendar as CalendarIcon, ArrowRight, Ticket } from "lucide-react";

export default function EventsSection() {
  const events = [
    { title: "Seoul Tech Meetup", date: "Oct 15", loc: "Gangnam", type: "Networking", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&q=80" },
    { title: "Yonsei Campus Tour", date: "Nov 02", loc: "Sinchon", type: "Tour", img: "https://images.unsplash.com/photo-1523580494112-071d324728d3?w=500&q=80" },
    { title: "Language Exchange", date: "Nov 10", loc: "Hongdae", type: "Social", img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=500&q=80" },
  ];

  return (
    <section className="py-24 bg-white relative z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="text-emerald-600 font-semibold tracking-wide uppercase text-sm mb-3">Community Events</div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              Experience Korea before you even graduate.
            </h2>
            <p className="text-lg text-slate-600">
              Book tickets to exclusive networking events, campus tours, and social gatherings directly on our platform.
            </p>
          </div>
          <Link to={createPageUrl("Events")} className="shrink-0">
            <button className="px-6 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-full font-medium transition-all flex items-center gap-2 border border-emerald-200">
              View All Events <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {events.map((ev, i) => (
            <div key={i} className="group bg-white rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/40 overflow-hidden hover:-translate-y-2 transition-all duration-300 flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img src={ev.img} alt={ev.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-800">
                  {ev.type}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex-1">{ev.title}</h3>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    <CalendarIcon className="w-4 h-4 text-emerald-500" /> {ev.date}
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 text-sm">
                    <MapPin className="w-4 h-4 text-emerald-500" /> {ev.loc}, Seoul
                  </div>
                </div>
                <button className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2 mt-auto">
                  <Ticket className="w-4 h-4" /> Book Ticket
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}