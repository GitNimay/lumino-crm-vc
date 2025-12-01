import React, { useState, useEffect } from 'react';
import { Lead, Task, PipelineStage } from '../types';
import { crmService } from '../services/crmService';
import { Modal, Button, Input, Badge, GlassCard } from './GlassUI';
import { Trash2, Phone, Mail, Building, Tag, CheckCircle2, Circle, Plus, AlertTriangle } from 'lucide-react';

interface LeadDetailModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
  onDelete: () => void;
}

export const LeadDetailModal: React.FC<LeadDetailModalProps> = ({ lead, isOpen, onClose, onUpdate, onDelete }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (lead && isOpen) {
      loadTasks();
      setShowDeleteConfirm(false);
    }
  }, [lead, isOpen]);

  const loadTasks = async () => {
    if (lead) {
      const data = await crmService.getTasks(lead.id);
      setTasks(data);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead || !newTaskTitle.trim()) return;

    await crmService.createTask({
      title: newTaskTitle,
      leadIds: [lead.id],
      status: 'Open',
      priority: 'Medium'
    });
    setNewTaskTitle('');
    setIsAddingTask(false);
    loadTasks();
  };

  const toggleTaskStatus = async (task: Task) => {
    const newStatus = task.status === 'Completed' ? 'Open' : 'Completed';
    await crmService.updateTask(task.id, { status: newStatus });
    loadTasks();
  };

  const handleDeleteLead = async () => {
    if (lead) {
      await crmService.deleteLead(lead.id);
      onDelete();
      onClose();
    }
  };

  if (!lead) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className="-mx-6 -mt-6">
        {/* Header Cover */}
        <div className="h-24 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 w-full relative">
           <div className="absolute -bottom-8 left-6 flex items-end gap-4">
              <div className="w-16 h-16 rounded-lg bg-white dark:bg-gray-900 border-4 border-white dark:border-gray-900 shadow-sm flex items-center justify-center text-xl font-bold text-gray-700 dark:text-gray-200">
                {lead.name.charAt(0)}
              </div>
              <div className="mb-2">
                 <h2 className="text-xl font-bold text-gray-900 dark:text-white">{lead.name}</h2>
                 <p className="text-sm text-gray-500">{lead.company}</p>
              </div>
           </div>
        </div>
      </div>

      <div className="mt-12 space-y-6">
        
        {/* Quick Info */}
        <div className="flex gap-4 border-b border-gray-100 dark:border-gray-800 pb-6">
           <div className="flex-1">
             <label className="text-xs text-gray-500 uppercase">Value</label>
             <p className="text-lg font-semibold text-gray-900 dark:text-white">${lead.value.toLocaleString()}</p>
           </div>
           <div className="flex-1">
             <label className="text-xs text-gray-500 uppercase">Stage</label>
             <div className="mt-1">
               <Badge color="indigo">{lead.stage}</Badge>
             </div>
           </div>
           <div className="flex-1">
             <label className="text-xs text-gray-500 uppercase">Status</label>
             <div className="mt-1">
               <Badge color={lead.status === 'Active' ? 'green' : 'gray'}>{lead.status}</Badge>
             </div>
           </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4">
           <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Mail size={14} /> Email
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{lead.email || 'N/A'}</p>
           </div>
           <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Phone size={14} /> Phone
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{lead.phone || 'N/A'}</p>
           </div>
        </div>

        {/* Tasks Section */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-center mb-3">
             <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Tasks</h3>
             <Button size="xs" variant="ghost" onClick={() => setIsAddingTask(true)}>
               <Plus size={14} />
             </Button>
          </div>

          {isAddingTask && (
            <form onSubmit={handleAddTask} className="mb-3 flex gap-2">
               <Input 
                 autoFocus 
                 placeholder="What needs to be done?" 
                 value={newTaskTitle} 
                 onChange={e => setNewTaskTitle(e.target.value)}
                 className="h-8 text-xs"
               />
               <Button type="submit" size="xs">Add</Button>
            </form>
          )}

          <div className="space-y-2">
            {tasks.length === 0 && !isAddingTask && (
              <p className="text-xs text-gray-400 italic">No tasks yet.</p>
            )}
            {tasks.map(task => (
              <div key={task.id} className="flex items-center gap-3 group">
                 <button onClick={() => toggleTaskStatus(task)} className="text-gray-400 hover:text-emerald-500 transition-colors">
                    {task.status === 'Completed' ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Circle size={16} />}
                 </button>
                 <span className={`text-sm ${task.status === 'Completed' ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-200'}`}>
                   {task.title}
                 </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
            {showDeleteConfirm ? (
               <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2">
                  <span className="text-xs text-red-600 font-medium">Are you sure?</span>
                  <Button size="xs" variant="danger" onClick={handleDeleteLead}>Yes, Delete</Button>
                  <Button size="xs" variant="ghost" onClick={() => setShowDeleteConfirm(false)}>Cancel</Button>
               </div>
            ) : (
               <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => setShowDeleteConfirm(true)}>
                  <Trash2 size={14} className="mr-2" /> Delete Lead
               </Button>
            )}
            <Button onClick={onClose}>Close</Button>
        </div>

      </div>
    </Modal>
  );
};