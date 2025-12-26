import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Bookmark, Edit3, Trash2, StickyNote, Heart } from "lucide-react";
import { toast } from "sonner";

export default function SavedUniversities() {
  const [user, setUser] = useState(null);
  const [editingNotes, setEditingNotes] = useState(null);
  const [notesText, setNotesText] = useState("");
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

  const { data: savedUniversities = [], isLoading } = useQuery({
    queryKey: ['savedUniversities', user?.email],
    queryFn: () => base44.entities.SavedUniversity.filter({ user_email: user.email }),
    enabled: !!user,
    initialData: [],
  });

  const updateNotesMutation = useMutation({
    mutationFn: ({ id, notes }) => base44.entities.SavedUniversity.update(id, { notes }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedUniversities'] });
      setEditingNotes(null);
      toast.success("Notes updated!");
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.SavedUniversity.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedUniversities'] });
      toast.success("University removed");
    }
  });

  const handleSaveNotes = (id) => {
    updateNotesMutation.mutate({ id, notes: notesText });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#4A90C5] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your saved universities...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-3">
            Saved Universities
          </h1>
          <p className="text-slate-600">
            Keep track of universities you're interested in and add personal notes for each one.
          </p>
        </div>

        {savedUniversities.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-[#EB9441]/10 flex items-center justify-center mx-auto mb-4">
              <Bookmark className="w-8 h-8 text-[#EB9441]" />
            </div>
            <h3 className="text-lg font-semibold text-black mb-2">No Saved Universities Yet</h3>
            <p className="text-slate-600 mb-6">
              Start saving universities you're interested in from the university matcher or browse pages.
            </p>
            <Button 
              onClick={() => window.location.href = '/UniversityMatcher'}
              className="bg-[#4A90C5] hover:bg-[#357AB8]"
            >
              Find Universities
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {savedUniversities.map((saved, index) => (
              <motion.div
                key={saved.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Heart className="w-5 h-5 text-[#EB9441] fill-current" />
                      <h3 className="text-xl font-bold text-black">{saved.university_name}</h3>
                    </div>
                    
                    {saved.notes ? (
                      <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <StickyNote className="w-4 h-4 text-[#4A90C5]" />
                          <span className="text-sm font-medium text-slate-700">Your Notes</span>
                        </div>
                        <p className="text-sm text-slate-600 whitespace-pre-wrap">{saved.notes}</p>
                      </div>
                    ) : (
                      <p className="text-sm text-slate-500 italic mt-2">No notes added yet</p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Dialog 
                      open={editingNotes === saved.id}
                      onOpenChange={(open) => {
                        if (open) {
                          setEditingNotes(saved.id);
                          setNotesText(saved.notes || "");
                        } else {
                          setEditingNotes(null);
                        }
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="icon"
                          className="border-[#4A90C5] text-[#4A90C5] hover:bg-[#4A90C5]/5"
                        >
                          <Edit3 className="w-4 h-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Notes - {saved.university_name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Textarea
                            value={notesText}
                            onChange={(e) => setNotesText(e.target.value)}
                            placeholder="Add your thoughts, questions, or reminders about this university..."
                            className="h-32"
                          />
                          <Button 
                            onClick={() => handleSaveNotes(saved.id)}
                            className="w-full bg-[#4A90C5] hover:bg-[#357AB8]"
                          >
                            Save Notes
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => deleteMutation.mutate(saved.id)}
                      className="border-red-200 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}