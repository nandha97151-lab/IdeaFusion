'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, Search, Plus, Wrench, ChevronRight, FileText, Download } from 'lucide-react';
import { useAppStore } from '@/lib/store';

export default function DevelopmentLab() {
  const { savedIdeas, setCurrentView, setCurrentResult } = useAppStore();
  const [searchTerm, setSearchTerm] = useState('');

  const developmentIdeas = savedIdeas.filter(i => i.status === 'in-development');

  const filteredIdeas = developmentIdeas.filter(idea =>
    !searchTerm || idea.inventionName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 font-[var(--font-display)] flex items-center gap-3">
            <FlaskConical className="text-primary-400" />
            Development <span className="gradient-text">Lab</span>
          </h1>
          <p className="text-slate-400 text-sm">
            Manage ideas that are actively being developed into prototypes or products.
          </p>
        </div>
      </motion.div>

      {developmentIdeas.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center py-16 glass-card border-dashed border-white/10"
        >
          <Wrench size={48} className="text-slate-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-white mb-2">Your Lab is Empty</h3>
          <p className="text-slate-400 text-sm mb-6 max-w-md mx-auto">
            You don't have any ideas marked as "In Development". Go to your saved ideas and update their status to see them here.
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={() => setCurrentView('workspace')} className="btn-primary text-sm px-4 py-2">
              Create New
            </button>
            <button onClick={() => setCurrentView('saved')} className="btn-secondary text-sm px-4 py-2">
              View Saved Ideas
            </button>
          </div>
        </motion.div>
      ) : (
        <>
          {/* Search */}
          <div className="relative mb-6 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search projects in development…"
              className="input-field pl-10"
            />
          </div>

          {/* Kanban / List View */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredIdeas.map((idea, i) => (
                <motion.div
                  key={idea.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card p-5 flex flex-col h-full group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs px-2 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      In Progress
                    </span>
                    <span className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded-md">
                      {idea.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">
                    {idea.inventionName}
                  </h3>
                  <p className="text-sm text-slate-400 mb-4 line-clamp-3 flex-grow">
                    {idea.description}
                  </p>

                  <div className="pt-4 border-t border-white/5 mt-auto">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-xs text-slate-500">
                        Score: <span className="font-semibold text-primary-400">{idea.scores.overall}/100</span>
                      </div>
                      <div className="flex -space-x-2">
                        <div className="w-6 h-6 rounded-full bg-primary-500/20 border border-surface-900 flex items-center justify-center text-[10px] text-white">A</div>
                        <div className="w-6 h-6 rounded-full bg-accent-500/20 border border-surface-900 flex items-center justify-center text-[10px] text-white">B</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => {
                          setCurrentResult(idea);
                          setCurrentView('result');
                        }}
                        className="flex items-center justify-center gap-1.5 py-2 px-3 bg-white/5 hover:bg-white/10 rounded-lg text-xs text-white transition-colors"
                      >
                        <FileText size={14} /> Details
                      </button>
                      <button className="flex items-center justify-center gap-1.5 py-2 px-3 bg-primary-500/20 hover:bg-primary-500/30 text-primary-300 rounded-lg text-xs transition-colors">
                        <Download size={14} /> Export Plan
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </>
      )}
    </div>
  );
}
