import React, { useState, useEffect } from 'react';
import { crmService } from '../services/crmService';
import { Lead, PipelineStage } from '../types';
import { GlassCard } from '../components/GlassUI';
import { MoreHorizontal, Plus } from 'lucide-react';

export const Pipeline: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [draggedLeadId, setDraggedLeadId] = useState<string | null>(null);
  
  const stages = Object.values(PipelineStage);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    const data = await crmService.getLeads();
    setLeads(data);
  };

  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    setDraggedLeadId(leadId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, stage: PipelineStage) => {
    e.preventDefault();
    if (!draggedLeadId) return;

    const updatedLeads = leads.map(l => 
      l.id === draggedLeadId ? { ...l, stage } : l
    );
    setLeads(updatedLeads);
    setDraggedLeadId(null);

    await crmService.updateLeadStage(draggedLeadId, stage);
  };

  const getLeadsByStage = (stage: PipelineStage) => {
    return leads.filter(l => l.stage === stage);
  };

  const calculateStageValue = (stageLeads: Lead[]) => {
    return stageLeads.reduce((acc, curr) => acc + curr.value, 0);
  };

  return (
    <div className="h-[calc(100vh-120px)] flex gap-4 overflow-x-auto pb-2 snap-x">
      {stages.map((stage) => {
        const stageLeads = getLeadsByStage(stage);
        const stageValue = calculateStageValue(stageLeads);
        
        return (
          <div 
            key={stage}
            className="flex-shrink-0 w-80 flex flex-col h-full snap-start bg-gray-50/50 dark:bg-gray-900/20 rounded-lg p-2 border border-gray-100 dark:border-gray-800"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage)}
          >
            {/* Column Header */}
            <div className="mb-3 flex items-center justify-between px-2 pt-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-gray-700 dark:text-gray-200">{stage}</span>
                <span className="text-xs text-gray-500 bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded-md font-mono">
                  {stageLeads.length}
                </span>
              </div>
              <button className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <Plus size={16} />
              </button>
            </div>
            
            {/* Drop Zone / List */}
            <div className="flex-1 overflow-y-auto px-1 space-y-2.5 scrollbar-thin">
              {stageLeads.length === 0 && (
                <div className="h-20 border border-dashed border-gray-200 dark:border-gray-800 rounded-md flex items-center justify-center text-gray-400 text-xs">
                  Empty
                </div>
              )}
              {stageLeads.map((lead) => (
                <div
                  key={lead.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, lead.id)}
                  className="cursor-move transform transition-all duration-200 hover:-translate-y-0.5"
                >
                  <GlassCard 
                    hoverEffect 
                    className="p-3 group relative border border-gray-200 dark:border-gray-800 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-1.5">
                      <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">{lead.company}</span>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600">
                        <MoreHorizontal size={14} />
                      </button>
                    </div>
                    <h4 className="font-medium text-sm text-gray-900 dark:text-white mb-2">{lead.name}</h4>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {lead.tags.map(tag => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-sm border border-gray-200 dark:border-gray-700">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                      <div className="flex items-center gap-1.5">
                         {lead.avatarUrl ? (
                             <img src={lead.avatarUrl} className="w-4 h-4 rounded-full grayscale opacity-70" />
                         ) : (
                             <div className="w-4 h-4 rounded-full bg-gray-200"></div>
                         )}
                         <span className="text-[10px] text-gray-400">{new Date(lead.lastActivity).toLocaleDateString(undefined, {month:'short', day:'numeric'})}</span>
                      </div>
                      <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                        ${lead.value.toLocaleString()}
                      </span>
                    </div>
                  </GlassCard>
                </div>
              ))}
            </div>

            {/* Column Footer Summary */}
            <div className="mt-2 px-2 pb-1">
              <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wide">Total: ${stageValue.toLocaleString()}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};