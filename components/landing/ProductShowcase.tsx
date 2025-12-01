import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { clsx } from 'clsx';

export const ProductShowcase: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'pipeline' | 'tasks' | 'imports'>('pipeline');

    const tabs = [
        { id: 'pipeline', label: 'Pipeline' },
        { id: 'tasks', label: 'Tasks' },
        { id: 'imports', label: 'Imports' },
    ];

    return (
        <section className="py-24 bg-gray-50 dark:bg-gray-900/50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                    >
                        All your pipelines, tasks, and leads at a glance.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-lg text-gray-500 dark:text-gray-400"
                    >
                        Switch between views to manage every aspect of your sales process without losing context.
                    </motion.p>
                </div>

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex justify-center mb-12"
                >
                    <div className="bg-white dark:bg-gray-800 p-1 rounded-full shadow-sm border border-gray-200 dark:border-gray-700 inline-flex">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={clsx(
                                    "px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 relative",
                                    activeTab === tab.id ? "text-white" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                )}
                            >
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-gray-900 dark:bg-indigo-600 rounded-full"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Mockup Display */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="relative mx-auto max-w-5xl"
                >
                    <div className="relative rounded-xl bg-gray-900/5 dark:bg-white/5 p-2 ring-1 ring-inset ring-gray-900/10 dark:ring-white/10 lg:rounded-2xl lg:p-4 backdrop-blur-sm">
                        <div className="rounded-md bg-white dark:bg-gray-900 shadow-2xl ring-1 ring-gray-900/10 dark:ring-white/10 overflow-hidden aspect-[16/10] relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0 bg-gray-50 dark:bg-gray-900 p-8 flex flex-col"
                                >
                                    {/* Mock UI Content based on Tab */}
                                    {activeTab === 'pipeline' && (
                                        <div className="flex gap-4 h-full">
                                            {[
                                                { name: 'Lead In', color: 'bg-blue-500' },
                                                { name: 'Contact Made', color: 'bg-yellow-500' },
                                                { name: 'Proposal Sent', color: 'bg-purple-500' }
                                            ].map((col, i) => (
                                                <div key={i} className="flex-1 bg-gray-100 dark:bg-gray-800/50 rounded-lg p-4 flex flex-col gap-3">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">{col.name}</span>
                                                        <span className="text-xs text-gray-400">3</span>
                                                    </div>
                                                    <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                        <div className={`h-full w-full ${col.color}`}></div>
                                                    </div>
                                                    {/* Cards */}
                                                    <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700 shadow-sm">
                                                        <div className="h-2 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                                                        <div className="h-3 w-3/4 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
                                                        <div className="flex justify-between items-center">
                                                            <div className="h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                                            <div className="h-2 w-12 bg-gray-100 dark:bg-gray-800 rounded"></div>
                                                        </div>
                                                    </div>
                                                    <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-700 shadow-sm">
                                                        <div className="h-2 w-16 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                                                        <div className="h-3 w-2/3 bg-gray-300 dark:bg-gray-600 rounded mb-3"></div>
                                                        <div className="flex justify-between items-center">
                                                            <div className="h-5 w-5 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                                            <div className="h-2 w-12 bg-gray-100 dark:bg-gray-800 rounded"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {activeTab === 'tasks' && (
                                        <div className="flex flex-col gap-3 h-full overflow-hidden">
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <div key={i} className="flex items-center gap-4 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
                                                    <div className="w-5 h-5 rounded border border-gray-300 dark:border-gray-600"></div>
                                                    <div className="flex-1">
                                                        <div className="h-3 w-1/3 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                                                        <div className="h-2 w-1/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                                    </div>
                                                    <div className="h-6 w-20 bg-gray-100 dark:bg-gray-700 rounded-full"></div>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {activeTab === 'imports' && (
                                        <div className="flex flex-col h-full items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/30">
                                            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-4">
                                                <svg className="w-8 h-8 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                            </div>
                                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Upload CSV File</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Drag and drop your leads here</p>
                                            <div className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                <div className="h-full w-2/3 bg-indigo-500 rounded-full"></div>
                                            </div>
                                            <div className="mt-2 text-xs text-gray-500">Importing... 67%</div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
