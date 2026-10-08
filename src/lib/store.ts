// IdeaFusion Store - Zustand state management
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FusionResult } from './ai-service';

export type ViewMode = 'landing' | 'workspace' | 'result' | 'explore' | 'saved' | 'dashboard' | 'categories' | 'development';

interface AppState {
  // Navigation
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;

  // Fusion inputs
  ideaA: string;
  ideaB: string;
  targetArea: string;
  setIdeaA: (v: string) => void;
  setIdeaB: (v: string) => void;
  setTargetArea: (v: string) => void;
  swapIdeas: () => void;
  clearInputs: () => void;

  // Processing
  isProcessing: boolean;
  processingStep: number;
  setIsProcessing: (v: boolean) => void;
  setProcessingStep: (v: number) => void;

  // Results
  currentResult: FusionResult | null;
  setCurrentResult: (r: FusionResult | null) => void;

  // Saved ideas
  savedIdeas: FusionResult[];
  addSavedIdea: (idea: FusionResult) => void;
  removeSavedIdea: (id: string) => void;
  toggleFavorite: (id: string) => void;
  updateIdeaStatus: (id: string, status: FusionResult['status']) => void;

  // History
  fusionHistory: FusionResult[];
  addToHistory: (result: FusionResult) => void;
  clearHistory: () => void;

  // Stats
  totalFusions: number;
  incrementFusions: () => void;

  // Sidebar
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;
  toggleSidebar: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Navigation
      currentView: 'landing',
      setCurrentView: (view) => set({ currentView: view }),

      // Fusion inputs
      ideaA: '',
      ideaB: '',
      targetArea: '',
      setIdeaA: (v) => set({ ideaA: v }),
      setIdeaB: (v) => set({ ideaB: v }),
      setTargetArea: (v) => set({ targetArea: v }),
      swapIdeas: () => set((s) => ({ ideaA: s.ideaB, ideaB: s.ideaA })),
      clearInputs: () => set({ ideaA: '', ideaB: '', targetArea: '' }),

      // Processing
      isProcessing: false,
      processingStep: 0,
      setIsProcessing: (v) => set({ isProcessing: v }),
      setProcessingStep: (v) => set({ processingStep: v }),

      // Results
      currentResult: null,
      setCurrentResult: (r) => set({ currentResult: r }),

      // Saved ideas
      savedIdeas: [],
      addSavedIdea: (idea) => set((s) => {
        if (s.savedIdeas.find((i) => i.id === idea.id)) return s;
        return { savedIdeas: [...s.savedIdeas, idea] };
      }),
      removeSavedIdea: (id) => set((s) => ({
        savedIdeas: s.savedIdeas.filter((i) => i.id !== id),
      })),
      toggleFavorite: (id) => set((s) => ({
        savedIdeas: s.savedIdeas.map((i) =>
          i.id === id ? { ...i, favorite: !i.favorite } : i
        ),
        currentResult: s.currentResult?.id === id
          ? { ...s.currentResult, favorite: !s.currentResult.favorite }
          : s.currentResult,
      })),
      updateIdeaStatus: (id, status) => set((s) => ({
        savedIdeas: s.savedIdeas.map((i) =>
          i.id === id ? { ...i, status } : i
        ),
      })),

      // History
      fusionHistory: [],
      addToHistory: (result) => set((s) => ({
        fusionHistory: [result, ...s.fusionHistory].slice(0, 50),
      })),
      clearHistory: () => set({ fusionHistory: [] }),

      // Stats
      totalFusions: 0,
      incrementFusions: () => set((s) => ({ totalFusions: s.totalFusions + 1 })),

      // Sidebar
      sidebarOpen: true,
      setSidebarOpen: (v) => set({ sidebarOpen: v }),
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
    }),
    {
      name: 'ideafusion-storage',
      partialize: (state) => ({
        savedIdeas: state.savedIdeas,
        fusionHistory: state.fusionHistory,
        totalFusions: state.totalFusions,
      }),
    }
  )
);
