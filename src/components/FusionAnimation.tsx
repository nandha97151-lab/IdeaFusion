'use client';

import { motion } from 'framer-motion';
import { Brain, Search, Cpu, Sparkles, CheckCircle, Loader2 } from 'lucide-react';

const STEPS = [
  { label: 'Understanding Idea A…', icon: Search },
  { label: 'Understanding Idea B…', icon: Search },
  { label: 'Finding Hidden Connections…', icon: Brain },
  { label: 'Generating Innovation…', icon: Sparkles },
  { label: 'Evaluating Feasibility…', icon: Cpu },
  { label: 'Creating Final Concept…', icon: CheckCircle },
];

interface FusionAnimationProps {
  step: number;
  ideaA: string;
  ideaB: string;
}

export default function FusionAnimation({ step, ideaA, ideaB }: FusionAnimationProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[60vh]">
      {/* Fusion visual */}
      <div className="flex items-center gap-4 mb-12">
        <motion.div
          animate={{ scale: [1, 0.95, 1], opacity: [1, 0.8, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="glass-card px-4 py-2.5"
        >
          <span className="text-sm font-medium text-primary-300">{ideaA}</span>
        </motion.div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center glow"
        >
          <Brain size={20} className="text-white" />
        </motion.div>

        <motion.div
          animate={{ scale: [1, 0.95, 1], opacity: [1, 0.8, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          className="glass-card px-4 py-2.5"
        >
          <span className="text-sm font-medium text-accent-300">{ideaB}</span>
        </motion.div>
      </div>

      {/* Steps */}
      <div className="w-full max-w-md space-y-3">
        {STEPS.map((s, i) => {
          const stepNum = i + 1;
          const isActive = step === stepNum;
          const isDone = step > stepNum;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{
                opacity: stepNum <= step ? 1 : 0.3,
                x: 0,
              }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                ${isActive ? 'glass gradient-border' : isDone ? 'bg-white/[0.02]' : 'bg-transparent'}
              `}
            >
              <div className={`
                w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                ${isDone ? 'bg-green-500/20' : isActive ? 'bg-primary-500/20' : 'bg-white/5'}
              `}>
                {isDone ? (
                  <CheckCircle size={16} className="text-green-400" />
                ) : isActive ? (
                  <Loader2 size={16} className="text-primary-400 animate-spin" />
                ) : (
                  <s.icon size={16} className="text-slate-600" />
                )}
              </div>
              <span className={`text-sm font-medium ${isDone ? 'text-green-400' : isActive ? 'text-white' : 'text-slate-600'}`}>
                {s.label}
              </span>
              {isActive && (
                <motion.div
                  className="ml-auto flex gap-1"
                >
                  {[0, 1, 2].map((d) => (
                    <motion.div
                      key={d}
                      animate={{ opacity: [0.2, 1, 0.2] }}
                      transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                      className="w-1.5 h-1.5 rounded-full bg-primary-400"
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md mt-8">
        <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            animate={{ width: `${(step / 6) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
          />
        </div>
        <p className="text-xs text-slate-500 text-center mt-2">
          Step {step} of 6
        </p>
      </div>
    </div>
  );
}
