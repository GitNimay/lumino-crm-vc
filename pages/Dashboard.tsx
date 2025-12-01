import React, { useEffect, useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  CartesianGrid
} from 'recharts';
import { GlassCard, Badge, Button } from '../components/GlassUI';
import { crmService } from '../services/crmService';
import { DashboardStats, Lead } from '../types';
import { ArrowUpRight, ArrowDownRight, Users, DollarSign, Activity, TrendingUp, Calendar } from 'lucide-react';

const KPICard = ({ title, value, trend, subtext }: { title: string, value: string, trend: string, subtext: string }) => (
  <GlassCard className="p-5 flex flex-col justify-between h-32">
    <div>
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">{title}</p>
      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">{value}</h3>
    </div>
    <div className="flex items-center gap-2 mt-auto">
      <span className={`flex items-center text-xs font-medium ${trend.startsWith('+') ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
        {trend.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {trend}
      </span>
      <span className="text-xs text-gray-400 dark:text-gray-500">{subtext}</span>
    </div>
  </GlassCard>
);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 text-white text-xs p-2 rounded shadow-xl">
        <p className="font-semibold mb-1">{label}</p>
        <p>
          {`${payload[0].value}`}
        </p>
      </div>
    );
  }
  return null;
};

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data for charts
  const pipelineData = [
    { name: 'New', value: 12 },
    { name: 'Contacted', value: 19 },
    { name: 'Qualified', value: 8 },
    { name: 'Proposal', value: 5 },
    { name: 'Won', value: 3 },
  ];

  const revenueData = [
    { name: 'Jan', uv: 4000 },
    { name: 'Feb', uv: 3000 },
    { name: 'Mar', uv: 2000 },
    { name: 'Apr', uv: 2780 },
    { name: 'May', uv: 1890 },
    { name: 'Jun', uv: 2390 },
    { name: 'Jul', uv: 3490 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const [statsData, leadsData] = await Promise.all([
        crmService.getDashboardStats(),
        crmService.getLeads()
      ]);
      setStats(statsData);
      setRecentLeads(leadsData.slice(0, 5));
      setLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header Actions */}
      <div className="flex justify-between items-end mb-2">
        <div>
           <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Overview</h2>
           <p className="text-sm text-gray-500">Track your performance metrics.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="gap-2">
                <Calendar size={14} /> Last 30 Days
            </Button>
            <Button variant="primary" size="sm">Download Report</Button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard 
          title="Total Revenue" 
          value={`$${stats?.pipelineValue.toLocaleString()}`} 
          trend="+12.5%" 
          subtext="vs last month"
        />
        <KPICard 
          title="Active Leads" 
          value={stats?.totalLeads.toString() || '0'} 
          trend="+5.2%" 
          subtext="new leads added"
        />
        <KPICard 
          title="Conversion Rate" 
          value={`${stats?.conversionRate.toFixed(1)}%`} 
          trend="-2.1%" 
          subtext="avg. this quarter"
        />
        <KPICard 
          title="Active Deals" 
          value={stats?.activeDeals.toString() || '0'} 
          trend="+8%" 
          subtext="in pipeline"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <GlassCard className="lg:col-span-2 p-6 flex flex-col h-[360px]">
          <div className="flex justify-between items-center mb-6">
             <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Revenue Trend</h3>
          </div>
          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#111827" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#111827" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 11}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 11}} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#9CA3AF', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Area type="monotone" dataKey="uv" stroke="#111827" strokeWidth={2} fillOpacity={1} fill="url(#colorUv)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Pipeline Distribution */}
        <GlassCard className="p-6 flex flex-col h-[360px]">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-6">Pipeline Volume</h3>
          <div className="flex-1 w-full min-h-0">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pipelineData} layout="vertical" margin={{ left: 0, right: 30 }}>
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false}
                  width={90}
                  tick={{fill: '#4B5563', fontSize: 12, fontWeight: 500}} 
                />
                <Tooltip 
                  cursor={{fill: '#F3F4F6'}}
                  content={<CustomTooltip />}
                />
                <Bar dataKey="value" fill="#111827" radius={[0, 4, 4, 0]} barSize={24} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Recent Activity */}
      <div className="pt-2">
         <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Recent Leads</h3>
         <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900">
                <th className="py-3 px-6 font-medium">Name</th>
                <th className="py-3 px-6 font-medium">Company</th>
                <th className="py-3 px-6 font-medium">Value</th>
                <th className="py-3 px-6 font-medium">Stage</th>
                <th className="py-3 px-6 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {recentLeads.map((lead) => (
                <tr key={lead.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="py-3 px-6">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-600 dark:text-gray-300">
                            {lead.name.charAt(0)}
                        </div>
                        <span className="font-medium text-sm text-gray-900 dark:text-white">{lead.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-sm text-gray-500 dark:text-gray-400">{lead.company}</td>
                  <td className="py-3 px-6 text-sm text-gray-900 dark:text-gray-200 font-medium">${lead.value.toLocaleString()}</td>
                  <td className="py-3 px-6">
                    <span className="text-xs font-medium text-gray-600 bg-gray-100 dark:bg-gray-800 dark:text-gray-400 px-2 py-0.5 rounded border border-gray-200 dark:border-gray-700">
                      {lead.stage}
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    <Badge color={lead.status === 'Active' ? 'green' : 'gray'}>{lead.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};