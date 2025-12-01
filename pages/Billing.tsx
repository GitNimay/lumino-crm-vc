import React from 'react';
import { GlassCard, Button, Badge } from '../components/GlassUI';
import { Check, Zap, CreditCard } from 'lucide-react';

export const Billing: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Plans & Billing</h2>
        <p className="text-sm text-gray-500">Manage your subscription and payment methods.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Free Plan */}
        <GlassCard className="p-8 flex flex-col relative border-t-4 border-t-gray-200 dark:border-t-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Starter</h3>
          <p className="text-sm text-gray-500 mt-1">Perfect for individuals</p>
          <div className="mt-4 mb-6">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">$0</span>
            <span className="text-gray-500 text-sm">/month</span>
          </div>
          <ul className="space-y-3 mb-8 flex-1">
            <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <Check size={16} className="text-gray-900 dark:text-white" /> Up to 500 leads
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <Check size={16} className="text-gray-900 dark:text-white" /> Basic Pipeline
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <Check size={16} className="text-gray-900 dark:text-white" /> 1 User Seat
            </li>
          </ul>
          <Button variant="outline" className="w-full">Current Plan</Button>
        </GlassCard>

        {/* Pro Plan */}
        <GlassCard className="p-8 flex flex-col relative border-t-4 border-t-black dark:border-t-white shadow-md">
          <div className="absolute top-0 right-0 p-4">
            <Badge color="gray">Popular</Badge>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center gap-2">
            Pro 
          </h3>
          <p className="text-sm text-gray-500 mt-1">For growing teams</p>
          <div className="mt-4 mb-6">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">$29</span>
            <span className="text-gray-500 text-sm">/month</span>
          </div>
          <ul className="space-y-3 mb-8 flex-1">
            <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <Check size={16} className="text-black dark:text-white" /> Unlimited leads
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <Check size={16} className="text-black dark:text-white" /> Multiple Pipelines
            </li>
            <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <Check size={16} className="text-black dark:text-white" /> Advanced Analytics
            </li>
             <li className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
              <Check size={16} className="text-black dark:text-white" /> Email Integration
            </li>
          </ul>
          <Button variant="primary" className="w-full">Upgrade to Pro</Button>
        </GlassCard>
      </div>

      <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
        <h3 className="text-sm font-semibold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
            Payment Method
        </h3>
        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-white dark:bg-gray-900">
            <div className="flex items-center gap-4">
                <div className="w-10 h-7 bg-gray-900 rounded flex items-center justify-center text-white text-[10px] font-bold tracking-widest">VISA</div>
                <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">•••• 4242</p>
                    <p className="text-xs text-gray-500">Expires 12/25</p>
                </div>
            </div>
            <Button variant="ghost" size="sm">Edit</Button>
        </div>
      </div>
    </div>
  );
};