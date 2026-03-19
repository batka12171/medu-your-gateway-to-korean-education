import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, Search, User } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export default function Messages() {
  const [user, setUser] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState("");
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

  const { data: allMessages = [] } = useQuery({
    queryKey: ['directMessages', user?.email],
    queryFn: async () => {
      const sent = await base44.entities.DirectMessage.filter({ sender_email: user.email });
      const received = await base44.entities.DirectMessage.filter({ recipient_email: user.email });
      return [...sent, ...received].sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    },
    enabled: !!user,
    refetchInterval: 3000,
  });

  const conversations = {};
  allMessages.forEach(msg => {
    const otherId = msg.sender_email === user?.email ? msg.recipient_email : msg.sender_email;
    if (!conversations[msg.conversation_id]) {
      conversations[msg.conversation_id] = {
        id: msg.conversation_id,
        otherEmail: otherId,
        otherName: msg.sender_email === user?.email ? msg.recipient_email : msg.sender_name,
        messages: [],
        lastMessage: msg,
      };
    }
    conversations[msg.conversation_id].messages.push(msg);
  });

  const conversationList = Object.values(conversations);

  const sendMessageMutation = useMutation({
    mutationFn: (data) => base44.entities.DirectMessage.create(data),
    onSuccess: () => {
      setNewMessage("");
      queryClient.invalidateQueries({ queryKey: ['directMessages'] });
    },
  });

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    sendMessageMutation.mutate({
      conversation_id: selectedConversation.id,
      sender_email: user.email,
      sender_name: user.full_name || "Anonymous",
      recipient_email: selectedConversation.otherEmail,
      message: newMessage,
    });
  };

  const selectedMessages = selectedConversation 
    ? conversations[selectedConversation.id]?.messages.sort((a, b) => 
        new Date(a.created_date) - new Date(b.created_date)
      ) 
    : [];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-black mb-8">Messages</h1>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Conversations List */}
          <div className="bg-white rounded-2xl border border-slate-100 p-4">
            <h2 className="font-semibold text-black mb-4">Conversations</h2>
            <div className="space-y-2">
              {conversationList.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-8">No messages yet</p>
              ) : (
                conversationList.map(conv => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedConversation?.id === conv.id 
                        ? 'bg-[#00C9A7]/10 border border-[#00C9A7]' 
                        : 'hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00C9A7] to-[#005F56] flex items-center justify-center text-white font-semibold">
                        {conv.otherName?.[0] || 'U'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-black truncate">{conv.otherName}</p>
                        <p className="text-xs text-slate-500 truncate">{conv.lastMessage.message}</p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-slate-100 flex flex-col">
            {selectedConversation ? (
              <>
                <div className="p-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00C9A7] to-[#005F56] flex items-center justify-center text-white font-semibold">
                      {selectedConversation.otherName?.[0] || 'U'}
                    </div>
                    <div>
                      <p className="font-semibold text-black">{selectedConversation.otherName}</p>
                      <p className="text-xs text-slate-500">{selectedConversation.otherEmail}</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 p-4 space-y-4 overflow-y-auto h-96">
                  {selectedMessages.map(msg => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender_email === user.email ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-xs rounded-2xl px-4 py-2 ${
                        msg.sender_email === user.email
                          ? 'bg-[#00C9A7] text-white'
                          : 'bg-slate-100 text-slate-900'
                      }`}>
                        <p className="text-sm">{msg.message}</p>
                        <p className={`text-xs mt-1 ${
                          msg.sender_email === user.email ? 'text-white/70' : 'text-slate-400'
                        }`}>
                          {format(new Date(msg.created_date), 'HH:mm')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSend} className="p-4 border-t border-slate-100">
                  <div className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                    />
                    <Button type="submit" className="bg-[#00C9A7] hover:bg-[#005F56]">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">Select a conversation to start chatting</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}