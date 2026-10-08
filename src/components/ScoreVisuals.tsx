'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ScoreRingProps {
  value: number;
  label: string;
  size?: number;
  strokeWidth?: number;
  delay?: number;
  color?: string;
}

export function ScoreRing({ value, label, size = 100, strokeWidth = 6, delay = 0, color }: ScoreRingProps) {
  const [animated, setAnimated] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (animated / 100) * circumference;

  const gradientColor = color || (value >= 90 ? '#10b981' : value >= 80 ? '#6366f1' : value >= 70 ? '#f59e0b' : '#ef4444');

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimated((prev) => {
          if (prev >= value) {
            clearInterval(interval);
            return value;
          }
          return prev + 1;
        });
      }, 15);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={gradientColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 6px ${gradientColor}40)` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-lg font-bold text-white">{animated}%</span>
        </div>
      </div>
      <span className="text-xs text-slate-400 mt-2 text-center">{label}</span>
    </div>
  );
}

interface ScoreBarProps {
  value: number;
  label: string;
  delay?: number;
}

export function ScoreBar({ value, label, delay = 0 }: ScoreBarProps) {
  const [animated, setAnimated] = useState(0);

  const barColor = value >= 90 ? 'from-emerald-500 to-emerald-400'
    : value >= 80 ? 'from-primary-500 to-primary-400'
    : value >= 70 ? 'from-amber-500 to-amber-400'
    : 'from-red-500 to-red-400';

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimated((prev) => {
          if (prev >= value) {
            clearInterval(interval);
            return value;
          }
          return prev + 1;
        });
      }, 15);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm text-slate-300">{label}</span>
        <span className="text-sm font-semibold text-white">{animated}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${animated}%` }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${barColor}`}
        />
      </div>
    </div>
  );
}

interface OverallScoreProps {
  score: number;
  delay?: number;
}

export function OverallScore({ score, delay = 0 }: OverallScoreProps) {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setAnimated((prev) => {
          if (prev >= score) {
            clearInterval(interval);
            return score;
          }
          return prev + 1;
        });
      }, 20);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [score, delay]);

  return (
    <div className="text-center">
      <div className="relative inline-block">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay, type: 'spring', stiffness: 200 }}
          className="w-28 h-28 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center glow"
        >
          <div className="w-24 h-24 rounded-full bg-surface-900 flex items-center justify-center">
            <div className="text-center">
              <span className="text-3xl font-bold gradient-text">{animated}</span>
              <span className="text-sm text-slate-400">/100</span>
            </div>
          </div>
        </motion.div>
      </div>
      <p className="text-sm font-medium text-slate-300 mt-3">Overall Innovation Score</p>
    </div>
  );
}
