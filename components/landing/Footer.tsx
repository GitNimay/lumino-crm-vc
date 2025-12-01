import React from 'react';
import { Button } from '../GlassUI';
import { ArrowRight } from 'lucide-react';

interface FooterProps {
    onOpenAuth: (isLogin: boolean) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAuth }) => {
    return (
        <footer className="relative z-10 bg-white dark:bg-gray-900 pt-24 pb-12 border-t border-gray-100 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Final CTA */}
                <div className="relative rounded-3xl bg-gray-900 dark:bg-indigo-950 overflow-hidden px-6 py-20 sm:px-12 sm:py-24 lg:px-16 mb-24 text-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20"></div>
                    <div className="relative z-10 max-w-2xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
                            Ready to make your CRM beautiful?
                        </h2>
                        <p className="text-lg text-gray-300 mb-10">
                            Join thousands of teams who have switched to Lumina for a faster, cleaner sales process.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                size="lg"
                                onClick={() => onOpenAuth(false)}
                                className="bg-white text-gray-900 hover:bg-gray-100 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 rounded-full px-8 h-12 text-base"
                            >
                                Start for free <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-gray-700 text-gray-300 hover:text-white hover:border-white rounded-full px-8 h-12 text-base"
                            >
                                See pricing
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Links */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t border-gray-100 dark:border-gray-800 pt-12">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-gray-900 dark:bg-white flex items-center justify-center text-white dark:text-gray-900 text-xs font-bold">L</div>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">Lumina CRM</span>
                    </div>
                    <div className="flex gap-8 text-sm text-gray-500">
                        <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy</a>
                        <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms</a>
                        <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Twitter</a>
                        <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">GitHub</a>
                    </div>
                    <p className="text-xs text-gray-400">© 2024 Lumina Inc.</p>
                </div>
            </div>
        </footer>
    );
};
