import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { motion } from "framer-motion";
import { MessageSquare, Heart, ArrowRight, Users2, Sparkles, TrendingUp } from "lucide-react";
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
  admission_tips: "bg-emerald-100 text-emerald-700 border-emerald-200",
  life_in_korea: "bg-sky-100 text-sky-700 border-sky-200",
  language_prep: "bg-violet-100 text-violet-700 border-violet-200",
};

export default function CommunityPreview() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#F4845F]/10 via-white to-[#2D3561]/5"></div>
      
      {/* Decorative Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-[#F4845F]/20 to-[#D4A574]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-[#2D3561]/10 to-[#4A90C5]/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-white/50 to-transparent rounded-full"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2D3561] to-[#4A90C5] text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Users2 className="w-4 h-4" />
              Student Community
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              Connect with students
              <br />
              <span className="bg-gradient-to-r from-[#F4845F] to-[#D4A574] bg-clip-text text-transparent">who've been there</span>
            </h2>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Join our vibrant community where current students in Korea share their 
              experiences, tips, and advice with prospective students just like you.
            </p>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { value: "500+", label: "Active Members", color: "from-[#2D3561] to-[#4A90C5]" },
                { value: "1.2k", label: "Discussion Posts", color: "from-[#F4845F] to-[#D4A574]" },
                { value: "50+", label: "Universities", color: "from-[#4A90C5] to-[#2D3561]" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl`}></div>
                  <div className="relative bg-white rounded-2xl p-4 border border-slate-100 shadow-sm group-hover:shadow-lg transition-all">
                    <div className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</div>
                    <div className="text-xs text-slate-500">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link to={createPageUrl("Community")}>
              <Button size="lg" className="bg-gradient-to-r from-[#2D3561] to-[#4A90C5] hover:from-[#1a1f3a] hover:to-[#357AB8] shadow-lg hover:shadow-xl transition-all px-8">
                Join Community <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>

          {/* Right Side - Preview Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {/* Trending Badge */}
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-[#F4845F]" />
              <span className="font-medium text-slate-700">Trending Discussions</span>
            </div>

            {posts.map((post, index) => (
              <motion.div
                key={post.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                {/* Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#F4845F]/10 to-[#2D3561]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-xl hover:border-[#F4845F]/30 transition-all duration-300 group-hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2D3561] to-[#4A90C5] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {post.author[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-slate-900">{post.author}</span>
                        <Badge variant="secondary" className={`text-xs ${post.user_type === 'current_student' ? 'bg-emerald-50 text-emerald-700' : 'bg-violet-50 text-violet-700'}`}>
                          {post.user_type === 'current_student' ? 'Current Student' : 'Alumni'}
                        </Badge>
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-3 group-hover:text-[#2D3561] transition-colors">{post.title}</h3>
                      <div className="flex items-center gap-4 text-sm">
                        <Badge className={`${categoryColors[post.category]} border`}>
                          {post.category.replace('_', ' ')}
                        </Badge>
                        <span className="flex items-center gap-1 text-slate-500">
                          <Heart className="w-4 h-4 text-[#F4845F]" /> {post.likes}
                        </span>
                        <span className="flex items-center gap-1 text-slate-500">
                          <MessageSquare className="w-4 h-4 text-[#4A90C5]" /> {post.comments}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* View All Link */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center pt-4"
            >
              <Link to={createPageUrl("Community")} className="inline-flex items-center gap-2 text-[#2D3561] font-medium hover:text-[#F4845F] transition-colors">
                View all discussions <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}