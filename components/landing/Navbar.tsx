import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '../GlassUI';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';

interface NavbarProps {
    onOpenAuth: (isLogin: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <motion.nav
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl rounded-full border border-gray-200/50 dark:border-white/10 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-lg transition-all duration-300 px-2 py-2"
            initial={{ y: -100, x: "-50%" }}
            animate={{ y: 0, x: "-50%" }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative max-w-7xl mx-auto w-full px-6 lg:px-8 flex items-center justify-between">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 flex items-center justify-center text-white dark:text-gray-900 text-sm font-bold shadow-lg">L</div>
                    <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">Lumina</span>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-400">
                    <a href="#features" className="hover:text-gray-900 dark:hover:text-white transition-colors">Features</a>
                    <a href="#workflow" className="hover:text-gray-900 dark:hover:text-white transition-colors">Workflow</a>
                    <a href="#pricing" className="hover:text-gray-900 dark:hover:text-white transition-colors">Pricing</a>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <button
                        onClick={() => onOpenAuth(true)}
                        className="text-sm font-medium text-gray-900 dark:text-white hover:opacity-70 transition-opacity"
                    >
                        Log in
                    </button>
                    <Button
                        size="sm"
                        onClick={() => onOpenAuth(false)}
                        className="rounded-full px-6"
                    >
                        Get Started
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-gray-900 dark:text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800 p-6 flex flex-col gap-4 shadow-xl md:hidden">
                    <a href="#features" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" onClick={() => setMobileMenuOpen(false)}>Features</a>
                    <a href="#workflow" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" onClick={() => setMobileMenuOpen(false)}>Workflow</a>
                    <a href="#pricing" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
                    <div className="h-px bg-gray-100 dark:bg-gray-800 my-2"></div>
                    <button
                        onClick={() => { onOpenAuth(true); setMobileMenuOpen(false); }}
                        className="text-sm font-medium text-gray-900 dark:text-white text-left"
                    >
                        Log in
                    </button>
                    <Button
                        size="sm"
                        onClick={() => { onOpenAuth(false); setMobileMenuOpen(false); }}
                        className="w-full justify-center"
                    >
                        Get Started
                    </Button>
                </div>
            )}
        </motion.nav>
    );
};
