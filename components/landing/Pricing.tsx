import React from 'react';
import { GlassCard, Button } from '../GlassUI';
import { CheckCircle2, Zap, Shield, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

export const Pricing: React.FC = () => {
    const plans = [
        {
            name: "Starter",
            price: "Free",
            description: "Perfect for individuals and small side projects.",
            features: [
                "Up to 1,000 leads",
                "Basic pipeline visualization",
                "7-day history",
                "Community support"
            ],
            cta: "Get Started",
            popular: false
        },
        {
            name: "Pro",
            price: "$29",
            period: "/month",
            description: "For growing teams that need more power and flexibility.",
            features: [
                "Unlimited leads",
                "Advanced pipeline automation",
                "Unlimited history",
                "Email integration",
                "Priority support"
            ],
            cta: "Start Free Trial",
            popular: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            description: "Tailored solutions for large organizations with specific needs.",
            features: [
                "Dedicated account manager",
                "Custom integrations",
                "SSO & advanced security",
                "SLA guarantees",
                "Onboarding training"
            ],
            cta: "Contact Sales",
            popular: false
        }
    ];

    return (
        <section id="pricing" className="relative z-10 py-24 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4"
                    >
                        Simple, transparent pricing.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-lg text-gray-500 dark:text-gray-400"
                    >
                        Choose the plan that fits your needs. No hidden fees, cancel anytime.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {plans.map((plan, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                        >
                            <GlassCard
                                className={`p-8 flex flex-col relative h-full ${plan.popular ? 'border-indigo-500 dark:border-indigo-500 ring-2 ring-indigo-500/20' : ''}`}
                                hoverEffect
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                        Most Popular
                                    </div>
                                )}
                                <div className="mb-8">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1 mb-4">
                                        <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                                        {plan.period && <span className="text-gray-500 dark:text-gray-400">{plan.period}</span>}
                                    </div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{plan.description}</p>
                                </div>

                                <div className="flex-grow mb-8">
                                    <ul className="space-y-4">
                                        {plan.features.map((feature, fIdx) => (
                                            <li key={fIdx} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                                                <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Button
                                    variant={plan.popular ? 'primary' : 'secondary'}
                                    className="w-full justify-center"
                                >
                                    {plan.cta}
                                </Button>
                            </GlassCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
