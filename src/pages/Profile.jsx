import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  User, Settings, MessageSquare, Heart, Edit2, 
  Save, Loader2, GraduationCap, MapPin, Sparkles
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const queryClient = useQueryClient();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await base44.auth.me();
        setUser(userData);
        setEditData({
          full_name: userData.full_name || "",
          bio: userData.bio || "",
          university: userData.university || "",
          student_status: userData.student_status || ""
        });
      } catch (e) {
        base44.auth.redirectToLogin();
      }
    };
    loadUser();
  }, []);

  const { data: myPosts = [] } = useQuery({
    queryKey: ['my-posts', user?.email],
    queryFn: () => user?.email ? base44.entities.CommunityPost.filter({ author_email: user.email }) : [],
    enabled: !!user?.email,
  });

  const updateMutation = useMutation({
    mutationFn: (data) => base44.auth.updateMe(data),
    onSuccess: async () => {
      const userData = await base44.auth.me();
      setUser(userData);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update profile");
    }
  });

  const handleSave = () => {
    updateMutation.mutate(editData);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#4A90C5] to-[#357AB8] flex items-center justify-center text-white text-3xl font-bold">
              {user.full_name?.[0] || user.email?.[0]?.toUpperCase()}
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={editData.full_name}
                      onChange={(e) => setEditData({...editData, full_name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={editData.bio}
                      onChange={(e) => setEditData({...editData, bio: e.target.value})}
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>University</Label>
                      <Input
                        value={editData.university}
                        onChange={(e) => setEditData({...editData, university: e.target.value})}
                        placeholder="Your university"
                      />
                    </div>
                    <div>
                      <Label>Status</Label>
                      <Select 
                        value={editData.student_status} 
                        onValueChange={(val) => setEditData({...editData, student_status: val})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="prospective_student">Prospective Student</SelectItem>
                          <SelectItem value="current_student">Current Student</SelectItem>
                          <SelectItem value="alumni">Alumni</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSave} disabled={updateMutation.isPending}>
                      {updateMutation.isPending ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      Save
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-2xl font-bold text-slate-900 mb-1">
                        {user.full_name || "Anonymous User"}
                      </h1>
                      <p className="text-slate-500">{user.email}</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                  {user.bio && (
                    <p className="text-slate-600 mt-4">{user.bio}</p>
                  )}
                  <div className="flex flex-wrap gap-3 mt-4">
                    {user.university && (
                      <Badge variant="outline" className="text-slate-600">
                        <GraduationCap className="w-3 h-3 mr-1" />
                        {user.university}
                      </Badge>
                    )}
                    {user.student_status && (
                      <Badge className="bg-[#4A90C5]/10 text-[#4A90C5]">
                        {user.student_status.replace('_', ' ')}
                      </Badge>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Activity Tabs */}
        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="bg-white border border-slate-100">
            <TabsTrigger value="posts">My Posts</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>

          <TabsContent value="posts">
            {myPosts.length > 0 ? (
              <div className="space-y-4">
                {myPosts.map((post) => (
                  <div 
                    key={post.id}
                    className="bg-white rounded-xl border border-slate-100 p-6 hover:shadow-md transition-all"
                  >
                    <h3 className="font-semibold text-lg text-slate-900 mb-2">{post.title}</h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{post.content}</p>
                    <div className="flex items-center gap-4 text-sm text-slate-500">
                      <Badge variant="outline">{post.category?.replace('_', ' ')}</Badge>
                      <span className="flex items-center gap-1">
                        <Heart className="w-4 h-4" /> {post.likes_count || 0}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-4 h-4" /> {post.comments_count || 0}
                      </span>
                      <span>{format(new Date(post.created_date), "MMM d, yyyy")}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-100 p-12 text-center">
                <MessageSquare className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-500">You haven't posted anything yet.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="saved">
            <div className="bg-white rounded-xl border border-slate-100 p-12 text-center">
              <Heart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No saved posts yet.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}