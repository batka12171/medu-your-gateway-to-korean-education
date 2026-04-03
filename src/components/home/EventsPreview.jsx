import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";

export default function EventsPreview() {
  const { data: events = [] } = useQuery({
    queryKey: ['home_events'],
    queryFn: () => base44.entities.Event.list('-date', 3),
    initialData: [],
  });

  const staticEvents = [
    {
      title: "Seoul National University Virtual Info Session",
      event_type: "info_session",
      date: "2024-11-15T10:00:00Z",
      location: "Online (Zoom)",
    },
    {
      title: "International Students Meetup in Hongdae",
      event_type: "meetup",
      date: "2024-11-20T18:00:00Z",
      location: "Hongdae, Seoul",
    },
    {
      title: "Visa Application Workshop",
      event_type: "workshop",
      date: "2024-12-05T14:00:00Z",
      location: "Gangnam Study Center",
    }
  ];

  const displayEvents = events.length > 0 ? events : staticEvents;

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 text-[#00C9A7] font-medium mb-4">
              <Calendar className="w-5 h-5" />
              Upcoming Events
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Join our exclusive
              <br />
              <span className="text-[#00C9A7]">community events</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              From university info sessions to casual meetups, discover events designed to help you navigate your journey to Korea.
            </p>

            <Link to={createPageUrl("Events")}>
              <Button size="lg" className="bg-[#00C9A7] hover:bg-[#005F56] text-white">
                View All Events <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {displayEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-slate-100 p-5 hover:shadow-lg hover:border-[#00C9A7]/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 uppercase text-[10px] tracking-wider">
                        {event.event_type.replace('_', ' ')}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-3">{event.title}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-slate-500">
                      <span className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}