import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Button, Input, GlassCard } from './GlassUI';
import { Loader2, X, Shield, Zap } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultIsLogin?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, defaultIsLogin = true }) => {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(defaultIsLogin);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Reset state when modal opens/closes or defaultIsLogin changes
  React.useEffect(() => {
    setIsLogin(defaultIsLogin);
    setError(null);
    setEmail('');
    setPassword('');
  }, [isOpen, defaultIsLogin]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
      }
      onClose(); // Close modal on success
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md"
            >
              <GlassCard className="p-8 shadow-2xl border-t border-white/50 dark:border-gray-700/50 backdrop-blur-xl relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <X size={20} />
                </button>

                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 via-gray-900 to-gray-200 dark:from-gray-800 dark:via-white dark:to-gray-800 rounded-t-lg opacity-20"></div>

                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {isLogin ? 'Welcome back' : 'Create your account'}
                  </h2>
                  <p className="text-sm text-gray-500 mt-2">
                    {isLogin ? 'Enter your details to access your workspace.' : 'Join thousands of teams closing more deals.'}
                  </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-5">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Email address</label>
                    <Input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="bg-gray-50/50 dark:bg-gray-900/50 h-11"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">Password</label>
                    <Input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="bg-gray-50/50 dark:bg-gray-900/50 h-11"
                    />
                  </div>

                  {error && (
                    <div className="p-3 rounded-md bg-red-50 border border-red-100 text-red-600 text-xs">
                      {error}
                    </div>
                  )}

                  <Button type="submit" className="w-full h-11 text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300" disabled={loading}>
                    {loading ? <Loader2 className="animate-spin w-5 h-5 mr-2" /> : null}
                    {isLogin ? 'Sign in' : 'Get started for free'}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500">
                    {isLogin ? "New to Lumina? " : "Already have an account? "}
                    <button
                      onClick={() => setIsLogin(!isLogin)}
                      className="text-gray-900 dark:text-white font-medium hover:underline decoration-gray-300 underline-offset-4 transition-all"
                    >
                      {isLogin ? 'Create an account' : 'Log in'}
                    </button>
                  </p>
                </div>
              </GlassCard>

              {/* Social Proof Mini */}
              <div className="mt-8 flex justify-center items-center gap-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
                  <Shield size={14} /> SOC2 Compliant
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-400">
                  <Zap size={14} /> 99.9% Uptime
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
