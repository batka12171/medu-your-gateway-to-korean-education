import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Sparkles, MapPin, Trophy, DollarSign, 
  GraduationCap, Loader2, BookmarkPlus, Bookmark, Heart
} from "lucide-react";
import { toast } from "sonner";

export default function UniversityMatcher() {
  const [user, setUser] = useState(null);
  const [preferences, setPreferences] = useState({
    program: "",
    location: "",
    max_ranking: 500,
    min_tuition: 0,
    max_tuition: 20000,
    additional_preferences: ""
  });
  const [matches, setMatches] = useState([]);
  const [isMatching, setIsMatching] = useState(false);

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

  const { data: savedUniversities = [], refetch: refetchSaved } = useQuery({
    queryKey: ['savedUniversities', user?.email],
    queryFn: () => user ? base44.entities.SavedUniversity.filter({ user_email: user.email }) : [],
    enabled: !!user,
    initialData: [],
  });

  const saveUniversityMutation = useMutation({
    mutationFn: (universityName) => base44.entities.SavedUniversity.create({
      user_email: user.email,
      university_name: universityName
    }),
    onSuccess: () => {
      refetchSaved();
      toast.success("University saved!");
    }
  });

  const unsaveUniversityMutation = useMutation({
    mutationFn: (id) => base44.entities.SavedUniversity.delete(id),
    onSuccess: () => {
      refetchSaved();
      toast.success("University removed from saved");
    }
  });

  const isSaved = (universityName) => {
    return savedUniversities.some(s => s.university_name === universityName);
  };

  const getSavedId = (universityName) => {
    return savedUniversities.find(s => s.university_name === universityName)?.id;
  };

  const handleMatch = async () => {
    if (!user) {
      base44.auth.redirectToLogin();
      return;
    }

    if (!preferences.program) {
      toast.error("Please enter your desired program");
      return;
    }

    setIsMatching(true);
    try {
      const prompt = `You are a university advisor helping international students find the best Korean universities.

User Preferences:
- Program of Interest: ${preferences.program}
- Preferred Location: ${preferences.location || "Any location in Korea"}
- Maximum QS Ranking: ${preferences.max_ranking} (lower is better)
- Tuition Budget: $${preferences.min_tuition} - $${preferences.max_tuition} per semester
- Additional Preferences: ${preferences.additional_preferences || "None"}

Based on these preferences, recommend the top 5-8 Korean universities that best match. For each university, provide:
1. University name (both English and Korean)
2. Why it's a good match (2-3 sentences)
3. Estimated tuition range per semester in USD
4. Key strengths related to their program
5. Match score (0-100)

Return the universities in order of best match first.`;

      const result = await base44.integrations.Core.InvokeLLM({
        prompt: prompt,
        response_json_schema: {
          type: "object",
          properties: {
            matches: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: { type: "string" },
                  name_korean: { type: "string" },
                  match_reason: { type: "string" },
                  tuition_range: { type: "string" },
                  key_strengths: {
                    type: "array",
                    items: { type: "string" }
                  },
                  match_score: { type: "number" }
                }
              }
            }
          }
        }
      });

      setMatches(result.matches || []);
      toast.success(`Found ${result.matches?.length || 0} matching universities!`);
    } catch (error) {
      toast.error("Failed to find matches. Please try again.");
    } finally {
      setIsMatching(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 text-[#4A90C5] font-medium mb-4">
              <Sparkles className="w-5 h-5" />
              AI-Powered Matching
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
              Find Your Perfect University
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Tell us your preferences, and our AI will match you with the best Korean universities for your goals.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Preferences Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-black mb-6">Your Preferences</h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="program">Program of Interest *</Label>
                  <Input
                    id="program"
                    value={preferences.program}
                    onChange={(e) => setPreferences({...preferences, program: e.target.value})}
                    placeholder="e.g., Computer Science, Business, Medicine"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Preferred Location</Label>
                  <Select 
                    value={preferences.location} 
                    onValueChange={(val) => setPreferences({...preferences, location: val})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={null}>Any location</SelectItem>
                      <SelectItem value="Seoul">Seoul</SelectItem>
                      <SelectItem value="Daejeon">Daejeon</SelectItem>
                      <SelectItem value="Pohang">Pohang</SelectItem>
                      <SelectItem value="Busan">Busan</SelectItem>
                      <SelectItem value="Incheon">Incheon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Maximum QS Ranking: {preferences.max_ranking}</Label>
                  <Slider
                    value={[preferences.max_ranking]}
                    onValueChange={(val) => setPreferences({...preferences, max_ranking: val[0]})}
                    min={1}
                    max={500}
                    step={10}
                    className="mt-2"
                  />
                  <p className="text-xs text-slate-500">Lower ranking is better (1 = best)</p>
                </div>

                <div className="space-y-2">
                  <Label>Tuition Budget (per semester)</Label>
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <Input
                        type="number"
                        value={preferences.min_tuition}
                        onChange={(e) => setPreferences({...preferences, min_tuition: parseInt(e.target.value) || 0})}
                        placeholder="Min"
                        className="text-sm"
                      />
                    </div>
                    <span className="text-slate-400">—</span>
                    <div className="flex-1">
                      <Input
                        type="number"
                        value={preferences.max_tuition}
                        onChange={(e) => setPreferences({...preferences, max_tuition: parseInt(e.target.value) || 0})}
                        placeholder="Max"
                        className="text-sm"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">USD ($)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additional">Additional Preferences</Label>
                  <Textarea
                    id="additional"
                    value={preferences.additional_preferences}
                    onChange={(e) => setPreferences({...preferences, additional_preferences: e.target.value})}
                    placeholder="e.g., English-taught programs, research opportunities, scholarships..."
                    className="h-24"
                  />
                </div>

                <Button 
                  onClick={handleMatch}
                  disabled={isMatching}
                  className="w-full bg-[#EB9441] hover:bg-[#d88537] text-white"
                >
                  {isMatching ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Finding Matches...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Find My Matches
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {matches.length === 0 && !isMatching && (
              <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#4A90C5]/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-[#4A90C5]" />
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">Ready to Find Your Match?</h3>
                <p className="text-slate-600">
                  Fill in your preferences and click "Find My Matches" to get AI-powered university recommendations.
                </p>
              </div>
            )}

            {isMatching && (
              <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
                <Loader2 className="w-12 h-12 text-[#4A90C5] animate-spin mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-black mb-2">Analyzing Your Preferences...</h3>
                <p className="text-slate-600">Our AI is finding the best universities for you</p>
              </div>
            )}

            {matches.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-black">Your Matches</h2>
                  <Badge className="bg-[#EB9441] text-white">
                    {matches.length} universities found
                  </Badge>
                </div>

                {matches.map((match, index) => (
                  <motion.div
                    key={match.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:border-[#4A90C5]/30 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-black">{match.name}</h3>
                          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#EB9441]/10">
                            <Trophy className="w-4 h-4 text-[#EB9441]" />
                            <span className="text-sm font-semibold text-[#EB9441]">
                              {match.match_score}% Match
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-500">{match.name_korean}</p>
                      </div>
                      {user && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            if (isSaved(match.name)) {
                              unsaveUniversityMutation.mutate(getSavedId(match.name));
                            } else {
                              saveUniversityMutation.mutate(match.name);
                            }
                          }}
                          className="text-[#EB9441] hover:text-[#d88537] hover:bg-[#EB9441]/5"
                        >
                          {isSaved(match.name) ? (
                            <Bookmark className="w-5 h-5 fill-current" />
                          ) : (
                            <BookmarkPlus className="w-5 h-5" />
                          )}
                        </Button>
                      )}
                    </div>

                    <p className="text-slate-700 mb-4">{match.match_reason}</p>

                    <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                      <DollarSign className="w-4 h-4 text-[#4A90C5]" />
                      <span className="font-medium">{match.tuition_range}</span>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Key Strengths</p>
                      <div className="flex flex-wrap gap-2">
                        {match.key_strengths?.map((strength, idx) => (
                          <Badge key={idx} variant="secondary" className="bg-[#4A90C5]/10 text-[#4A90C5]">
                            {strength}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}