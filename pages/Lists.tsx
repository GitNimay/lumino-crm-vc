import React, { useState, useEffect } from 'react';
import { crmService } from '../services/crmService';
import { Lead, List, LeadStatus } from '../types';
import { GlassCard, Badge, Button, Input, Modal } from '../components/GlassUI';
import { ImportWizard } from '../components/ImportWizard';
import { LeadDetailModal } from '../components/LeadDetailModal';
import { Filter, Download, Plus, Search, Upload, CheckSquare, Trash2, List as ListIcon, ArrowLeft } from 'lucide-react';

export const Lists: React.FC = () => {
  // View State
  const [activeList, setActiveList] = useState<List | null>(null); // null = All Leads
  const [savedLists, setSavedLists] = useState<List[]>([]);

  // Data State
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selectedLeadIds, setSelectedLeadIds] = useState<Set<string>>(new Set());

  // UI State
  const [searchTerm, setSearchTerm] = useState('');
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isCreateListOpen, setIsCreateListOpen] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [viewingLead, setViewingLead] = useState<Lead | null>(null);

  // New Lead Form State
  const [newLeadName, setNewLeadName] = useState('');
  const [newLeadCompany, setNewLeadCompany] = useState('');
  const [newLeadValue, setNewLeadValue] = useState('');
  const [newLeadTags, setNewLeadTags] = useState('');

  useEffect(() => {
    loadLists();
    loadLeads();
  }, [activeList]);

  const loadLists = async () => {
    const lists = await crmService.getLists();
    setSavedLists(lists);
  };

  const loadLeads = async () => {
    const data = await crmService.getLeads(activeList?.id);
    setLeads(data);
    setSelectedLeadIds(new Set()); // Reset selection on list change
  };

  const handleToggleSelect = (id: string) => {
    const newSet = new Set(selectedLeadIds);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedLeadIds(newSet);
  };

  const handleSelectAll = () => {
    if (selectedLeadIds.size === leads.length) {
      setSelectedLeadIds(new Set());
    } else {
      setSelectedLeadIds(new Set(leads.map(l => l.id)));
    }
  };

  const handleCreateList = async () => {
    if (!newListName.trim()) return;
    const list = await crmService.createList(newListName);
    if (list) {
      // If we have selected leads, add them to the new list immediately
      if (selectedLeadIds.size > 0) {
        await crmService.addLeadsToList(list.id, Array.from(selectedLeadIds));
      }
      setSavedLists([...savedLists, list]);
      setIsCreateListOpen(false);
      setNewListName('');
      setSelectedLeadIds(new Set()); // Clear selection
    }
  };

  const handleDeleteLeads = async () => {
    if (selectedLeadIds.size === 0) return;
    if (confirm(`Are you sure you want to delete ${selectedLeadIds.size} leads? This cannot be undone.`)) {
      for (const id of selectedLeadIds) {
        await crmService.deleteLead(id);
      }
      loadLeads();
      loadLists(); // counts update
    }
  };

  const handleExport = () => {
    const leadsToExport = selectedLeadIds.size > 0
      ? leads.filter(l => selectedLeadIds.has(l.id))
      : leads;
    crmService.exportLeads(leadsToExport);
  };

  const filteredLeads = leads.filter(l =>
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-140px)]">

      {/* Sidebar (Lists) */}
      <div className="w-full md:w-64 flex-shrink-0 flex flex-col gap-2">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">My Lists</h3>

        <button
          onClick={() => setActiveList(null)}
          className={`text-left px-3 py-2 rounded-md text-sm font-medium flex justify-between items-center ${!activeList ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
        >
          All Leads <span className="text-xs bg-gray-200 dark:bg-gray-700 px-1.5 rounded-full">{savedLists.reduce((acc, l) => acc + (l.leadCount || 0), 0)}</span>
          {/* Note: Total count above is approx for v1 demo */}
        </button>

        {savedLists.map(list => (
          <button
            key={list.id}
            onClick={() => setActiveList(list)}
            className={`text-left px-3 py-2 rounded-md text-sm font-medium flex justify-between items-center ${activeList?.id === list.id ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'}`}
          >
            <span className="truncate">{list.name}</span>
            <span className="text-xs bg-gray-200 dark:bg-gray-700 px-1.5 rounded-full">{list.leadCount}</span>
          </button>
        ))}

        <Button variant="outline" size="sm" className="mt-2 justify-start gap-2" onClick={() => setIsCreateListOpen(true)}>
          <Plus size={14} /> New List
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">

        {/* Header / Toolbar */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between gap-4 items-center">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white whitespace-nowrap">
              {activeList ? activeList.name : 'All Leads'}
            </h2>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
              <Input
                placeholder="Search..."
                className="pl-8 h-8 text-xs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2 w-full md:w-auto overflow-x-auto">
            {selectedLeadIds.size > 0 && (
              <>
                <Button size="sm" variant="danger" onClick={handleDeleteLeads} className="gap-2">
                  <Trash2 size={14} /> Delete ({selectedLeadIds.size})
                </Button>
                <Button size="sm" variant="outline" onClick={() => setIsCreateListOpen(true)} className="gap-2 whitespace-nowrap">
                  <ListIcon size={14} /> Add to List
                </Button>
              </>
            )}
            <Button size="sm" variant="outline" onClick={handleExport} className="gap-2">
              <Download size={14} /> Export
            </Button>
            <Button size="sm" variant="outline" onClick={() => setIsImportOpen(true)} className="gap-2">
              <Upload size={14} /> Import
            </Button>
            <Button size="sm" onClick={() => { setViewingLead(null); setIsLeadModalOpen(true); }} className="gap-2 whitespace-nowrap">
              <Plus size={14} /> Add Lead
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-900">
              <tr className="text-gray-500 dark:text-gray-400 text-xs font-medium border-b border-gray-200 dark:border-gray-800">
                <th className="p-4 w-10">
                  <input type="checkbox" checked={selectedLeadIds.size > 0 && selectedLeadIds.size === leads.length} onChange={handleSelectAll} className="rounded border-gray-300 dark:border-gray-700" />
                </th>
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Contact</th>
                <th className="p-4 font-medium">Company</th>
                <th className="p-4 font-medium">Value</th>
                <th className="p-4 font-medium">Stage</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className={`group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer ${selectedLeadIds.has(lead.id) ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}
                  onClick={(e) => {
                    // Don't trigger if checkbox clicked
                    if ((e.target as HTMLElement).tagName !== 'INPUT') {
                      setViewingLead(lead);
                      setIsLeadModalOpen(true);
                    }
                  }}
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedLeadIds.has(lead.id)}
                      onChange={() => handleToggleSelect(lead.id)}
                      className="rounded border-gray-300 dark:border-gray-700"
                    />
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{lead.name}</span>
                  </td>
                  <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{lead.email}</td>
                  <td className="p-4 text-sm text-gray-500 dark:text-gray-400">{lead.company}</td>
                  <td className="p-4 text-sm font-medium text-gray-900 dark:text-gray-200">${lead.value.toLocaleString()}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded text-xs text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                      {lead.stage}
                    </span>
                  </td>
                  <td className="p-4">
                    <Badge color={lead.status === LeadStatus.ACTIVE ? 'green' : 'gray'}>{lead.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredLeads.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <Search size={32} className="mb-4 opacity-50" />
              <p>No leads found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ImportWizard
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onComplete={() => { loadLeads(); loadLists(); }}
        targetListId={activeList?.id}
      />

      <LeadDetailModal
        lead={viewingLead}
        isOpen={isLeadModalOpen && !!viewingLead}
        onClose={() => { setIsLeadModalOpen(false); setViewingLead(null); }}
        onUpdate={() => { loadLeads(); }}
        onDelete={() => { loadLeads(); loadLists(); }}
      />

      {/* Create Lead Modal (Quick Add) */}
      <Modal isOpen={isLeadModalOpen && !viewingLead} onClose={() => setIsLeadModalOpen(false)} title="New Lead">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">Full Name</label>
            <Input placeholder="e.g. Jane Doe" value={newLeadName} onChange={e => setNewLeadName(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">Company</label>
            <Input placeholder="e.g. Acme Corp" value={newLeadCompany} onChange={e => setNewLeadCompany(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">Value ($)</label>
            <Input placeholder="0.00" type="number" value={newLeadValue} onChange={e => setNewLeadValue(e.target.value)} />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1 block">Tags</label>
            <Input placeholder="Comma separated (e.g. vip, urgent)" value={newLeadTags} onChange={e => setNewLeadTags(e.target.value)} />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="ghost" onClick={() => setIsLeadModalOpen(false)}>Cancel</Button>
            <Button onClick={async () => {
              if (newLeadName) {
                await crmService.createLead({
                  name: newLeadName,
                  company: newLeadCompany,
                  value: newLeadValue ? Number(newLeadValue) : 0,
                  tags: newLeadTags.split(',').map(t => t.trim()).filter(Boolean)
                });
                loadLeads();
                setIsLeadModalOpen(false);
                // Reset form
                setNewLeadName('');
                setNewLeadCompany('');
                setNewLeadValue('');
                setNewLeadTags('');
              }
            }}>Create Lead</Button>
          </div>
        </div>
      </Modal>

      {/* Create List Modal */}
      <Modal isOpen={isCreateListOpen} onClose={() => setIsCreateListOpen(false)} title="Create List">
        <div className="space-y-4">
          <Input
            placeholder="List Name (e.g. Q4 Outreach)"
            value={newListName}
            onChange={e => setNewListName(e.target.value)}
            autoFocus
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" onClick={() => setIsCreateListOpen(false)}>Cancel</Button>
            <Button onClick={handleCreateList}>Save List</Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};