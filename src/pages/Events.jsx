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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300 pb-20 lg:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Сонирхолтой соёлын эвент
          </h1>
          <Button variant="ghost" size="icon" className="-mr-2 md:hidden">
            <MoreVertical className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          </Button>
        </div>

        <div className="space-y-10 md:space-y-12">
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
                <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2">{category}</h2>
                
                <div className="flex overflow-x-auto hide-scrollbar gap-4 md:gap-6 pb-6 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x">
                  {catEvents.map((event) => (
                    <div 
                      key={event.id}
                      className="min-w-[280px] w-[280px] md:min-w-[320px] md:w-[320px] bg-white dark:bg-slate-900 rounded-[20px] shadow-sm hover:shadow-md transition-shadow border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col snap-start shrink-0"
                    >
                      <div className="h-[160px] md:h-[180px] w-full bg-slate-100 dark:bg-slate-800 relative">
                        <img 
                          src={event.image_url} 
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 mb-2 text-base">
                          {event.title}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                        <div className="mt-auto flex items-center text-sm font-medium text-slate-600 dark:text-slate-300">
                          <Ticket className="w-4 h-4 mr-2 text-slate-400" />
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
    </div>
  );
}