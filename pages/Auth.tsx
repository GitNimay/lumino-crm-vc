import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Button, Input, GlassCard } from '../components/GlassUI';
import { Loader2, Check, ArrowRight, LayoutDashboard, KanbanSquare, Zap, Shield, BarChart3, Users } from 'lucide-react';

export const Auth: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: <KanbanSquare className="text-gray-900 dark:text-white" size={24} />,
      title: "Visual Pipelines",
      description: "Drag-and-drop deal management that keeps your sales process moving forward fluently."
    },
    {
      icon: <BarChart3 className="text-gray-900 dark:text-white" size={24} />,
      title: "Real-time Analytics",
      description: "Instant insights into your revenue trends, conversion rates, and team performance."
    },
    {
      icon: <Users className="text-gray-900 dark:text-white" size={24} />,
      title: "Lead Management",
      description: "Organize contacts with powerful lists, tags, and quick filters."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] dark:bg-gray-950 font-sans selection:bg-gray-900 selection:text-white overflow-x-hidden">
      
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
         <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-purple-100 dark:bg-purple-900/20 rounded-full blur-[100px] opacity-60"></div>
         <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-100 dark:bg-blue-900/20 rounded-full blur-[120px] opacity-60"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gray-900 dark:bg-white flex items-center justify-center text-white dark:text-gray-900 text-sm font-bold shadow-lg">L</div>
          <span className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">Lumina</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-400">
          <a href="#features" className="hover:text-gray-900 dark:hover:text-white transition-colors">Features</a>
          <a href="#testimonials" className="hover:text-gray-900 dark:hover:text-white transition-colors">Testimonials</a>
          <a href="#pricing" className="hover:text-gray-900 dark:hover:text-white transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-4">
           <button 
             onClick={() => { setIsLogin(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
             className="text-sm font-medium text-gray-900 dark:text-white hover:opacity-70 hidden md:block"
           >
             Log in
           </button>
           <Button 
             size="sm" 
             onClick={() => { setIsLogin(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
           >
             Get Started
           </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left: Copy */}
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">v1.0 is now live</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
            Manage relationships with <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 dark:from-white dark:to-gray-500">elegance.</span>
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
            Lumina is the minimalist CRM built for modern teams. 
            Track leads, visualize pipelines, and close deals without the clutter of enterprise software.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
               <span className="flex items-center gap-2"><Check size={16} className="text-gray-900 dark:text-white"/> Free tier available</span>
               <span className="flex items-center gap-2"><Check size={16} className="text-gray-900 dark:text-white"/> No credit card required</span>
            </div>
          </div>
        </div>

        {/* Right: Auth Form */}
        <div className="w-full max-w-md mx-auto lg:ml-auto animate-in fade-in slide-in-from-right-4 duration-1000">
           <GlassCard className="p-8 shadow-2xl border-t border-white/50 dark:border-gray-700/50 backdrop-blur-xl relative">
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
        </div>
      </section>

      {/* Feature Highlights */}
      <section id="features" className="relative z-10 py-24 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800">
         <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
               <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Everything you need, nothing you don't.</h2>
               <p className="text-gray-500 dark:text-gray-400">Lumina strips away the complexity of traditional CRMs, leaving you with a fast, beautiful tool that your team will actually enjoy using.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
               {features.map((feature, idx) => (
                  <GlassCard key={idx} className="p-8 hover:border-gray-300 dark:hover:border-gray-600 transition-colors duration-300">
                     <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-6">
                        {feature.icon}
                     </div>
                     <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                     <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                  </GlassCard>
               ))}
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-[#F9FAFB] dark:bg-gray-950 py-12 border-t border-gray-200 dark:border-gray-800">
         <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
               <div className="w-6 h-6 rounded bg-gray-900 dark:bg-white flex items-center justify-center text-white dark:text-gray-900 text-xs font-bold">L</div>
               <span className="text-sm font-semibold text-gray-900 dark:text-white">Lumina CRM</span>
            </div>
            <div className="flex gap-8 text-sm text-gray-500">
               <a href="#" className="hover:text-gray-900 dark:hover:text-white">Privacy</a>
               <a href="#" className="hover:text-gray-900 dark:hover:text-white">Terms</a>
               <a href="#" className="hover:text-gray-900 dark:hover:text-white">Twitter</a>
               <a href="#" className="hover:text-gray-900 dark:hover:text-white">GitHub</a>
            </div>
            <p className="text-xs text-gray-400">© 2024 Lumina Inc.</p>
         </div>
      </footer>
    </div>
  );
};