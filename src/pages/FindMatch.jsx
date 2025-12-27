import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, Loader2, MessageSquare, User, Send, X 
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

export default function FindMatch() {
  const [user, setUser] = useState(null);
  const [isMatching, setIsMatching] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");
  const queryClient = useQueryClient();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await base44.auth.me();
        setUser(userData);
      } catch (e) {
        base44.auth.redirectToLogin();
      }
    };
    loadUser();
  }, []);

  const { data: activeMatch } = useQuery({
    queryKey: ['activeMatch', user?.email],
    queryFn: async () => {
      const matches = await base44.entities.UserMatch.filter({ 
        user_email: user.email,
        status: 'active'
      });
      return matches[0] || null;
    },
    enabled: !!user,
    refetchInterval: 3000,
  });

  const { data: messages = [] } = useQuery({
    queryKey: ['chatMessages', activeMatch?.chat_room_id],
    queryFn: () => base44.entities.ChatMessage.filter({ 
      chat_room_id: activeMatch.chat_room_id 
    }, '-created_date'),
    enabled: !!activeMatch,
    refetchInterval: 2000,
  });

  const matchMutation = useMutation({
    mutationFn: async () => {
      const allUsers = await base44.entities.User.list();
      const availableUsers = allUsers.filter(u => u.email !== user.email);
      
      if (availableUsers.length === 0) {
        throw new Error("No users available to match with");
      }

      const randomUser = availableUsers[Math.floor(Math.random() * availableUsers.length)];
      const chatRoomId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      await base44.entities.UserMatch.create({
        user_email: user.email,
        matched_user_email: randomUser.email,
        status: 'active',
        chat_room_id: chatRoomId
      });

      return { matchedUser: randomUser, chatRoomId };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeMatch'] });
      toast.success("Match found! Start chatting now.");
      setIsMatching(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to find a match. Try again.");
      setIsMatching(false);
    }
  });

  const sendMessageMutation = useMutation({
    mutationFn: (message) => base44.entities.ChatMessage.create({
      chat_room_id: activeMatch.chat_room_id,
      sender_email: user.email,
      sender_name: user.full_name || "Anonymous",
      message: message
    }),
    onSuccess: () => {
      setCurrentMessage("");
      queryClient.invalidateQueries({ queryKey: ['chatMessages'] });
    }
  });

  const endMatchMutation = useMutation({
    mutationFn: () => base44.entities.UserMatch.update(activeMatch.id, { status: 'ended' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activeMatch'] });
      toast.success("Chat ended");
    }
  });

  const handleFindMatch = () => {
    if (!user) {
      base44.auth.redirectToLogin();
      return;
    }
    setIsMatching(true);
    matchMutation.mutate();
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (currentMessage.trim()) {
      sendMessageMutation.mutate(currentMessage);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#4A90C5]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 text-[#4A90C5] font-medium mb-4">
              <Sparkles className="w-5 h-5" />
              Random Matching
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Find Your Study Partner
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Connect randomly with other students to chat, share experiences, and make friends.
            </p>
          </motion.div>
        </div>

        {!activeMatch && !isMatching && (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#4A90C5] to-[#357AB8] flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-black mb-3">Ready to Meet Someone New?</h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Click the button below to be randomly matched with another student on the platform.
            </p>
            <Button 
              onClick={handleFindMatch}
              size="lg"
              className="bg-[#EB9441] hover:bg-[#d88537] text-white"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Find a Match
            </Button>
          </div>
        )}

        {isMatching && (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
            <Loader2 className="w-12 h-12 text-[#4A90C5] animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-black mb-2">Finding Your Match...</h3>
            <p className="text-slate-600">Please wait while we connect you with someone</p>
          </div>
        )}

        {activeMatch && (
          <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-[#4A90C5] to-[#357AB8] p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Connected with a student</h3>
                  <Badge className="bg-white/20 text-white text-xs">Active</Badge>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => endMatchMutation.mutate()}
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4 mr-2" />
                End Chat
              </Button>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-6 space-y-4 bg-slate-50">
              {messages.length === 0 ? (
                <div className="text-center text-slate-500 mt-20">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 text-slate-300" />
                  <p>No messages yet. Start the conversation!</p>
                </div>
              ) : (
                messages.map((msg) => (
                  <div 
                    key={msg.id}
                    className={`flex ${msg.sender_email === user.email ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs rounded-2xl px-4 py-2 ${
                      msg.sender_email === user.email 
                        ? 'bg-[#4A90C5] text-white' 
                        : 'bg-white border border-slate-200 text-slate-900'
                    }`}>
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender_email === user.email ? 'text-white/70' : 'text-slate-400'
                      }`}>
                        {format(new Date(msg.created_date), 'HH:mm')}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-slate-200">
              <div className="flex gap-2">
                <Input
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button 
                  type="submit"
                  disabled={!currentMessage.trim()}
                  className="bg-[#4A90C5] hover:bg-[#357AB8]"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}