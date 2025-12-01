import React, { useState, useEffect } from 'react';
import { crmService } from '../services/crmService';
import { Lead, LeadStatus } from '../types';
import { GlassCard, Badge, Button, Input, Modal } from '../components/GlassUI';
import { Filter, Download, Plus, Search } from 'lucide-react';

export const Lists: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLeadData, setNewLeadData] = useState({ name: '', company: '', email: '', value: 0 });

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    const data = await crmService.getLeads();
    setLeads(data);
  };

  const handleCreate = async () => {
    await crmService.createLead(newLeadData);
    setIsModalOpen(false);
    loadLeads();
    setNewLeadData({ name: '', company: '', email: '', value: 0 });
  };

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
         <div className="relative w-full md:w-80">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input 
            placeholder="Search leads..." 
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter size={14} /> Filter
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Download size={14} /> Export
          </Button>
          <Button size="sm" onClick={() => setIsModalOpen(true)} className="gap-2">
            <Plus size={14} /> New Lead
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-gray-500 dark:text-gray-400 text-xs font-medium border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                <th className="p-4 font-medium w-64">Name</th>
                <th className="p-4 font-medium">Contact</th>
                <th className="p-4 font-medium">Company</th>
                <th className="p-4 font-medium">Stage</th>
                <th className="p-4 font-medium">Value</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Tags</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 text-[10px] font-bold">
                        {lead.name.charAt(0)}
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{lead.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{lead.email}</td>
                  <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{lead.company}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-xs text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                      {lead.stage}
                    </span>
                  </td>
                  <td className="p-4 text-sm font-medium text-gray-900 dark:text-gray-200">${lead.value.toLocaleString()}</td>
                  <td className="p-4">
                    <Badge color={lead.status === LeadStatus.ACTIVE ? 'green' : 'gray'}>{lead.status}</Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1">
                      {lead.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded border border-gray-200 dark:border-gray-700 text-gray-500 bg-white dark:bg-gray-900">
                          {tag}
                        </span>
                      ))}
                      {lead.tags.length > 2 && <span className="text-[10px] text-gray-400 px-1">+{lead.tags.length - 2}</span>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredLeads.length === 0 && (
          <div className="p-12 text-center text-gray-500 text-sm">
            No leads found matching your search.
          </div>
        )}
      </div>

      {/* Create Lead Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Lead">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
            <Input 
              value={newLeadData.name} 
              onChange={e => setNewLeadData({...newLeadData, name: e.target.value})} 
              placeholder="Jane Doe"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Company</label>
            <Input 
              value={newLeadData.company} 
              onChange={e => setNewLeadData({...newLeadData, company: e.target.value})} 
              placeholder="Acme Corp"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
            <Input 
              type="email"
              value={newLeadData.email} 
              onChange={e => setNewLeadData({...newLeadData, email: e.target.value})} 
              placeholder="jane@acme.com"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5">Estimated Value ($)</label>
            <Input 
              type="number"
              value={newLeadData.value} 
              onChange={e => setNewLeadData({...newLeadData, value: Number(e.target.value)})} 
              placeholder="5000"
            />
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate}>Create Lead</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};