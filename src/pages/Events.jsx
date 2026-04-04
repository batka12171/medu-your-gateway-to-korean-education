import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Events() {
  const { data: dbEvents = [] } = useQuery({
    queryKey: ['events'],
    queryFn: () => base44.entities.Event.list('-date'),
    initialData: [],
  });

  const staticEvents = [
    {
      id: 1,
      title: "Seoul National University Virtual Info Session",
      event_type: "info_session",
      date: "2024-11-15T10:00:00Z",
      location: "Online (Zoom)",
      description: "Join us for an official virtual info session covering the 2025 Spring intake for international students.",
      organizer_name: "SNU Admissions",
      attendees: ["1", "2"],
      max_attendees: 100
    },
    {
      id: 2,
      title: "International Students Meetup in Hongdae",
      event_type: "meetup",
      date: "2024-11-20T18:00:00Z",
      location: "Hongdae, Seoul",
      description: "Casual meetup for prospective and current international students. Let's make new friends!",
      organizer_name: "MEDU Community",
      attendees: ["1", "2", "3"],
      max_attendees: 30
    },
    {
      id: 3,
      title: "Visa Application Workshop",
      event_type: "workshop",
      date: "2024-12-05T14:00:00Z",
      location: "Gangnam Study Center",
      description: "A complete walkthrough of the D-2 student visa application process. Required documents, tips, and Q&A.",
      organizer_name: "Visa Experts Korea",
      attendees: [],
      max_attendees: 50
    }
  ];

  const displayEvents = dbEvents.length > 0 ? dbEvents : staticEvents;

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            Upcoming Events
          </h1>
          <p className="text-slate-600 max-w-2xl">
            Join info sessions, workshops, and student meetups to help your Korean university journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayEvents.map((event, index) => (
            <motion.div
              key={event.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-lg transition-all flex flex-col"
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="secondary" className="bg-[#ff7300]/10 text-[#ff7300] uppercase text-xs">
                    {event.event_type.replace('_', ' ')}
                  </Badge>
                  <div className="flex flex-col items-end text-[#ff7300]">
                    <span className="text-2xl font-bold leading-none">{new Date(event.date).getDate()}</span>
                    <span className="text-xs uppercase font-medium">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2">
                  {event.title}
                </h3>
                
                <p className="text-slate-500 text-sm mb-6 line-clamp-3 flex-1">
                  {event.description}
                </p>

                <div className="space-y-2 text-sm text-slate-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    {new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  {event.max_attendees && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-400" />
                      {event.attendees?.length || 0} / {event.max_attendees} attendees
                    </div>
                  )}
                </div>

                <Button className="w-full bg-[#ff7300] hover:bg-[#cc5c00] text-white">
                  RSVP Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}