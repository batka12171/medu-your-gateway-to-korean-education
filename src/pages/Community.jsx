import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Search, Plus, Heart, MessageSquare, Clock, User,
  Filter, Loader2, Users, Calendar, HelpCircle, UserPlus, CheckCircle
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import GroupCard from "../components/community/GroupCard";
import EventCard from "../components/community/EventCard";

const categories = [
  { value: "all", label: "All Topics" },
  { value: "admission_tips", label: "Admission Tips" },
  { value: "life_in_korea", label: "Life in Korea" },
  { value: "visa_housing", label: "Visa & Housing" },
  { value: "language_prep", label: "Language Prep" },
  { value: "general", label: "General" },
  { value: "questions", label: "Questions" },
];

const categoryColors = {
  admission_tips: "bg-emerald-50 text-emerald-700 border-emerald-200",
  life_in_korea: "bg-blue-50 text-blue-700 border-blue-200",
  visa_housing: "bg-purple-50 text-purple-700 border-purple-200",
  language_prep: "bg-amber-50 text-amber-700 border-amber-200",
  general: "bg-slate-50 text-slate-700 border-slate-200",
  questions: "bg-rose-50 text-rose-700 border-rose-200",
};

const userTypeColors = {
  current_student: "bg-emerald-100 text-emerald-700",
  prospective_student: "bg-blue-100 text-blue-700",
  alumni: "bg-purple-100 text-purple-700",
};

const staticPosts = [
  {
    id: "1",
    title: "My journey from applying to getting accepted at SNU",
    content: "After two years of preparation, I finally got accepted to Seoul National University's Computer Science program. Here's everything I learned...",
    author_name: "Min-ji K.",
    user_type: "current_student",
    category: "admission_tips",
    tags: ["SNU", "Computer Science", "Graduate"],
    likes_count: 234,
    comments_count: 45,
    created_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "2",
    title: "Best neighborhoods in Seoul for international students",
    content: "After living in 3 different neighborhoods over 4 years, I've compiled my recommendations for where to live based on budget and lifestyle...",
    author_name: "James W.",
    user_type: "current_student",
    category: "life_in_korea",
    tags: ["Housing", "Seoul", "Budget"],
    likes_count: 189,
    comments_count: 67,
    created_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "3",
    title: "How to prepare for TOPIK - resources that actually work",
    content: "I went from zero Korean to TOPIK 5 in 18 months. Here are the resources and study methods that helped me the most...",
    author_name: "Yuki T.",
    user_type: "alumni",
    category: "language_prep",
    tags: ["TOPIK", "Korean", "Study Tips"],
    likes_count: 312,
    comments_count: 89,
    created_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "4",
    title: "D-2 Student Visa Application Guide 2024",
    content: "Complete step-by-step guide to applying for the D-2 student visa, including required documents and tips from my experience...",
    author_name: "Sarah C.",
    user_type: "current_student",
    category: "visa_housing",
    tags: ["Visa", "D-2", "Immigration"],
    likes_count: 156,
    comments_count: 34,
    created_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: "5",
    title: "Questions about KAIST application deadline",
    content: "Hi everyone! I'm confused about the KAIST spring admission deadline. Does anyone know if they accept late applications?",
    author_name: "Alex P.",
    user_type: "prospective_student",
    category: "questions",
    tags: ["KAIST", "Deadline", "Spring Admission"],
    likes_count: 23,
    comments_count: 12,
    created_date: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
  }
];

