import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Layout, CheckCircle } from 'lucide-react';

export const Workflow: React.FC = () => {
    const steps = [
        {
            icon: <Upload className="text-white" size={20} />,
            title: "Import your leads",
            description: "Upload your CSV and map columns instantly.",
            color: "bg-blue-500"
        },
        {
            icon: <Layout className="text-white" size={20} />,
            title: "Organize pipelines",
            description: "Customize stages to match your sales process.",
            color: "bg-indigo-500"
        },
        {
            icon: <CheckCircle className="text-white" size={20} />,
            title: "Close more deals",
            description: "Track progress and celebrate wins with your team.",
            color: "bg-emerald-500"
        }
    ];

    return (
        <section id="workflow" className="py-24 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">From cold CSV to warm pipeline in minutes.</h2>
                    <p className="text-lg text-gray-500 dark:text-gray-400">Get set up and running faster than with any other CRM.</p>
                </div>

                <div className="relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-100 dark:bg-gray-800 -z-10"></div>

                    <div className="grid md:grid-cols-3 gap-12">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.2 }}
                                className="relative flex flex-col items-center text-center group"
                            >
                                <div className={`w-24 h-24 rounded-2xl ${step.color} shadow-lg shadow-${step.color}/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                                <p className="text-gray-500 dark:text-gray-400">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
