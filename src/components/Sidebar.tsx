'use client';

import { motion } from 'framer-motion';
import {
  LayoutDashboard, Sparkles, Compass, BookmarkCheck, Grid3X3,
  FlaskConical, History, Settings, User, ChevronLeft, Zap, Menu, X
} from 'lucide-react';
import { useAppStore, ViewMode } from '@/lib/store';

const navItems: { icon: React.ElementType; label: string; view: ViewMode }[] = [
  { icon: LayoutDashboard, label: 'Dashboard', view: 'dashboard' },
  { icon: Sparkles, label: 'Create Fusion', view: 'workspace' },
  { icon: Compass, label: 'Explore Ideas', view: 'explore' },
  { icon: BookmarkCheck, label: 'Saved Ideas', view: 'saved' },
  { icon: Grid3X3, label: 'Categories', view: 'categories' },
  { icon: FlaskConical, label: 'Development Lab', view: 'development' },
];

export default function Sidebar() {
  const { currentView, setCurrentView, sidebarOpen, toggleSidebar } = useAppStore();

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Mobile hamburger */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 lg:hidden glass p-2 rounded-xl"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: sidebarOpen ? 260 : 72,
          x: 0,
        }}
        className={`
          fixed left-0 top-0 h-full z-40
          glass flex flex-col
          transition-all duration-300
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{ borderRight: '1px solid rgba(99, 102, 241, 0.1)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center flex-shrink-0">
            <Zap size={18} className="text-white" />
          </div>
          {sidebarOpen && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-bold gradient-text font-[var(--font-display)]"
            >
              IdeaFusion
            </motion.span>
          )}
          <button
            onClick={toggleSidebar}
            className="ml-auto hidden lg:flex items-center justify-center w-7 h-7 rounded-lg hover:bg-white/5 transition-colors"
          >
            <ChevronLeft
              size={16}
              className={`transition-transform duration-300 ${!sidebarOpen ? 'rotate-180' : ''}`}
            />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => {
                  setCurrentView(item.view);
                  if (window.innerWidth < 1024) toggleSidebar();
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                  transition-all duration-200 group relative
                  ${isActive
                    ? 'bg-gradient-to-r from-primary-500/20 to-accent-500/10 text-white'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-primary-400 to-accent-400 rounded-r-full"
                  />
                )}
                <item.icon size={20} className="flex-shrink-0" />
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm font-medium whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom section */}
        <div className="px-3 py-4 border-t border-white/5 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all">
            <Settings size={20} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Settings</span>}
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all">
            <User size={20} className="flex-shrink-0" />
            {sidebarOpen && <span className="text-sm font-medium">Profile</span>}
          </button>
        </div>
      </motion.aside>
    </>
  );
}
