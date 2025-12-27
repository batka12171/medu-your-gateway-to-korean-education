import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import { format } from "date-fns";

export default function EventCard({ event, isAttending, onRSVP, onCancel }) {
  const eventDate = new Date(event.date);
  const spotsLeft = event.max_attendees ? event.max_attendees - (event.attendees?.length || 0) : null;

  return (
    <div className="bg-white rounded-xl border border-slate-100 p-6 hover:shadow-lg transition-all">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#EB9441] to-[#d88537] flex flex-col items-center justify-center text-white flex-shrink-0">
          <div className="text-2xl font-bold">{format(eventDate, 'd')}</div>
          <div className="text-xs uppercase">{format(eventDate, 'MMM')}</div>
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-lg text-black">{event.title}</h3>
            <Badge className="bg-[#4A90C5]/10 text-[#4A90C5]">
              {event.event_type?.replace('_', ' ')}
            </Badge>
          </div>
          <p className="text-sm text-slate-600 mb-3">{event.description}</p>
          <div className="flex flex-wrap gap-3 text-sm text-slate-600 mb-4">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {format(eventDate, 'h:mm a')}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {event.location}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {event.attendees?.length || 0} attending
            </span>
          </div>
          {spotsLeft !== null && spotsLeft <= 5 && spotsLeft > 0 && (
            <p className="text-xs text-orange-600 mb-3">Only {spotsLeft} spots left!</p>
          )}
          {isAttending ? (
            <Button
              onClick={onCancel}
              variant="outline"
              size="sm"
              className="border-slate-200"
            >
              Cancel RSVP
            </Button>
          ) : (
            <Button
              onClick={onRSVP}
              size="sm"
              className="bg-[#EB9441] hover:bg-[#d88537]"
              disabled={spotsLeft === 0}
            >
              {spotsLeft === 0 ? 'Event Full' : 'RSVP'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}