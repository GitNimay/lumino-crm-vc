import React from 'react';
import { GlassCard, Button, Input } from '../components/GlassUI';

export const Settings: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Profile Section */}
      <GlassCard className="p-6">
        <div className="mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Profile</h3>
            <p className="text-xs text-gray-500 mt-1">Manage your public profile and details</p>
        </div>
        
        <div className="space-y-5">
          <div className="flex gap-6 items-start">
             <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex-shrink-0 flex items-center justify-center text-gray-400">
                 <span className="text-xl font-medium">JD</span>
             </div>
             <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">First Name</label>
                        <Input defaultValue="John" />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Last Name</label>
                        <Input defaultValue="Doe" />
                    </div>
                </div>
                <div>
                    <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Email</label>
                    <Input defaultValue="john.doe@example.com" disabled className="bg-gray-50 dark:bg-gray-800 text-gray-500 cursor-not-allowed" />
                </div>
             </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button variant="primary" size="sm">Save Changes</Button>
          </div>
        </div>
      </GlassCard>

      {/* Preferences */}
      <GlassCard className="p-6">
        <div className="mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Preferences</h3>
            <p className="text-xs text-gray-500 mt-1">Customize your workspace experience</p>
        </div>

        <div className="space-y-4">
            <div className="flex items-center justify-between py-2">
                <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Language</p>
                    <p className="text-xs text-gray-500">Interface language</p>
                </div>
                <select className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md text-xs p-2 outline-none w-40">
                    <option>English (US)</option>
                    <option>Spanish</option>
                    <option>French</option>
                </select>
            </div>
             <div className="flex items-center justify-between py-2">
                <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Timezone</p>
                    <p className="text-xs text-gray-500">Your current timezone</p>
                </div>
                <select className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md text-xs p-2 outline-none w-40">
                    <option>Pacific Time (PT)</option>
                    <option>Eastern Time (ET)</option>
                    <option>GMT</option>
                </select>
            </div>
        </div>
      </GlassCard>

       {/* Notifications */}
      <GlassCard className="p-6">
        <div className="mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Notifications</h3>
            <p className="text-xs text-gray-500 mt-1">Email and in-app alerts</p>
        </div>
        
        <div className="space-y-3">
             {['New leads assigned to me', 'Deal stage changes', 'Weekly summary reports'].map((label, idx) => (
                 <div key={idx} className="flex items-center justify-between py-1">
                    <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked={idx === 0} />
                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-gray-900"></div>
                    </label>
                 </div>
             ))}
        </div>
      </GlassCard>
    </div>
  );
};