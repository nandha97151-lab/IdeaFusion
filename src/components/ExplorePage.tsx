'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Zap, Eye, Sparkles } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { generateFusion, getRandomIdeas, CATEGORIES } from '@/lib/ai-service';
import type { FusionResult } from '@/lib/ai-service';

export default function ExplorePage() {
  const { fusionHistory, setCurrentResult, setCurrentView } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [explorableIdeas, setExplorableIdeas] = useState<FusionResult[]>([]);
  const [loading, setLoading] = useState(false);

  // Generate some demo ideas on mount if history is empty
  useEffect(() => {
    if (fusionHistory.length === 0 && explorableIdeas.length === 0) {
      generateDemoIdeas();
    } else {
      setExplorableIdeas(fusionHistory);
    }
  }, [fusionHistory]);

  const generateDemoIdeas = async () => {
    setLoading(true);
    const demoIdeas: FusionResult[] = [];
    const pairs = [
      { ideaA: 'Drone', ideaB: 'Agriculture' },
      { ideaA: 'AI', ideaB: 'Healthcare' },
      { ideaA: 'Solar Energy', ideaB: 'Bicycle' },
      { ideaA: 'Robotics', ideaB: 'Education' },
      { ideaA: 'Blockchain', ideaB: 'Recycling' },
      { ideaA: '3D Printing', ideaB: 'Food' },
    ];
    for (const pair of pairs) {
      const result = await generateFusion(pair);
      demoIdeas.push(result);
    }
    setExplorableIdeas(demoIdeas);
    setLoading(false);
  };

  const filteredIdeas = explorableIdeas.filter((idea) => {
    const matchesSearch = !searchTerm ||
      idea.inventionName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.ideaA.toLowerCase().includes(searchTerm.toLowerCase()) ||
      idea.ideaB.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || idea.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleViewConcept = (idea: FusionResult) => {
    setCurrentResult(idea);
    setCurrentView('result');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2 font-[var(--font-display)]">
          Explore <span className="gradient-text">Ideas</span>
        </h1>
        <p className="text-slate-400 text-sm">Browse generated innovation concepts and discover inspiration.</p>
      </motion.div>

      {/* Search & filter */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-3 mb-8"
      >
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search innovations…"
            className="input-field pl-10"
          />
        </div>
        <div className="relative">
          <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-field pl-10 pr-8 appearance-none cursor-pointer min-w-[200px]"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <button
          onClick={generateDemoIdeas}
          disabled={loading}
          className="btn-primary px-4 py-2.5 flex items-center gap-2 text-sm disabled:opacity-50"
        >
          <Sparkles size={14} />
          {loading ? 'Generating…' : 'Generate More'}
        </button>
      </motion.div>

      {/* Grid */}
      {loading && explorableIdeas.length === 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass-card p-5 animate-pulse">
              <div className="h-3 w-20 bg-white/5 rounded mb-3" />
              <div className="h-5 w-3/4 bg-white/5 rounded mb-2" />
              <div className="h-3 w-full bg-white/5 rounded mb-1" />
              <div className="h-3 w-2/3 bg-white/5 rounded mb-4" />
              <div className="flex gap-4">
                <div className="h-3 w-16 bg-white/5 rounded" />
                <div className="h-3 w-16 bg-white/5 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredIdeas.length === 0 ? (
        <div className="text-center py-16">
          <Search size={40} className="text-slate-600 mx-auto mb-4" />
          <p className="text-slate-500">No ideas found. Try a different search or generate new ones.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredIdeas.map((idea, i) => (
              <motion.div
                key={idea.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card p-5 group cursor-pointer"
                onClick={() => handleViewConcept(idea)}
              >
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-400">
                  {idea.category}
                </span>
                <h3 className="text-base font-semibold text-white mt-3 mb-1 group-hover:text-primary-300 transition-colors">
                  {idea.inventionName}
                </h3>
                <p className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                  {idea.ideaA} <Zap size={10} className="text-primary-400" /> {idea.ideaB}
                </p>
                <p className="text-xs text-slate-400 mb-4 line-clamp-2">{idea.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <span className="text-xs text-primary-400">Innovation: {idea.scores.overall}</span>
                    <span className="text-xs text-accent-400">Feasibility: {idea.scores.feasibility}</span>
                  </div>
                  <button className="text-xs text-slate-500 group-hover:text-primary-400 transition-colors flex items-center gap-1">
                    <Eye size={12} /> View
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
