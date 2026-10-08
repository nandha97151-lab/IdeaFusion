'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Brain, Lightbulb, Zap, Rocket, Activity, Globe, Leaf, Cpu, Database, Microscope, Shield, Lock, ActivitySquare, HeartPulse, Stethoscope } from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { CATEGORIES } from '@/lib/ai-service';

// Icons for categories
const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'Smart Consumer Technology': Lightbulb,
  'Healthcare Innovation': HeartPulse,
  'Agricultural Technology': Leaf,
  'Educational Technology': Brain,
  'Environmental Solutions': Globe,
  'Transportation & Mobility': Rocket,
  'Smart Cities': Activity,
  'Energy Innovation': Zap,
  'Financial Technology': Database,
  'Space Technology': Rocket,
  'Cybersecurity': Shield,
  'Accessibility Solutions': ActivitySquare,
  'Robotics & Automation': Cpu,
  'AI & Machine Learning': Sparkles,
};

export default function CategoryBrowser() {
  const { setCurrentView, setTargetArea } = useAppStore();
  const [hoveredCat, setHoveredCat] = useState<string | null>(null);

  const handleSelectCategory = (cat: string) => {
    setTargetArea(cat);
    setCurrentView('workspace');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 text-center"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 font-[var(--font-display)]">
          Innovation <span className="gradient-text">Categories</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
          Explore different domains and start fusing ideas to solve specific industry problems.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {CATEGORIES.map((cat, i) => {
          const Icon = CATEGORY_ICONS[cat] || Lightbulb;
          const isHovered = hoveredCat === cat;

          return (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onHoverStart={() => setHoveredCat(cat)}
              onHoverEnd={() => setHoveredCat(null)}
              onClick={() => handleSelectCategory(cat)}
              className="glass-card p-6 cursor-pointer group relative overflow-hidden h-full flex flex-col"
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4 text-primary-400 group-hover:scale-110 group-hover:bg-primary-500/20 transition-all duration-300">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary-300 transition-colors">
                  {cat}
                </h3>
                <p className="text-xs text-slate-400 mb-6 flex-grow">
                  Generate novel solutions and products tailored for the {cat.toLowerCase()} sector.
                </p>
                <div className="flex items-center text-sm font-medium text-primary-400 mt-auto">
                  <span>Start Creating</span>
                  <ArrowRight size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Hover effect background */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute -right-12 -bottom-12 w-48 h-48 bg-primary-500/10 rounded-full blur-3xl z-0 pointer-events-none"
                  />
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
