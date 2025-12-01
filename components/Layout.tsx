import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  KanbanSquare, 
  Users, 
  CreditCard, 
  Settings, 
  Search, 
  Bell,
  Menu,
  Moon,
  Sun
} from 'lucide-react';
import { GlassCard } from './GlassUI';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activePage, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains('dark')) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'pipeline', label: 'Pipeline', icon: KanbanSquare },
    { id: 'lists', label: 'Lists', icon: Users },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-[#F9FAFB] dark:bg-gray-950">
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:relative z-20 w-64 h-full 
        transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        transition-transform duration-300 ease-in-out
        border-r border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50
      `}>
        <div className="p-5 flex items-center gap-3 mb-2">
          <div className="w-6 h-6 rounded bg-gray-900 dark:bg-white flex items-center justify-center text-white dark:text-gray-900 text-xs font-bold">L</div>
          <span className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white">Lumina</span>
        </div>

        <nav className="px-3 space-y-0.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                ${activePage === item.id 
                  ? 'bg-gray-200/60 dark:bg-gray-800 text-gray-900 dark:text-white' 
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-gray-200'}
              `}
            >
              <item.icon size={16} strokeWidth={2} className={activePage === item.id ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-4 left-0 w-full px-3">
          <div className="p-2 flex items-center gap-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded bg-gray-200 dark:bg-gray-700 overflow-hidden">
               <img src="https://picsum.photos/40/40" alt="Profile" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">John Doe</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">Workspace Admin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10 h-full overflow-hidden bg-white dark:bg-gray-950">
        {/* Top Header */}
        <header className="h-14 flex items-center justify-between px-6 lg:px-8 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden text-gray-500 dark:text-gray-400"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={20} />
            </button>
            <h1 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              {/* Breadcrumb style title */}
              <span className="text-gray-400 font-normal">App / </span>
              <span className="capitalize">{activePage}</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
             {/* Search Bar */}
             <div className="hidden md:flex items-center relative group">
              <Search className="absolute left-2.5 text-gray-400 w-3.5 h-3.5" />
              <input 
                type="text" 
                placeholder="Search" 
                className="pl-8 pr-4 py-1.5 w-64 bg-gray-50 dark:bg-gray-900 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 focus:bg-white dark:focus:bg-gray-900 border focus:border-gray-300 dark:focus:border-gray-600 rounded-md text-xs transition-all outline-none"
              />
            </div>
            
            <div className="h-4 w-px bg-gray-200 dark:bg-gray-800 mx-1"></div>

            <button 
              onClick={toggleTheme}
              className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            
            <button className="relative p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-white transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
              <Bell size={16} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-950"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-[#F9FAFB] dark:bg-gray-950 p-6 lg:p-8 scroll-smooth">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-10 bg-gray-900/20 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};