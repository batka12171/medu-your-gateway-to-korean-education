import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { motion } from "framer-motion";
import { MessageSquare, Heart, ArrowRight, Users2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const posts = [
  {
    title: "My journey from applying to getting accepted at SNU",
    category: "admission_tips",
    author: "Min-ji K.",
    user_type: "current_student",
    likes: 234,
    comments: 45,
  },
  {
    title: "Best neighborhoods in Seoul for international students",
    category: "life_in_korea",
    author: "James W.",
    user_type: "current_student",
    likes: 189,
    comments: 67,
  },
  {
    title: "How to prepare for TOPIK - resources that actually work",
    category: "language_prep",
    author: "Yuki T.",
    user_type: "alumni",
    likes: 312,
    comments: 89,
  }
];

const categoryColors = {
  admission_tips: "bg-emerald-50 text-emerald-700",
  life_in_korea: "bg-blue-50 text-blue-700",
  language_prep: "bg-purple-50 text-purple-700",
};

export default function CommunityPreview() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 text-[#00C9A7] font-medium mb-4">
              <Users2 className="w-5 h-5" />
              Student Community
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Connect with students
              <br />
              <span className="text-[#00C9A7]">who've been there</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8">
              Join our vibrant community where current students in Korea share their 
              experiences, tips, and advice with prospective students just like you.
            </p>

            <div className="flex items-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">500+</div>
                <div className="text-sm text-slate-500">Active Members</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">1.2k</div>
                <div className="text-sm text-slate-500">Discussion Posts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">50+</div>
                <div className="text-sm text-slate-500">Universities</div>
              </div>
            </div>

            <Link to={createPageUrl("Community")}>
              <Button size="lg" className="bg-[#00C9A7] hover:bg-[#1a1f3a]">
                Join Community <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>

          {/* Right Side - Preview Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {posts.map((post, index) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl border border-slate-100 p-5 hover:shadow-lg hover:border-[#00C9A7]/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00C9A7] to-[#1a1f3a] flex items-center justify-center text-white font-medium">
                    {post.author[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-slate-900">{post.author}</span>
                      <Badge variant="secondary" className={`text-xs ${post.user_type === 'current_student' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}`}>
                        {post.user_type === 'current_student' ? 'Current Student' : 'Alumni'}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2 line-clamp-1">{post.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <Badge className={categoryColors[post.category]}>
                        {post.category.replace('_', ' ')}
                      </Badge>
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" /> {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" /> {post.comments}
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