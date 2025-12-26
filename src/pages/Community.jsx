import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
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
  Filter, Loader2
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

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
    onError: () => {
      toast.error("Failed to create post. Please try again.");
    }
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Community
            </h1>
            <p className="text-slate-600">
              Connect with students and share your experiences
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 md:mt-0 bg-[#4A90C5] hover:bg-[#357AB8]">
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
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-8">
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
                <div className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:border-[#4A90C5]/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4A90C5] to-[#357AB8] flex items-center justify-center text-white font-medium flex-shrink-0">
                      {post.author_name?.[0] || "A"}
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
                        <span className="flex items-center gap-1 text-sm text-slate-500 hover:text-rose-500 cursor-pointer transition-colors">
                          <Heart className="w-4 h-4" /> {post.likes_count}
                        </span>
                        <span className="flex items-center gap-1 text-sm text-slate-500">
                          <MessageSquare className="w-4 h-4" /> {post.comments_count}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">No posts found. Be the first to start a discussion!</p>
          </div>
        )}
      </div>
    </div>
  );
}