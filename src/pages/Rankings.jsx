import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trophy, TrendingUp, TrendingDown, Minus, MapPin, Users } from "lucide-react";

const rankings = [
  { rank: 1, name: "Seoul National University", korean: "서울대학교", qsWorld: 29, qsAsia: 8, location: "Seoul", change: "up" },
  { rank: 2, name: "KAIST", korean: "한국과학기술원", qsWorld: 41, qsAsia: 12, location: "Daejeon", change: "same" },
  { rank: 3, name: "Yonsei University", korean: "연세대학교", qsWorld: 73, qsAsia: 18, location: "Seoul", change: "up" },
  { rank: 4, name: "Korea University", korean: "고려대학교", qsWorld: 79, qsAsia: 21, location: "Seoul", change: "up" },
  { rank: 5, name: "POSTECH", korean: "포항공과대학교", qsWorld: 100, qsAsia: 28, location: "Pohang", change: "down" },
  { rank: 6, name: "Sungkyunkwan University", korean: "성균관대학교", qsWorld: 145, qsAsia: 35, location: "Seoul", change: "up" },
  { rank: 7, name: "Hanyang University", korean: "한양대학교", qsWorld: 164, qsAsia: 42, location: "Seoul", change: "same" },
  { rank: 8, name: "EWHA Womans University", korean: "이화여자대학교", qsWorld: 346, qsAsia: 72, location: "Seoul", change: "up" },
];

export default function Rankings() {
  const [rankingType, setRankingType] = useState("qsWorld");

  const sortedRankings = [...rankings].sort((a, b) => a[rankingType] - b[rankingType]);

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              University Rankings
            </h1>
            <p className="text-slate-600">
              Compare Korean universities by international rankings
            </p>
          </div>
          <Select value={rankingType} onValueChange={setRankingType}>
            <SelectTrigger className="w-48 mt-4 md:mt-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="qsWorld">QS World Ranking</SelectItem>
              <SelectItem value="qsAsia">QS Asia Ranking</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Top 3 Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {sortedRankings.slice(0, 3).map((uni, index) => (
            <motion.div
              key={uni.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`relative rounded-2xl p-6 overflow-hidden ${
                index === 0 ? 'bg-gradient-to-br from-amber-400 to-amber-500 text-white' :
                index === 1 ? 'bg-gradient-to-br from-slate-400 to-slate-500 text-white' :
                'bg-gradient-to-br from-orange-300 to-orange-400 text-white'
              }`}>
                <div className="absolute top-4 right-4">
                  <Trophy className={`w-8 h-8 ${index === 0 ? 'text-amber-200' : index === 1 ? 'text-slate-200' : 'text-orange-200'}`} />
                </div>
                <div className="text-5xl font-bold mb-2 opacity-90">#{index + 1}</div>
                <h3 className="text-xl font-bold mb-1">{uni.name}</h3>
                <p className="text-sm opacity-80 mb-4">{uni.korean}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm opacity-80">
                    {rankingType === 'qsWorld' ? 'QS World' : 'QS Asia'}: #{uni[rankingType]}
                  </span>
                  <Badge className="bg-white/20 text-white">
                    <MapPin className="w-3 h-3 mr-1" />
                    {uni.location}
                  </Badge>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Full Rankings Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
        >
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="w-16">Rank</TableHead>
                <TableHead>University</TableHead>
                <TableHead className="text-center">QS World</TableHead>
                <TableHead className="text-center">QS Asia</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-center">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedRankings.map((uni, index) => (
                <TableRow key={uni.name} className="hover:bg-slate-50">
                  <TableCell>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index < 3 
                        ? index === 0 ? 'bg-amber-100 text-amber-700' 
                          : index === 1 ? 'bg-slate-200 text-slate-700' 
                          : 'bg-orange-100 text-orange-700'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {index + 1}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-semibold text-slate-900">{uni.name}</div>
                      <div className="text-sm text-slate-500">{uni.korean}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-medium">#{uni.qsWorld}</TableCell>
                  <TableCell className="text-center font-medium">#{uni.qsAsia}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="text-slate-600">
                      <MapPin className="w-3 h-3 mr-1" />
                      {uni.location}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {uni.change === 'up' && <TrendingUp className="w-5 h-5 text-emerald-500 mx-auto" />}
                    {uni.change === 'down' && <TrendingDown className="w-5 h-5 text-rose-500 mx-auto" />}
                    {uni.change === 'same' && <Minus className="w-5 h-5 text-slate-400 mx-auto" />}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>

        <p className="text-sm text-slate-500 mt-6 text-center">
          Rankings based on QS World University Rankings 2024
        </p>
      </div>
    </div>
  );
}