export default function Community() {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "general",
    user_type: "prospective_student"
  });
  const [newGroup, setNewGroup] = useState({ name: "", description: "", category: "general" });
  const [newEvent, setNewEvent] = useState({ title: "", description: "", event_type: "meetup", date: "", location: "" });
  const [newQuestion, setNewQuestion] = useState({ title: "", content: "", category: "general" });
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [newAnswer, setNewAnswer] = useState("");
  const [groupDialogOpen, setGroupDialogOpen] = useState(false);
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [questionDialogOpen, setQuestionDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await base44.auth.me();
        setUser(userData);
      } catch (e) {
        setUser(null);
      }
    };
    loadUser();
  }, []);

  const { data: dbPosts = [], isLoading } = useQuery({
    queryKey: ['community-posts'],
    queryFn: () => base44.entities.CommunityPost.list('-created_date'),
    initialData: [],
  });

  const { data: groups = [] } = useQuery({
    queryKey: ['community-groups'],
    queryFn: () => base44.entities.CommunityGroup.list(),
    initialData: [],
  });

  const { data: events = [] } = useQuery({
    queryKey: ['events'],
    queryFn: () => base44.entities.Event.list('-date'),
    initialData: [],
  });

  const { data: questions = [] } = useQuery({
    queryKey: ['qa-questions'],
    queryFn: () => base44.entities.QAQuestion.list('-created_date'),
    initialData: [],
  });

  const { data: answers = [] } = useQuery({
    queryKey: ['qa-answers', selectedQuestion?.id],
    queryFn: () => selectedQuestion ? base44.entities.QAAnswer.filter({ question_id: selectedQuestion.id }, '-created_date') : [],
    enabled: !!selectedQuestion,
    initialData: [],
  });

  const posts = dbPosts.length > 0 ? dbPosts : staticPosts;

  const createPostMutation = useMutation({
    mutationFn: (data) => base44.entities.CommunityPost.create({
      ...data,
      author_name: user?.full_name || "Anonymous",
      author_email: user?.email || "",
      likes_count: 0,
      comments_count: 0
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community-posts'] });
      toast.success("Post created successfully!");
      setDialogOpen(false);
      setNewPost({ title: "", content: "", category: "general", user_type: "prospective_student" });
    },
  });

  const likePostMutation = useMutation({
    mutationFn: (post) => base44.entities.CommunityPost.update(post.id, {
      likes_count: (post.likes_count || 0) + 1
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community-posts'] });
    },
  });

  const createGroupMutation = useMutation({
    mutationFn: (data) => base44.entities.CommunityGroup.create({
      ...data,
      created_by: user.email,
      members: [user.email],
      member_count: 1
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community-groups'] });
      toast.success("Group created!");
      setGroupDialogOpen(false);
      setNewGroup({ name: "", description: "", category: "general" });
    },
  });

  const joinGroupMutation = useMutation({
    mutationFn: (group) => base44.entities.CommunityGroup.update(group.id, {
      members: [...(group.members || []), user.email],
      member_count: (group.member_count || 0) + 1
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['community-groups'] });
      toast.success("Joined group!");
    },
  });

  const createEventMutation = useMutation({
    mutationFn: (data) => base44.entities.Event.create({
      ...data,
      organizer_name: user.full_name || "Anonymous",
      organizer_email: user.email,
      attendees: []
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success("Event created!");
      setEventDialogOpen(false);
      setNewEvent({ title: "", description: "", event_type: "meetup", date: "", location: "" });
    },
  });

  const rsvpEventMutation = useMutation({
    mutationFn: (event) => base44.entities.Event.update(event.id, {
      attendees: [...(event.attendees || []), user.email]
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] });
      toast.success("RSVP confirmed!");
    },
  });

  const createQuestionMutation = useMutation({
    mutationFn: (data) => base44.entities.QAQuestion.create({
      ...data,
      author_name: user.full_name || "Anonymous",
      author_email: user.email,
      views: 0,
      answers_count: 0,
      is_answered: false
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qa-questions'] });
      toast.success("Question posted!");
      setQuestionDialogOpen(false);
      setNewQuestion({ title: "", content: "", category: "general" });
    },
  });

  const createAnswerMutation = useMutation({
    mutationFn: (data) => base44.entities.QAAnswer.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qa-answers'] });
      queryClient.invalidateQueries({ queryKey: ['qa-questions'] });
      toast.success("Answer posted!");
      setNewAnswer("");
    },
  });

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!user) {
      base44.auth.redirectToLogin();
      return;
    }
    createPostMutation.mutate(newPost);
  };

  const filteredPosts = posts.filter(post => {
    const matchSearch = post.title.toLowerCase().includes(search.toLowerCase()) ||
                       post.content.toLowerCase().includes(search.toLowerCase());
    const matchCategory = categoryFilter === "all" || post.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const formatTimeAgo = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return format(new Date(date), "MMM d");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-3">
            Community
          </h1>
          <p className="text-slate-600">
            Connect, learn, and grow together with fellow students
          </p>
        </div>

        <Tabs defaultValue="discussions" className="space-y-8">
          <TabsList className="bg-white border border-slate-100">
            <TabsTrigger value="discussions"><MessageSquare className="w-4 h-4 mr-2" />Discussions</TabsTrigger>
            <TabsTrigger value="groups"><Users className="w-4 h-4 mr-2" />Groups</TabsTrigger>
            <TabsTrigger value="events"><Calendar className="w-4 h-4 mr-2" />Events</TabsTrigger>
            <TabsTrigger value="qa"><HelpCircle className="w-4 h-4 mr-2" />Q&A</TabsTrigger>
          </TabsList>

          {/* Discussions Tab */}
          <TabsContent value="discussions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-black">Community Discussions</h2>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-[#4A90C5] hover:bg-[#357AB8]">
                    <Plus className="w-4 h-4 mr-2" />
                    New Post
                  </Button>
                </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Create New Post</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreatePost} className="space-y-4 mt-4">
                <Input
                  placeholder="Post title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  required
                />
                <Textarea
                  placeholder="Share your experience or ask a question..."
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  className="h-32"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <Select 
                    value={newPost.category} 
                    onValueChange={(val) => setNewPost({...newPost, category: val})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select 
                    value={newPost.user_type} 
                    onValueChange={(val) => setNewPost({...newPost, user_type: val})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="I am a..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prospective_student">Prospective Student</SelectItem>
                      <SelectItem value="current_student">Current Student</SelectItem>
                      <SelectItem value="alumni">Alumni</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-[#4A90C5] hover:bg-[#357AB8]"
                  disabled={createPostMutation.isPending}
                >
                  {createPostMutation.isPending ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : null}
                  Post
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 bg-slate-50 border-0"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-slate-50 border-0">
                <SelectValue placeholder="All Topics" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            </div>
            </div>

            {/* Posts */}
            <div className="space-y-4">
          <AnimatePresence>
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all duration-200">
                  <div className="flex items-start p-4 gap-2">
                    <div className="flex gap-3 items-start">
                      {/* Reddit-style voting */}
                      <div className="flex flex-col items-center gap-1 pt-1">
                        <button 
                          onClick={() => user ? likePostMutation.mutate(post) : base44.auth.redirectToLogin()}
                          className="p-1 hover:bg-[#4A90C5]/10 rounded transition-colors"
                        >
                          <svg className="w-5 h-5 text-slate-400 hover:text-[#4A90C5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                        <span className="text-sm font-semibold text-[#4A90C5]">{post.likes_count || 0}</span>
                        <button className="p-1 hover:bg-slate-100 rounded transition-colors">
                          <svg className="w-5 h-5 text-slate-400 hover:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-medium text-slate-900">{post.author_name}</span>
                          <Badge className={`text-xs ${userTypeColors[post.user_type]}`}>
                            {post.user_type?.replace('_', ' ')}
                          </Badge>
                          <span className="text-sm text-slate-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formatTimeAgo(post.created_date)}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-2 hover:text-[#4A90C5] cursor-pointer">
                          {post.title}
                        </h3>
                        <p className="text-slate-600 mb-4 line-clamp-2">{post.content}</p>
                        <div className="flex items-center gap-4 flex-wrap">
                          <Badge className={`border ${categoryColors[post.category]}`}>
                            {post.category?.replace('_', ' ')}
                          </Badge>
                          <button className="flex items-center gap-1 text-sm text-slate-500 hover:bg-slate-100 px-2 py-1 rounded transition-colors">
                            <MessageSquare className="w-4 h-4" /> {post.comments_count || 0} comments
                          </button>
                          <button className="flex items-center gap-1 text-sm text-slate-500 hover:bg-slate-100 px-2 py-1 rounded transition-colors">
                            Share
                          </button>
                          <button className="flex items-center gap-1 text-sm text-slate-500 hover:bg-slate-100 px-2 py-1 rounded transition-colors">
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </motion.div>
                ))}
                </AnimatePresence>
                </div>
                </TabsContent>

                {/* Groups Tab */}
                <TabsContent value="groups" className="space-y-6">
                <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-black">Community Groups</h2>
                <Dialog open={groupDialogOpen} onOpenChange={setGroupDialogOpen}>
                <DialogTrigger asChild>
                <Button className="bg-[#4A90C5] hover:bg-[#357AB8]">
                 <Plus className="w-4 h-4 mr-2" />
                 Create Group
                </Button>
                </DialogTrigger>
                <DialogContent>
                <DialogHeader><DialogTitle>Create New Group</DialogTitle></DialogHeader>
                <form onSubmit={(e) => { e.preventDefault(); if (user) createGroupMutation.mutate(newGroup); else base44.auth.redirectToLogin(); }} className="space-y-4">
                 <Input placeholder="Group name" value={newGroup.name} onChange={(e) => setNewGroup({...newGroup, name: e.target.value})} required />
                 <Textarea placeholder="Description" value={newGroup.description} onChange={(e) => setNewGroup({...newGroup, description: e.target.value})} />
                 <Select value={newGroup.category} onValueChange={(val) => setNewGroup({...newGroup, category: val})}>
                   <SelectTrigger><SelectValue /></SelectTrigger>
                   <SelectContent>
                     <SelectItem value="university">University</SelectItem>
                     <SelectItem value="program">Program</SelectItem>
                     <SelectItem value="city">City</SelectItem>
                     <SelectItem value="general">General</SelectItem>
                   </SelectContent>
                 </Select>
                 <Button type="submit" className="w-full bg-[#4A90C5] hover:bg-[#357AB8]">Create Group</Button>
                </form>
                </DialogContent>
                </Dialog>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groups.map(group => (
                <GroupCard 
                key={group.id} 
                group={group} 
                isMember={group.members?.includes(user?.email)}
                onJoin={() => user ? joinGroupMutation.mutate(group) : base44.auth.redirectToLogin()}
                />
                ))}
                </div>
                </TabsContent>

                {/* Events Tab */}
                <TabsContent value="events" className="space-y-6">
                <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-black">Upcoming Events</h2>
                <Dialog open={eventDialogOpen} onOpenChange={setEventDialogOpen}>
                <DialogTrigger asChild>
                <Button className="bg-[#EB9441] hover:bg-[#d88537]">
                 <Plus className="w-4 h-4 mr-2" />
                 Create Event
                </Button>
                </DialogTrigger>
                <DialogContent>
                <DialogHeader><DialogTitle>Create New Event</DialogTitle></DialogHeader>
                <form onSubmit={(e) => { e.preventDefault(); if (user) createEventMutation.mutate(newEvent); else base44.auth.redirectToLogin(); }} className="space-y-4">
                 <Input placeholder="Event title" value={newEvent.title} onChange={(e) => setNewEvent({...newEvent, title: e.target.value})} required />
                 <Textarea placeholder="Description" value={newEvent.description} onChange={(e) => setNewEvent({...newEvent, description: e.target.value})} />
                 <Select value={newEvent.event_type} onValueChange={(val) => setNewEvent({...newEvent, event_type: val})}>
                   <SelectTrigger><SelectValue /></SelectTrigger>
                   <SelectContent>
                     <SelectItem value="info_session">Info Session</SelectItem>
                     <SelectItem value="meetup">Meetup</SelectItem>
                     <SelectItem value="workshop">Workshop</SelectItem>
                     <SelectItem value="webinar">Webinar</SelectItem>
                     <SelectItem value="social">Social</SelectItem>
                   </SelectContent>
                 </Select>
                 <Input type="datetime-local" value={newEvent.date} onChange={(e) => setNewEvent({...newEvent, date: e.target.value})} required />
                 <Input placeholder="Location or online link" value={newEvent.location} onChange={(e) => setNewEvent({...newEvent, location: e.target.value})} required />
                 <Button type="submit" className="w-full bg-[#EB9441] hover:bg-[#d88537]">Create Event</Button>
                </form>
                </DialogContent>
                </Dialog>
                </div>
                <div className="space-y-4">
                {events.map(event => (
                <EventCard 
                key={event.id} 
                event={event} 
                isAttending={event.attendees?.includes(user?.email)}
                onRSVP={() => user ? rsvpEventMutation.mutate(event) : base44.auth.redirectToLogin()}
                />
                ))}
                </div>
                </TabsContent>

                {/* Q&A Tab */}
                <TabsContent value="qa" className="space-y-6">
                <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-black">Questions & Answers</h2>
                <Dialog open={questionDialogOpen} onOpenChange={setQuestionDialogOpen}>
                <DialogTrigger asChild>
                <Button className="bg-[#4A90C5] hover:bg-[#357AB8]">
                 <Plus className="w-4 h-4 mr-2" />
                 Ask Question
                </Button>
                </DialogTrigger>
                <DialogContent>
                <DialogHeader><DialogTitle>Ask a Question</DialogTitle></DialogHeader>
                <form onSubmit={(e) => { e.preventDefault(); if (user) createQuestionMutation.mutate(newQuestion); else base44.auth.redirectToLogin(); }} className="space-y-4">
                 <Input placeholder="Question title" value={newQuestion.title} onChange={(e) => setNewQuestion({...newQuestion, title: e.target.value})} required />
                 <Textarea placeholder="Provide details..." value={newQuestion.content} onChange={(e) => setNewQuestion({...newQuestion, content: e.target.value})} className="h-32" required />
                 <Select value={newQuestion.category} onValueChange={(val) => setNewQuestion({...newQuestion, category: val})}>
                   <SelectTrigger><SelectValue /></SelectTrigger>
                   <SelectContent>
                     <SelectItem value="admissions">Admissions</SelectItem>
                     <SelectItem value="visa">Visa</SelectItem>
                     <SelectItem value="housing">Housing</SelectItem>
                     <SelectItem value="academic">Academic</SelectItem>
                     <SelectItem value="life">Life in Korea</SelectItem>
                     <SelectItem value="general">General</SelectItem>
                   </SelectContent>
                 </Select>
                 <Button type="submit" className="w-full bg-[#4A90C5] hover:bg-[#357AB8]">Post Question</Button>
                </form>
                </DialogContent>
                </Dialog>
                </div>
                <div className="space-y-4">
                {questions.map(q => (
                <div key={q.id} className="bg-white rounded-xl border border-slate-100 p-6 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-3">
                 <div className="flex-1">
                   <h3 className="font-bold text-lg text-black mb-2">{q.title}</h3>
                   <p className="text-sm text-slate-600 mb-3 line-clamp-2">{q.content}</p>
                   <div className="flex items-center gap-3 text-sm text-slate-500">
                     <Badge className="bg-[#4A90C5]/10 text-[#4A90C5]">{q.category}</Badge>
                     <span>{q.answers_count || 0} answers</span>
                     <span>{q.views || 0} views</span>
                   </div>
                 </div>
                 {q.is_answered && <Badge className="bg-green-100 text-green-700">Answered</Badge>}
                </div>
                <Button size="sm" variant="outline" onClick={() => setSelectedQuestion(q)} className="border-[#4A90C5] text-[#4A90C5]">View Answers</Button>
                {selectedQuestion?.id === q.id && (
                 <div className="mt-4 pt-4 border-t space-y-4">
                   {answers.map(a => (
                     <div key={a.id} className="bg-slate-50 rounded-lg p-4">
                       <div className="flex items-start gap-3">
                         <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4A90C5] to-[#357AB8] flex items-center justify-center text-white text-sm font-semibold">
                           {a.author_name?.[0] || 'A'}
                         </div>
                         <div className="flex-1">
                           <div className="flex items-center gap-2 mb-2">
                             <span className="font-medium text-sm">{a.author_name}</span>
                             {a.is_mentor && <Badge className="bg-[#EB9441] text-white text-xs">Mentor</Badge>}
                             {a.is_accepted && <CheckCircle className="w-4 h-4 text-green-600" />}
                           </div>
                           <p className="text-sm text-slate-700">{a.content}</p>
                         </div>
                       </div>
                     </div>
                   ))}
                   <form onSubmit={(e) => { e.preventDefault(); if (user) createAnswerMutation.mutate({ question_id: q.id, content: newAnswer, author_name: user.full_name || "Anonymous", author_email: user.email }); else base44.auth.redirectToLogin(); }} className="flex gap-2">
                     <Input placeholder="Write your answer..." value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} />
                     <Button type="submit" className="bg-[#4A90C5] hover:bg-[#357AB8]">Answer</Button>
                   </form>
                 </div>
                )}
                </div>
                ))}
                </div>
                </TabsContent>
                </Tabs>
                </div>
                </div>
                );
                }