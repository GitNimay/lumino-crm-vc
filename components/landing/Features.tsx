import React from 'react';
import { GlassCard } from '../GlassUI';
import { KanbanSquare, BarChart3, Users, Upload, CheckCircle2, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const Features: React.FC = () => {
    const features = [
        {
            icon: <KanbanSquare className="text-indigo-600 dark:text-indigo-400" size={24} />,
            title: "Visual Pipelines",
            description: "Drag-and-drop deal management that keeps your sales process moving forward fluently."
        },
        {
            icon: <CheckCircle2 className="text-indigo-600 dark:text-indigo-400" size={24} />,
            title: "Tasks & To-Dos",
            description: "Link tasks to leads and prioritize your day with a clean, focused interface."
        },
        {
            icon: <Upload className="text-indigo-600 dark:text-indigo-400" size={24} />,
            title: "CSV Imports",
            description: "Migrate from spreadsheets in seconds. Map columns and import thousands of leads instantly."
        },
        {
            icon: <Users className="text-indigo-600 dark:text-indigo-400" size={24} />,
            title: "Lead Management",
            description: "Organize contacts with powerful lists, tags, and quick filters."
        },
        {
            icon: <BarChart3 className="text-indigo-600 dark:text-indigo-400" size={24} />,
            title: "Real-time Analytics",
            description: "Instant insights into your revenue trends, conversion rates, and team performance."
        },
        {
            icon: <Zap className="text-indigo-600 dark:text-indigo-400" size={24} />,
            title: "Lightning Fast",
            description: "Built for speed. No loading spinners, no lag. Just instant interactions."
        }
    ];

    return (
        <section id="features" className="relative z-10 py-24 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                    >
                        Run your sales from one beautiful workspace.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-lg text-gray-500 dark:text-gray-400"
                    >
                        Lumina strips away the complexity of traditional CRMs, leaving you with a fast, beautiful tool that your team will actually enjoy using.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                            <GlassCard className="p-8 hover:border-indigo-200 dark:hover:border-indigo-900 transition-all duration-300 group h-full" hoverEffect>
                                <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
