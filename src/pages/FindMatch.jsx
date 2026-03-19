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

  const { data: matchedUserProfile } = useQuery({
    queryKey: ['matchedUser', activeMatch?.matched_user_email],
    queryFn: async () => {
      const users = await base44.entities.User.list();
      return users.find(u => u.email === activeMatch.matched_user_email);
    },
    enabled: !!activeMatch,
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
            <div className="inline-flex items-center gap-2 text-[#00C9A7] font-medium mb-4">
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
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00C9A7] to-[#005F56] flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-black mb-3">Ready to Meet Someone New?</h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">
              Click the button below to be randomly matched with another student on the platform.
            </p>
            <Button 
              onClick={handleFindMatch}
              size="lg"
              className="bg-[#00C9A7] hover:bg-[#e06e46] text-white"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Find a Match
            </Button>
          </div>
        )}

        {isMatching && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-[#00C9A7] to-[#005F56] rounded-2xl border border-slate-100 p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white rounded-full"
                  initial={{ 
                    x: Math.random() * 400, 
                    y: -20,
                    opacity: 0.8 
                  }}
                  animate={{ 
                    y: 500,
                    opacity: 0,
                    scale: [1, 1.5, 0]
                  }}
                  transition={{ 
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="relative"
            >
              <Sparkles className="w-16 h-16 text-white mx-auto mb-4" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-2">Finding Your Match...</h3>
            <p className="text-white/80">Searching for the perfect study partner</p>
            <motion.div
              className="flex justify-center gap-2 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-white rounded-full"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}

        {activeMatch && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Match Found Animation */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-[#00C9A7] to-[#D4A574] rounded-2xl p-6 text-center relative overflow-hidden"
            >
              <div className="absolute inset-0">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    initial={{ 
                      x: '50%',
                      y: '50%',
                      scale: 0,
                      opacity: 1
                    }}
                    animate={{ 
                      x: `${Math.random() * 100}%`,
                      y: `${Math.random() * 100}%`,
                      scale: [0, 1, 0],
                      opacity: [1, 1, 0]
                    }}
                    transition={{ 
                      duration: 1.5,
                      delay: i * 0.05,
                      ease: "easeOut"
                    }}
                  >
                    <Sparkles className="w-4 h-4 text-white" />
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.6 }}
                className="relative"
              >
                <h3 className="text-2xl font-bold text-white mb-2">Match Found! 🎉</h3>
                <p className="text-white/90">You're now connected with a fellow student</p>
              </motion.div>
            </motion.div>

            {/* Matched User Profile */}
            {matchedUserProfile && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl border border-slate-100 p-6"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00C9A7] to-[#005F56] flex items-center justify-center text-white text-2xl font-bold">
                    {matchedUserProfile.full_name?.[0] || matchedUserProfile.email?.[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-black">
                      {matchedUserProfile.full_name || "Anonymous Student"}
                    </h3>
                    {matchedUserProfile.university && (
                      <p className="text-slate-600 text-sm">{matchedUserProfile.university}</p>
                    )}
                    {matchedUserProfile.student_status && (
                      <Badge className="mt-1 bg-[#00C9A7]/10 text-[#00C9A7]">
                        {matchedUserProfile.student_status.replace('_', ' ')}
                      </Badge>
                    )}
                  </div>
                </div>
                {matchedUserProfile.bio && (
                  <p className="text-slate-600 text-sm">{matchedUserProfile.bio}</p>
                )}
              </motion.div>
            )}

            {/* Chat Box */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-[#00C9A7] to-[#005F56] p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Chat Room</h3>
                    <Badge className="bg-white/20 text-white text-xs">Active</Badge>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    if (confirm("Are you sure you want to leave this chat?")) {
                      endMatchMutation.mutate();
                    }
                  }}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-4 h-4 mr-2" />
                  Leave Chat
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
                        ? 'bg-[#00C9A7] text-white' 
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
                  className="bg-[#00C9A7] hover:bg-[#005F56]"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
            </div>

            {/* Start Over Button */}
            <div className="text-center">
              <Button 
                variant="outline"
                onClick={() => {
                  if (confirm("End this chat and find a new match?")) {
                    endMatchMutation.mutate();
                  }
                }}
                className="border-[#00C9A7] text-[#00C9A7] hover:bg-[#00C9A7]/5"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Start Over & Find New Match
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}