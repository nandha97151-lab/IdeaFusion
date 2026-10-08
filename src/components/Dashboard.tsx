'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Zap, TrendingUp, Clock, Award, Star, Activity, Plus } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { OverallScore } from './ScoreVisuals';

export default function Dashboard() {
  const { totalFusions, savedIdeas, fusionHistory, setCurrentView, setCurrentResult } = useAppStore();

  const totalSaved = savedIdeas.length;
  const totalFavorites = savedIdeas.filter(i => i.favorite).length;
  const inDevelopment = savedIdeas.filter(i => i.status === 'in-development').length;

  // Calculate average score
  const avgScore = fusionHistory.length > 0
    ? Math.round(fusionHistory.reduce((acc, curr) => acc + curr.scores.overall, 0) / fusionHistory.length)
    : 0;

  const recentActivity = fusionHistory.slice(0, 5);

  const statCards = [
    { label: 'Total Fusions', value: totalFusions, icon: Zap, color: 'text-primary-400', bg: 'bg-primary-500/10' },
    { label: 'Saved Ideas', value: totalSaved, icon: Lightbulb, color: 'text-accent-400', bg: 'bg-accent-500/10' },
    { label: 'Favorites', value: totalFavorites, icon: Star, color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
    { label: 'In Development', value: inDevelopment, icon: Activity, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-1 font-[var(--font-display)]">
            Welcome to <span className="gradient-text">IdeaFusion</span>
          </h1>
          <p className="text-slate-400 text-sm">Your personal innovation and invention dashboard.</p>
        </div>
        <button
          onClick={() => setCurrentView('workspace')}
          className="btn-primary py-2.5 px-5 flex items-center gap-2 text-sm whitespace-nowrap"
        >
          <Plus size={16} /> New Fusion
        </button>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card p-5 flex items-center gap-4"
          >
            <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
              <stat.icon size={24} className={stat.color} />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Clock size={18} className="text-primary-400" />
              <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
            </div>

            {recentActivity.length === 0 ? (
              <div className="text-center py-8">
                <Lightbulb size={32} className="text-slate-600 mx-auto mb-3" />
                <p className="text-slate-400 text-sm">No fusions created yet.</p>
                <button
                  onClick={() => setCurrentView('workspace')}
                  className="text-primary-400 text-sm mt-2 hover:underline"
                >
                  Create your first invention
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((activity, i) => {
                  // Format time roughly
                  const date = new Date(activity.createdAt);
                  const now = new Date();
                  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
                  let timeAgo = '';
                  if (diff < 60) timeAgo = 'Just now';
                  else if (diff < 3600) timeAgo = `${Math.floor(diff / 60)} minutes ago`;
                  else if (diff < 86400) timeAgo = `${Math.floor(diff / 3600)} hours ago`;
                  else timeAgo = `${Math.floor(diff / 86400)} days ago`;

                  return (
                    <motion.div
                      key={activity.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/[0.02] transition-colors cursor-pointer"
                      onClick={() => {
                        setCurrentResult(activity);
                        setCurrentView('result');
                      }}
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                        <Zap size={16} className="text-primary-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">{activity.inventionName}</p>
                        <p className="text-xs text-slate-500 truncate">Fused {activity.ideaA} & {activity.ideaB}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-sm font-bold text-primary-400">{activity.scores.overall}</p>
                        <p className="text-xs text-slate-500">{timeAgo}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>

        {/* Sidebar widgets */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6 flex flex-col items-center justify-center text-center"
          >
            <h2 className="text-sm font-semibold text-slate-300 mb-6 w-full text-left flex items-center gap-2">
              <TrendingUp size={16} className="text-accent-400" /> Average Innovation Score
            </h2>
            <OverallScore score={avgScore} delay={500} />
            <p className="text-xs text-slate-500 mt-4 px-4">
              This is the average overall innovation score across all your generated concepts.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-6"
          >
            <h2 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
              <Award size={16} className="text-primary-400" /> Quick Actions
            </h2>
            <div className="space-y-2">
              <button onClick={() => setCurrentView('explore')} className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm text-slate-300 transition-colors">
                Browse Community Ideas
              </button>
              <button onClick={() => setCurrentView('categories')} className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm text-slate-300 transition-colors">
                Explore Categories
              </button>
              <button onClick={() => setCurrentView('saved')} className="w-full text-left px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-sm text-slate-300 transition-colors">
                Manage Saved Items
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
