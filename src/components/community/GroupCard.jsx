import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, UserPlus, CheckCircle } from "lucide-react";

export default function GroupCard({ group, isMember, onJoin, onLeave }) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-6 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-lg text-black mb-2">{group.name}</h3>
          <p className="text-sm text-slate-600 mb-3">{group.description}</p>
          <div className="flex items-center gap-2">
            <Badge className="bg-[#4A90C5]/10 text-[#4A90C5]">
              {group.category}
            </Badge>
            <span className="flex items-center gap-1 text-sm text-slate-500">
              <Users className="w-4 h-4" />
              {group.member_count || 0} members
            </span>
          </div>
        </div>
      </div>
      {isMember ? (
        <Button
          onClick={onLeave}
          variant="outline"
          size="sm"
          className="w-full border-slate-200"
        >
          <CheckCircle className="w-4 h-4 mr-2" />
          Joined
        </Button>
      ) : (
        <Button
          onClick={onJoin}
          size="sm"
          className="w-full bg-[#4A90C5] hover:bg-[#357AB8]"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Join Group
        </Button>
      )}
    </div>
  );
}