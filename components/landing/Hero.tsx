import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../GlassUI';
import { Play, ArrowRight, Check } from 'lucide-react';

interface HeroProps {
    onOpenAuth: (isLogin: boolean) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenAuth }) => {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 backdrop-blur-sm mb-8"
                    >
                        <span className="flex h-2 w-2 rounded-full bg-indigo-500"></span>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">New: AI Pipeline Assistant</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1] mb-8"
                    >
                        Organize pipelines, tasks, and leads in a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">beautiful CRM.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto"
                    >
                        Lumina is the lightweight CRM for founders and sales teams who care about design. Track pipelines, manage tasks, and import leads in seconds.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Button
                            size="lg"
                            onClick={() => onOpenAuth(false)}
                            className="rounded-full px-8 h-12 text-base shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all"
                        >
                            Start for free <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="rounded-full px-8 h-12 text-base backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 border-gray-200/50 dark:border-gray-700/50"
                        >
                            <Play className="mr-2 w-4 h-4 fill-current" /> Watch demo
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-400"
                    >
                        <span className="flex items-center gap-2"><Check size={16} className="text-indigo-600 dark:text-indigo-400" /> No credit card required</span>
                        <span className="flex items-center gap-2"><Check size={16} className="text-indigo-600 dark:text-indigo-400" /> 14-day free trial</span>
                    </motion.div>
                </div>

                {/* Product Mockup */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 50 }}
                    className="relative mx-auto max-w-5xl"
                >
                    <div className="relative rounded-xl bg-gray-900/5 dark:bg-white/5 p-2 ring-1 ring-inset ring-gray-900/10 dark:ring-white/10 lg:rounded-2xl lg:p-4 backdrop-blur-sm">
                        <div className="rounded-md bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-gray-900/10 dark:ring-white/10 overflow-hidden aspect-[16/9] flex items-center justify-center relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col">
                                {/* Mock Window Header */}
                                <div className="h-8 border-b border-gray-200 dark:border-gray-800 flex items-center px-4 gap-2 bg-white dark:bg-gray-900">
                                    <div className="flex gap-1.5">
                                        <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-amber-400/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-emerald-400/80"></div>
                                    </div>
                                    <div className="ml-4 flex gap-4 text-[10px] font-medium text-gray-400">
                                        <span className="text-gray-900 dark:text-white">Pipeline</span>
                                        <span>Tasks</span>
                                        <span>Reports</span>
                                    </div>
                                </div>

                                {/* Mock Body */}
                                <div className="flex-1 p-6 flex gap-6 overflow-hidden">
                                    {/* Sidebar */}
                                    <div className="w-48 hidden md:flex flex-col gap-4 opacity-100">
                                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white mb-2">
                                            <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center text-white text-xs">L</div>
                                            Lumina
                                        </div>
                                        <div className="space-y-1">
                                            <div className="h-8 bg-gray-200/50 dark:bg-gray-800/50 rounded-md w-full flex items-center px-3 text-xs font-medium text-gray-900 dark:text-white">
                                                Dashboard
                                            </div>
                                            <div className="h-8 bg-white dark:bg-gray-800 shadow-sm ring-1 ring-gray-200 dark:ring-gray-700 rounded-md w-full flex items-center px-3 text-xs font-medium text-indigo-600 dark:text-indigo-400 justify-between">
                                                Pipeline <span className="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded text-[10px]">12</span>
                                            </div>
                                            <div className="h-8 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-md w-full flex items-center px-3 text-xs font-medium text-gray-500 dark:text-gray-400">
                                                Tasks
                                            </div>
                                            <div className="h-8 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded-md w-full flex items-center px-3 text-xs font-medium text-gray-500 dark:text-gray-400">
                                                Contacts
                                            </div>
                                        </div>

                                        <div className="mt-auto space-y-2">
                                            <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Team</div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-[10px] font-bold">JD</div>
                                                <div className="text-xs text-gray-600 dark:text-gray-400">John Doe</div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[10px] font-bold">AS</div>
                                                <div className="text-xs text-gray-600 dark:text-gray-400">Alice Smith</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Main Content - Kanban Board Mockup */}
                                    <div className="flex-1 flex gap-4 overflow-hidden">
                                        {/* Column 1: Lead In */}
                                        <div className="flex-1 min-w-[200px] flex flex-col gap-3">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-blue-500"></span> Lead In
                                                </span>
                                                <span className="text-[10px] text-gray-400">3</span>
                                            </div>

                                            {/* Card 1 */}
                                            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-3 flex flex-col gap-2 group hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                                                <div className="flex justify-between items-start">
                                                    <span className="text-xs font-medium text-gray-900 dark:text-white">Acme Corp</span>
                                                    <span className="text-[10px] text-gray-400">2d</span>
                                                </div>
                                                <div className="text-[10px] text-gray-500">Enterprise License</div>
                                                <div className="flex items-center justify-between mt-1">
                                                    <span className="text-xs font-semibold text-gray-900 dark:text-white">$24,000</span>
                                                    <div className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center text-[8px] font-bold">JD</div>
                                                </div>
                                            </div>

                                            {/* Card 2 */}
                                            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-3 flex flex-col gap-2 group hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                                                <div className="flex justify-between items-start">
                                                    <span className="text-xs font-medium text-gray-900 dark:text-white">Global Tech</span>
                                                    <span className="text-[10px] text-gray-400">4h</span>
                                                </div>
                                                <div className="text-[10px] text-gray-500">Q4 Expansion</div>
                                                <div className="flex gap-1 flex-wrap">
                                                    <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-600 text-[8px] font-medium">Hot</span>
                                                    <span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-600 text-[8px] font-medium">SaaS</span>
                                                </div>
                                                <div className="flex items-center justify-between mt-1">
                                                    <span className="text-xs font-semibold text-gray-900 dark:text-white">$12,500</span>
                                                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[8px] font-bold">AS</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Column 2: Contact Made */}
                                        <div className="flex-1 min-w-[200px] flex flex-col gap-3">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-amber-500"></span> Contact Made
                                                </span>
                                                <span className="text-[10px] text-gray-400">2</span>
                                            </div>

                                            {/* Card 3 */}
                                            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-3 flex flex-col gap-2 group hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                                                <div className="flex justify-between items-start">
                                                    <span className="text-xs font-medium text-gray-900 dark:text-white">Stark Ind</span>
                                                    <span className="text-[10px] text-gray-400">1d</span>
                                                </div>
                                                <div className="text-[10px] text-gray-500">Security Audit</div>
                                                <div className="flex items-center justify-between mt-1">
                                                    <span className="text-xs font-semibold text-gray-900 dark:text-white">$8,000</span>
                                                    <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[8px] font-bold">MK</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Column 3: Proposal Sent */}
                                        <div className="flex-1 min-w-[200px] flex flex-col gap-3">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                                                    <span className="w-2 h-2 rounded-full bg-purple-500"></span> Proposal
                                                </span>
                                                <span className="text-[10px] text-gray-400">4</span>
                                            </div>

                                            {/* Card 4 */}
                                            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-3 flex flex-col gap-2 group hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                                                <div className="flex justify-between items-start">
                                                    <span className="text-xs font-medium text-gray-900 dark:text-white">Wayne Ent</span>
                                                    <span className="text-[10px] text-gray-400">5h</span>
                                                </div>
                                                <div className="text-[10px] text-gray-500">Annual Contract</div>
                                                <div className="flex gap-1 flex-wrap">
                                                    <span className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-600 text-[8px] font-medium">Priority</span>
                                                </div>
                                                <div className="flex items-center justify-between mt-1">
                                                    <span className="text-xs font-semibold text-gray-900 dark:text-white">$45,000</span>
                                                    <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-[8px] font-bold">BW</div>
                                                </div>
                                            </div>

                                            {/* Card 5 - Faded to imply scroll */}
                                            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm p-3 flex flex-col gap-2 opacity-50">
                                                <div className="flex justify-between items-start">
                                                    <span className="text-xs font-medium text-gray-900 dark:text-white">Cyberdyne</span>
                                                </div>
                                                <div className="h-2 w-1/2 bg-gray-100 dark:bg-gray-700 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Elements for "Alive" feel */}
                                <motion.div
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute top-1/4 right-1/4 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 z-10 hidden md:block"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                            <Check size={16} />
                                        </div>
                                        <div>
                                            <div className="text-xs font-semibold text-gray-900 dark:text-white">Deal Closed</div>
                                            <div className="text-[10px] text-gray-500">$12,500 revenue</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Background Glow */}
                    <div className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] -z-10"></div>
                    <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-violet-500/20 rounded-full blur-[100px] -z-10"></div>
                </motion.div>
            </div>
        </section >
    );
};
