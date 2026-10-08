'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shuffle, ArrowLeftRight, Trash2, Zap, Dice5, Target,
  Lightbulb, ChevronDown
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { generateFusion, getRandomIdeas, getIdeaSuggestions } from '@/lib/ai-service';
import FusionAnimation from './FusionAnimation';

const TARGET_AREAS = [
  'Healthcare', 'Education', 'Agriculture', 'Transportation',
  'Environment', 'Smart Cities', 'Energy', 'Finance',
  'Consumer Tech', 'Space', 'Cybersecurity', 'Accessibility'
];

export default function Workspace() {
  const {
    ideaA, ideaB, targetArea,
    setIdeaA, setIdeaB, setTargetArea,
    swapIdeas, clearInputs,
    isProcessing, setIsProcessing, processingStep, setProcessingStep,
    setCurrentResult, setCurrentView,
    addToHistory, incrementFusions,
  } = useAppStore();

  const [showSuggestionsA, setShowSuggestionsA] = useState(false);
  const [showSuggestionsB, setShowSuggestionsB] = useState(false);
  const [showTargetDropdown, setShowTargetDropdown] = useState(false);
  const [error, setError] = useState('');

  const suggestions = getIdeaSuggestions();

  const handleRandomize = useCallback((which: 'A' | 'B' | 'both') => {
    const random = getRandomIdeas();
    if (which === 'A' || which === 'both') setIdeaA(random.ideaA);
    if (which === 'B' || which === 'both') setIdeaB(random.ideaB);
  }, [setIdeaA, setIdeaB]);

  const handleFuse = useCallback(async () => {
    if (!ideaA.trim() || !ideaB.trim()) {
      setError('Please enter two ideas to start the fusion.');
      setTimeout(() => setError(''), 3000);
      return;
    }

    setError('');
    setIsProcessing(true);

    // Animate through steps
    const steps = [1, 2, 3, 4, 5, 6];
    for (const step of steps) {
      setProcessingStep(step);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    try {
      const result = await generateFusion({ ideaA: ideaA.trim(), ideaB: ideaB.trim(), targetArea: targetArea.trim() || undefined });
      setCurrentResult(result);
      addToHistory(result);
      incrementFusions();
      setCurrentView('result');
    } catch {
      setError("We couldn't generate the fusion right now. Please try again.");
    } finally {
      setIsProcessing(false);
      setProcessingStep(0);
    }
  }, [ideaA, ideaB, targetArea, setIsProcessing, setProcessingStep, setCurrentResult, addToHistory, incrementFusions, setCurrentView, setError]);

  const filteredSuggestionsA = suggestions.filter(s =>
    s.toLowerCase().includes(ideaA.toLowerCase()) && s.toLowerCase() !== ideaA.toLowerCase()
  ).slice(0, 6);

  const filteredSuggestionsB = suggestions.filter(s =>
    s.toLowerCase().includes(ideaB.toLowerCase()) && s.toLowerCase() !== ideaB.toLowerCase()
  ).slice(0, 6);

  if (isProcessing) {
    return <FusionAnimation step={processingStep} ideaA={ideaA} ideaB={ideaB} />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 font-[var(--font-display)]">
          Create Your Next <span className="gradient-text">Invention</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Enter two unrelated ideas and let AI create something revolutionary.
        </p>
      </motion.div>

      {/* Input cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Idea A */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-6 relative"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-primary-500/20 flex items-center justify-center">
              <Lightbulb size={16} className="text-primary-400" />
            </div>
            <span className="text-sm font-semibold text-primary-300 uppercase tracking-wider">Idea A</span>
            <button
              onClick={() => handleRandomize('A')}
              className="ml-auto p-1.5 rounded-lg hover:bg-white/5 transition-colors text-slate-500 hover:text-primary-400"
              title="Randomize"
            >
              <Dice5 size={16} />
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              value={ideaA}
              onChange={(e) => { setIdeaA(e.target.value); setShowSuggestionsA(true); }}
              onFocus={() => setShowSuggestionsA(true)}
              onBlur={() => setTimeout(() => setShowSuggestionsA(false), 200)}
              placeholder="Enter an idea, product, technology or problem…"
              className="input-field"
            />
            <AnimatePresence>
              {showSuggestionsA && ideaA && filteredSuggestionsA.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute top-full left-0 right-0 mt-2 glass rounded-xl overflow-hidden z-10"
                >
                  {filteredSuggestionsA.map((s) => (
                    <button
                      key={s}
                      onMouseDown={() => { setIdeaA(s); setShowSuggestionsA(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {['Bicycle', 'Drone', 'Solar Energy'].map((s) => (
              <button
                key={s}
                onClick={() => setIdeaA(s)}
                className="text-xs px-3 py-1 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-primary-500/20 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Idea B */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-6 relative"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-accent-500/20 flex items-center justify-center">
              <Lightbulb size={16} className="text-accent-400" />
            </div>
            <span className="text-sm font-semibold text-accent-300 uppercase tracking-wider">Idea B</span>
            <button
              onClick={() => handleRandomize('B')}
              className="ml-auto p-1.5 rounded-lg hover:bg-white/5 transition-colors text-slate-500 hover:text-accent-400"
              title="Randomize"
            >
              <Dice5 size={16} />
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              value={ideaB}
              onChange={(e) => { setIdeaB(e.target.value); setShowSuggestionsB(true); }}
              onFocus={() => setShowSuggestionsB(true)}
              onBlur={() => setTimeout(() => setShowSuggestionsB(false), 200)}
              placeholder="Enter another unrelated idea…"
              className="input-field"
            />
            <AnimatePresence>
              {showSuggestionsB && ideaB && filteredSuggestionsB.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute top-full left-0 right-0 mt-2 glass rounded-xl overflow-hidden z-10"
                >
                  {filteredSuggestionsB.map((s) => (
                    <button
                      key={s}
                      onMouseDown={() => { setIdeaB(s); setShowSuggestionsB(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {['AI', 'Robotics', 'Healthcare'].map((s) => (
              <button
                key={s}
                onClick={() => setIdeaB(s)}
                className="text-xs px-3 py-1 rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-accent-500/20 transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Swap & actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-center gap-3 mb-6"
      >
        <button onClick={swapIdeas} className="btn-secondary text-sm px-4 py-2 flex items-center gap-2">
          <ArrowLeftRight size={14} /> Swap
        </button>
        <button onClick={() => handleRandomize('both')} className="btn-secondary text-sm px-4 py-2 flex items-center gap-2">
          <Shuffle size={14} /> Surprise Me
        </button>
        <button onClick={clearInputs} className="btn-secondary text-sm px-4 py-2 flex items-center gap-2">
          <Trash2 size={14} /> Clear
        </button>
      </motion.div>

      {/* Target area */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card p-5 mb-8 max-w-lg mx-auto"
      >
        <div className="flex items-center gap-2 mb-3">
          <Target size={16} className="text-slate-400" />
          <span className="text-sm text-slate-400">Problem / Target Area (Optional)</span>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowTargetDropdown(!showTargetDropdown)}
            className="input-field flex items-center justify-between"
          >
            <span className={targetArea ? 'text-white' : 'text-slate-500'}>
              {targetArea || 'Select a target area…'}
            </span>
            <ChevronDown size={16} className={`transition-transform ${showTargetDropdown ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {showTargetDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute top-full left-0 right-0 mt-2 glass rounded-xl overflow-hidden z-10 max-h-48 overflow-y-auto"
              >
                <button
                  onClick={() => { setTargetArea(''); setShowTargetDropdown(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-slate-500 hover:bg-white/5 transition-colors"
                >
                  None
                </button>
                {TARGET_AREAS.map((area) => (
                  <button
                    key={area}
                    onClick={() => { setTargetArea(area); setShowTargetDropdown(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-white/5 transition-colors ${targetArea === area ? 'text-primary-400' : 'text-slate-300 hover:text-white'}`}
                  >
                    {area}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="max-w-lg mx-auto mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fuse button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <button
          onClick={handleFuse}
          className="btn-primary text-lg px-12 py-4 flex items-center gap-3 mx-auto group"
        >
          <Zap size={22} className="group-hover:rotate-12 transition-transform" />
          FUSE IDEAS
        </button>
      </motion.div>
    </div>
  );
}
