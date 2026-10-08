'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Compass, Zap, Brain, Lightbulb, TrendingUp, Users } from 'lucide-react';
import { useAppStore } from '@/lib/store';

const stats = [
  { value: '10,000+', label: 'Ideas Generated', icon: Lightbulb },
  { value: '5,000+', label: 'Concept Fusions', icon: Zap },
  { value: '100+', label: 'Innovation Categories', icon: TrendingUp },
  { value: 'AI-Powered', label: 'Analysis Engine', icon: Brain },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

export default function LandingPage() {
  const { setCurrentView } = useAppStore();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 relative">
      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-radial pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8"
        >
          <Zap size={14} className="text-primary-400" />
          <span className="text-xs font-semibold tracking-widest text-primary-300 uppercase">
            AI-Powered Innovation Engine
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 font-[var(--font-display)]"
        >
          <span className="text-white">Combine Two Ideas.</span>
          <br />
          <span className="gradient-text">Create One New Invention.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          IdeaFusion uses AI to combine unrelated concepts and transform them
          into practical, innovative invention ideas.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={() => setCurrentView('workspace')}
            className="btn-primary text-base px-8 py-3.5 flex items-center gap-2 group"
          >
            Start Fusing Ideas
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => setCurrentView('explore')}
            className="btn-secondary text-base px-8 py-3.5 flex items-center gap-2"
          >
            <Compass size={18} />
            Explore Ideas
          </button>
        </motion.div>

        {/* Fusion visual */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mb-20"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            {/* Idea A */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="glass-card px-5 py-3 flex items-center gap-2"
            >
              <span className="text-2xl">☂️</span>
              <span className="font-semibold text-slate-200">Umbrella</span>
            </motion.div>

            <span className="text-2xl font-bold text-primary-400">+</span>

            {/* Idea B */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="glass-card px-5 py-3 flex items-center gap-2"
            >
              <span className="text-2xl">☀️</span>
              <span className="font-semibold text-slate-200">Solar Panel</span>
            </motion.div>
          </div>

          {/* Arrow down */}
          <div className="my-4 flex flex-col items-center">
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-px h-8 bg-gradient-to-b from-primary-500 to-accent-500"
            />
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center glow my-2">
              <Brain size={20} className="text-white" />
            </div>
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
              className="w-px h-8 bg-gradient-to-b from-accent-500 to-primary-500"
            />
          </div>

          {/* Result */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="glass-card px-6 py-4 inline-flex items-center gap-3 gradient-border"
          >
            <span className="text-2xl">⚡</span>
            <div className="text-left">
              <p className="font-bold text-white">Solar-Powered Smart Umbrella</p>
              <p className="text-xs text-slate-400">Innovation Score: 92/100</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          custom={5}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -3 }}
              className="glass-card px-4 py-5 text-center"
            >
              <stat.icon size={20} className="text-primary-400 mx-auto mb-2" />
              <p className="text-xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
