'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookmarkCheck, Heart, Trash2, Eye, Star,
  Clock, Wrench, CheckCircle, Search
} from 'lucide-react';
import { useAppStore } from '@/lib/store';

type Tab = 'all' | 'favorites' | 'in-development' | 'completed';

export default function SavedIdeas() {
  const { savedIdeas, removeSavedIdea, toggleFavorite, updateIdeaStatus, setCurrentResult, setCurrentView } = useAppStore();
  const [activeTab, setActiveTab] = useState<Tab>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs: { key: Tab; label: string; icon: React.ElementType }[] = [
    { key: 'all', label: 'All Ideas', icon: BookmarkCheck },
    { key: 'favorites', label: 'Favorites', icon: Heart },
    { key: 'in-development', label: 'In Development', icon: Wrench },
    { key: 'completed', label: 'Completed', icon: CheckCircle },
  ];

  const filteredIdeas = savedIdeas.filter((idea) => {
    const matchesTab =
      activeTab === 'all' ||
      (activeTab === 'favorites' && idea.favorite) ||
      (activeTab === 'in-development' && idea.status === 'in-development') ||
      (activeTab === 'completed' && idea.status === 'completed');
    const matchesSearch = !searchTerm ||
      idea.inventionName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleView = (idea: typeof savedIdeas[0]) => {
    setCurrentResult(idea);
    setCurrentView('result');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-white mb-2 font-[var(--font-display)]">
          Saved <span className="gradient-text">Ideas</span>
        </h1>
        <p className="text-slate-400 text-sm">Manage your saved invention concepts.</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all
              ${activeTab === tab.key
                ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                : 'text-slate-500 hover:text-white hover:bg-white/5 border border-transparent'
              }
            `}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search saved ideas…"
          className="input-field pl-10"
        />
      </div>

      {/* List */}
      {filteredIdeas.length === 0 ? (
        <div className="text-center py-16">
          <BookmarkCheck size={40} className="text-slate-600 mx-auto mb-4" />
          <p className="text-slate-500 mb-2">
            {savedIdeas.length === 0 ? 'No saved ideas yet.' : 'No ideas match your filter.'}
          </p>
          {savedIdeas.length === 0 && (
            <button
              onClick={() => setCurrentView('workspace')}
              className="btn-primary text-sm px-4 py-2 mt-2"
            >
              Create Your First Fusion
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {filteredIdeas.map((idea) => (
              <motion.div
                key={idea.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary-500/10 text-primary-400">
                      {idea.category}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      idea.status === 'completed'
                        ? 'bg-green-500/10 text-green-400'
                        : idea.status === 'in-development'
                        ? 'bg-amber-500/10 text-amber-400'
                        : 'bg-white/5 text-slate-500'
                    }`}>
                      {idea.status === 'in-development' ? 'In Development' : idea.status === 'completed' ? 'Completed' : 'Created'}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-white truncate">{idea.inventionName}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {idea.ideaA} + {idea.ideaB} • Score: {idea.scores.overall}/100
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleView(idea)}
                    className="p-2 rounded-lg hover:bg-white/5 transition-colors text-slate-400 hover:text-white"
                    title="View"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => toggleFavorite(idea.id)}
                    className={`p-2 rounded-lg hover:bg-white/5 transition-colors ${idea.favorite ? 'text-red-400' : 'text-slate-400 hover:text-red-400'}`}
                    title="Favorite"
                  >
                    <Heart size={16} fill={idea.favorite ? 'currentColor' : 'none'} />
                  </button>

                  {/* Status buttons */}
                  <select
                    value={idea.status}
                    onChange={(e) => updateIdeaStatus(idea.id, e.target.value as 'created' | 'in-development' | 'completed')}
                    className="text-xs bg-transparent border border-white/10 rounded-lg px-2 py-1.5 text-slate-400 outline-none cursor-pointer"
                  >
                    <option value="created">Created</option>
                    <option value="in-development">In Development</option>
                    <option value="completed">Completed</option>
                  </select>

                  <button
                    onClick={() => removeSavedIdea(idea.id)}
                    className="p-2 rounded-lg hover:bg-red-500/10 transition-colors text-slate-500 hover:text-red-400"
                    title="Delete"
                  >
                    <Trash2 size={16} />
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
