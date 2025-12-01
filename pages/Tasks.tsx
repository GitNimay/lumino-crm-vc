import React, { useState, useEffect } from 'react';
import { crmService } from '../services/crmService';
import { Task, Lead } from '../types';
import { GlassCard, Button, Input, Modal, Badge } from '../components/GlassUI';
import { CheckCircle2, Circle, Calendar, Plus, Filter, Trash2, Tag } from 'lucide-react';

export const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'All' | 'Open' | 'Completed'>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New Task Form State
  const [newTask, setNewTask] = useState<{ title: string; priority: 'Low'|'Medium'|'High'; dueDate: string; leadIds: string[] }>({
    title: '',
    priority: 'Medium',
    dueDate: '',
    leadIds: []
  });

  // Leads for selection in modal
  const [leads, setLeads] = useState<Lead[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [tasksData, leadsData] = await Promise.all([
      crmService.getTasks(),
      crmService.getLeads()
    ]);
    setTasks(tasksData);
    setLeads(leadsData);
  };

  const handleCreate = async () => {
    if (!newTask.title) return;
    await crmService.createTask({
      ...newTask,
      status: 'Open'
    });
    setIsModalOpen(false);
    setNewTask({ title: '', priority: 'Medium', dueDate: '', leadIds: [] });
    loadData();
  };

  const toggleStatus = async (task: Task) => {
    const newStatus = task.status === 'Completed' ? 'Open' : 'Completed';
    // Optimistic update
    setTasks(tasks.map(t => t.id === task.id ? { ...t, status: newStatus } : t));
    await crmService.updateTask(task.id, { status: newStatus });
  };

  const handleDelete = async (taskId: string) => {
    if (confirm('Delete this task?')) {
      await crmService.deleteTask(taskId);
      setTasks(tasks.filter(t => t.id !== taskId));
    }
  };

  const filteredTasks = tasks.filter(t => {
    if (filter === 'All') return true;
    if (filter === 'Open') return t.status !== 'Completed';
    if (filter === 'Completed') return t.status === 'Completed';
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      <div className="flex items-center justify-between">
        <div>
           <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Tasks</h2>
           <p className="text-sm text-gray-500">Manage your daily to-dos.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
           <Plus size={16} /> New Task
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-800 pb-1">
         {['All', 'Open', 'Completed'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                filter === f 
                  ? 'border-gray-900 dark:border-white text-gray-900 dark:text-white' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {f}
            </button>
         ))}
      </div>

      {/* Task List */}
      <div className="space-y-2">
         {filteredTasks.length === 0 && (
            <div className="text-center py-12 text-gray-400">
               <p>No tasks found.</p>
            </div>
         )}
         {filteredTasks.map(task => (
           <GlassCard key={task.id} className="p-4 flex items-center gap-4 group hover:border-gray-300 dark:hover:border-gray-600 transition-all">
              <button onClick={() => toggleStatus(task)} className="text-gray-400 hover:text-emerald-500 transition-colors">
                  {task.status === 'Completed' ? (
                    <CheckCircle2 size={20} className="text-emerald-500" />
                  ) : (
                    <Circle size={20} />
                  )}
              </button>
              
              <div className="flex-1 min-w-0">
                 <p className={`text-sm font-medium truncate ${task.status === 'Completed' ? 'line-through text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                   {task.title}
                 </p>
                 <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                    {task.dueDate && (
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                    )}
                    {task.priority !== 'Medium' && (
                       <span className={`font-medium ${task.priority === 'High' ? 'text-orange-500' : 'text-gray-400'}`}>
                         {task.priority} Priority
                       </span>
                    )}
                    {task.leadIds?.length > 0 && (
                       <span className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-gray-600 dark:text-gray-300">
                          <Tag size={10} /> {task.leadIds.length} Linked Lead{task.leadIds.length > 1 ? 's' : ''}
                       </span>
                    )}
                 </div>
              </div>

              <button 
                onClick={() => handleDelete(task.id)}
                className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity p-2"
              >
                <Trash2 size={16} />
              </button>
           </GlassCard>
         ))}
      </div>

      {/* Create Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="New Task">
         <div className="space-y-4">
            <div>
               <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Task Title</label>
               <Input 
                 autoFocus 
                 value={newTask.title} 
                 onChange={e => setNewTask({...newTask, title: e.target.value})} 
                 placeholder="e.g. Call John regarding proposal"
               />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Due Date</label>
                  <Input 
                    type="date" 
                    value={newTask.dueDate} 
                    onChange={e => setNewTask({...newTask, dueDate: e.target.value})} 
                  />
               </div>
               <div>
                  <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Priority</label>
                  <select 
                    className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 text-sm text-gray-900 dark:text-white outline-none"
                    value={newTask.priority}
                    onChange={e => setNewTask({...newTask, priority: e.target.value as any})}
                  >
                     <option value="Low">Low</option>
                     <option value="Medium">Medium</option>
                     <option value="High">High</option>
                  </select>
               </div>
            </div>

            <div>
               <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-1.5 block">Link to Lead (Optional)</label>
               <select 
                 className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md px-3 py-2 text-sm text-gray-900 dark:text-white outline-none"
                 onChange={e => {
                   if (e.target.value) {
                     setNewTask({...newTask, leadIds: [e.target.value]});
                   } else {
                     setNewTask({...newTask, leadIds: []});
                   }
                 }}
               >
                  <option value="">Select a lead...</option>
                  {leads.map(lead => (
                     <option key={lead.id} value={lead.id}>{lead.name} ({lead.company})</option>
                  ))}
               </select>
            </div>

            <div className="pt-4 flex justify-end gap-2">
               <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
               <Button onClick={handleCreate}>Create Task</Button>
            </div>
         </div>
      </Modal>

    </div>
  );
};