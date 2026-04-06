import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { MoreVertical, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Events() {
  const { data: dbEvents = [] } = useQuery({
    queryKey: ['events'],
    queryFn: () => base44.entities.Event.list('-date'),
    initialData: [],
  });

  const staticEvents = [
    {
      id: 1,
      title: "Spectrosynthesis Seoul",
      category: "Үзэсгэлэн & Галерей",
      date: "2026-03-20T10:00:00Z",
      price: "~ 10,000₩",
      image_url: "https://images.unsplash.com/photo-1547822297-ea21be3e4f3a?w=400&q=80",
    },
    {
      id: 2,
      title: "Sak-da: The Poetics of Decomposition",
      category: "Үзэсгэлэн & Галерей",
      date: "2026-01-30T10:00:00Z",
      price: "₩2000",
      image_url: "https://images.unsplash.com/photo-1518998053901-5314c3e110b5?w=400&q=80",
    },
    {
      id: 3,
      title: "Seoul Art Week Showcase",
      category: "Үзэсгэлэн & Галерей",
      date: "2026-04-05T10:00:00Z",
      price: "Free",
      image_url: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=400&q=80",
    },
    {
      id: 4,
      title: "불란서 금고 - 북벽에 오를 자 누구더냐 (Театрын жүжиг)",
      category: "Солонгос эвент & тоглолт",
      date: "2026-03-07T19:00:00Z",
      price: "₩55,000 ~ 77,000",
      image_url: "https://images.unsplash.com/photo-1507676184212-d0c30a377bb5?w=400&q=80",
    },
    {
      id: 5,
      title: "World DJ Festival (WDJ FEST 2026)",
      category: "Солонгос эвент & тоглолт",
      date: "2026-06-13T14:00:00Z",
      price: "₩169,000 ~",
      image_url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80",
    },
    {
      id: 6,
      title: "KIM SEONHO FANMEETING <LOVE FACTORY>",
      category: "Fan Meeting",
      date: "2026-04-11T18:00:00Z",
      price: "₩99,000",
      image_url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80",
    }
  ];

  const displayEvents = dbEvents.length > 0 ? dbEvents : staticEvents;

  const categories = ["Үзэсгэлэн & Галерей", "Солонгос эвент & тоглолт", "Fan Meeting"];

  const eventsByCategory = categories.reduce((acc, cat) => {
    acc[cat] = displayEvents.filter(e => e.category === cat || (!e.category && cat === "Солонгос эвент & тоглолт"));
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-white pb-20 max-w-md mx-auto relative shadow-sm border-x border-slate-100">
      {/* Header */}
      <div className="bg-white px-4 py-5 flex items-center justify-between sticky top-0 z-20">
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          Сонирхолтой соёлын эвент
        </h1>
        <Button variant="ghost" size="icon" className="-mr-2">
          <MoreVertical className="w-5 h-5 text-slate-600" />
        </Button>
      </div>

      <div className="px-4 py-2 space-y-8">
        {categories.map((category) => {
          const catEvents = eventsByCategory[category];
          if (!catEvents || catEvents.length === 0) return null;

          return (
            <motion.div 
              key={category} 
              className="space-y-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-lg font-bold text-slate-900">{category}</h2>
              
              <div className="flex overflow-x-auto hide-scrollbar gap-4 pb-4 -mx-4 px-4 snap-x">
                {catEvents.map((event) => (
                  <div 
                    key={event.id}
                    className="min-w-[240px] w-[240px] bg-white rounded-[20px] shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden flex flex-col snap-start shrink-0"
                  >
                    <div className="h-[140px] w-full bg-slate-100 relative">
                      <img 
                        src={event.image_url} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-bold text-slate-900 leading-snug line-clamp-2 mb-1.5 text-[15px]">
                        {event.title}
                      </h3>
                      <p className="text-[13px] text-slate-500 mb-3">
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                      <div className="mt-auto flex items-center text-[13px] font-medium text-slate-600">
                        <Ticket className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                        {event.price || 'Free'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}