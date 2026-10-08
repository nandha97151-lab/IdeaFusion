'use client';
import { useState, useEffect } from 'react';

import { useAppStore } from '@/lib/store';
import Sidebar from '@/components/Sidebar';
import LandingPage from '@/components/LandingPage';
import Workspace from '@/components/Workspace';
import ResultPage from '@/components/ResultPage';
import ExplorePage from '@/components/ExplorePage';
import SavedIdeas from '@/components/SavedIdeas';
import CategoryBrowser from '@/components/CategoryBrowser';
import Dashboard from '@/components/Dashboard';
import DevelopmentLab from '@/components/DevelopmentLab';

export default function Home() {
  const { currentView, sidebarOpen } = useAppStore();

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <Dashboard />;
      case 'workspace':
        return <Workspace />;
      case 'result':
        return <ResultPage />;
      case 'explore':
        return <ExplorePage />;
      case 'saved':
        return <SavedIdeas />;
      case 'categories':
        return <CategoryBrowser />;
      case 'development':
        return <DevelopmentLab />;
      default:
        return <LandingPage />;
    }
  };

  const [marginLeft, setMarginLeft] = useState('0px');

  useEffect(() => {
    const updateMargin = () => {
      if (window.innerWidth >= 1024) {
        setMarginLeft(sidebarOpen ? '260px' : '72px');
      } else {
        setMarginLeft('0px');
      }
    };
    
    updateMargin();
    window.addEventListener('resize', updateMargin);
    return () => window.removeEventListener('resize', updateMargin);
  }, [sidebarOpen]);

  // If landing page, hide sidebar completely for better hero experience
  if (currentView === 'landing') {
    return (
      <main className="flex-1 w-full h-full overflow-y-auto">
        {renderView()}
      </main>
    );
  }

  return (
    <>
      <Sidebar />
      <main
        className="flex-1 h-full overflow-y-auto transition-all duration-300"
        style={{ marginLeft }}
      >
        {renderView()}
      </main>
    </>
  );
}
