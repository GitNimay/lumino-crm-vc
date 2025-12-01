import { supabase } from '../lib/supabase';
import { Lead, PipelineStage, LeadStatus, DashboardStats, Task, List } from '../types';
import Papa from 'papaparse';

class CrmService {
  
  // --- HELPERS ---
  private mapRowToLead(row: any): Lead {
    return {
      id: row.id,
      name: row.name,
      company: row.company,
      email: row.email,
      phone: row.phone,
      value: Number(row.value),
      stage: row.stage as PipelineStage,
      status: row.status as LeadStatus,
      tags: row.tags || [],
      createdAt: row.created_at,
      lastActivity: row.last_activity,
      avatarUrl: row.avatar_url,
    };
  }

  private mapRowToTask(row: any): Task {
    return {
      id: row.id,
      title: row.title,
      description: row.description,
      priority: row.priority,
      status: row.status,
      dueDate: row.due_date,
      leadIds: row.lead_ids || [],
      createdAt: row.created_at,
    };
  }

  private mapRowToList(row: any): List {
    return {
      id: row.id,
      name: row.name,
      description: row.description,
      createdAt: row.created_at,
      leadCount: row.lead_count || 0, 
    };
  }

  // --- LEADS ---

  async getLeads(listId?: string): Promise<Lead[]> {
    let query = supabase
      .from('leads')
      .select('*')
      .order('last_activity', { ascending: false });

    if (listId) {
      const { data: membershipData, error: membershipError } = await supabase
        .from('list_memberships')
        .select('lead_id')
        .eq('list_id', listId);

      if (membershipError) throw membershipError;
      
      const leadIds = membershipData.map((m: any) => m.lead_id);
      query = query.in('id', leadIds);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching leads:', error);
      return [];
    }

    return data.map(this.mapRowToLead);
  }

  async createLead(leadData: Partial<Lead>): Promise<Lead | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Handle potential string values from CSV import (e.g., "$1,000")
    let cleanValue = 0;
    if (leadData.value !== undefined) {
      if (typeof leadData.value === 'string') {
        const numStr = (leadData.value as string).replace(/[^0-9.-]+/g, "");
        cleanValue = parseFloat(numStr) || 0;
      } else {
        cleanValue = Number(leadData.value);
      }
    }

    const newLead = {
      user_id: user.id,
      name: leadData.name || 'Unknown Lead',
      company: leadData.company || 'Unknown Company',
      email: leadData.email || '',
      value: cleanValue,
      stage: PipelineStage.NEW,
      status: LeadStatus.ACTIVE,
      tags: leadData.tags || [],
      last_activity: new Date().toISOString(),
      avatar_url: `https://picsum.photos/100/100?random=${Math.floor(Math.random() * 1000)}`
    };

    const { data, error } = await supabase
      .from('leads')
      .insert(newLead)
      .select()
      .single();

    if (error) {
      console.error('Error creating lead:', error);
      return null;
    }

    return this.mapRowToLead(data);
  }

  async updateLeadStage(leadId: string, newStage: PipelineStage): Promise<Lead | null> {
    let newStatus = LeadStatus.ACTIVE;
    if (newStage === PipelineStage.WON || newStage === PipelineStage.LOST) {
      newStatus = LeadStatus.CLOSED;
    }

    const { data, error } = await supabase
      .from('leads')
      .update({ 
        stage: newStage, 
        status: newStatus,
        last_activity: new Date().toISOString() 
      })
      .eq('id', leadId)
      .select()
      .single();

    if (error) {
      console.error('Error updating lead:', error);
      return null;
    }

    return this.mapRowToLead(data);
  }

  async updateLead(leadId: string, updates: Partial<Lead>): Promise<Lead | null> {
    const dbUpdates: any = { ...updates };
    if (updates.stage) dbUpdates.stage = updates.stage;
    if (updates.status) dbUpdates.status = updates.status;
    delete dbUpdates.id;
    delete dbUpdates.createdAt;
    dbUpdates.last_activity = new Date().toISOString();

    const { data, error } = await supabase
      .from('leads')
      .update(dbUpdates)
      .eq('id', leadId)
      .select()
      .single();

    if (error) return null;
    return this.mapRowToLead(data);
  }

  async deleteLead(id: string): Promise<boolean> {
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting lead:', error);
      return false;
    }
    return true;
  }

  // --- TASKS ---

  async getTasks(leadId?: string): Promise<Task[]> {
    let query = supabase.from('tasks').select('*').order('due_date', { ascending: true });

    if (leadId) {
      query = query.contains('lead_ids', [leadId]);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
    return data.map(this.mapRowToTask);
  }

  async createTask(taskData: Partial<Task>): Promise<Task | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    const newTask = {
      user_id: user.id,
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority || 'Medium',
      status: taskData.status || 'Open',
      due_date: taskData.dueDate,
      lead_ids: taskData.leadIds || []
    };

    const { data, error } = await supabase.from('tasks').insert(newTask).select().single();
    if (error) {
      console.error('Error creating task:', error);
      return null;
    }
    return this.mapRowToTask(data);
  }

  async updateTask(taskId: string, updates: Partial<Task>): Promise<Task | null> {
    const dbUpdates: any = { ...updates };
    if (updates.dueDate) dbUpdates.due_date = updates.dueDate;
    if (updates.leadIds) dbUpdates.lead_ids = updates.leadIds;
    delete dbUpdates.id;
    delete dbUpdates.createdAt;

    const { data, error } = await supabase.from('tasks').update(dbUpdates).eq('id', taskId).select().single();
    if (error) return null;
    return this.mapRowToTask(data);
  }

  async deleteTask(taskId: string): Promise<boolean> {
    const { error } = await supabase.from('tasks').delete().eq('id', taskId);
    return !error;
  }

  // --- LISTS ---

  async getLists(): Promise<List[]> {
    const { data, error } = await supabase.from('lists').select('*').order('name');
    if (error) return [];
    
    const lists = data.map(this.mapRowToList);
    
    for (const list of lists) {
       const { count } = await supabase.from('list_memberships').select('*', { count: 'exact', head: true }).eq('list_id', list.id);
       list.leadCount = count || 0;
    }
    
    return lists;
  }

  async createList(name: string, description?: string): Promise<List | null> {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase.from('lists').insert({ user_id: user.id, name, description }).select().single();
    if (error) return null;
    return this.mapRowToList(data);
  }

  async deleteList(listId: string): Promise<boolean> {
    const { error } = await supabase.from('lists').delete().eq('id', listId);
    return !error;
  }

  async addLeadsToList(listId: string, leadIds: string[]): Promise<boolean> {
    const rows = leadIds.map(leadId => ({ list_id: listId, lead_id: leadId }));
    const { error } = await supabase.from('list_memberships').upsert(rows, { onConflict: 'list_id,lead_id' });
    return !error;
  }

  // --- IMPORT / EXPORT ---

  parseCSV(file: File): Promise<any[]> {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => resolve(results.data),
        error: (err) => reject(err),
      });
    });
  }

  async importLeads(leads: Partial<Lead>[], listId?: string): Promise<{ success: number; failed: number }> {
    let success = 0;
    let failed = 0;

    for (const lead of leads) {
      const created = await this.createLead(lead);
      if (created) {
        success++;
        if (listId) {
          await this.addLeadsToList(listId, [created.id]);
        }
      } else {
        failed++;
      }
    }
    return { success, failed };
  }

  async exportLeads(leads: Lead[]) {
    const csv = Papa.unparse(leads.map(l => ({
      ID: l.id,
      Name: l.name,
      Company: l.company,
      Email: l.email,
      Value: l.value,
      Stage: l.stage,
      Status: l.status,
      Tags: l.tags.join(', '),
      Created: l.createdAt
    })));

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_export_${new Date().toISOString().slice(0,10)}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // --- STATS ---

  async getDashboardStats(): Promise<DashboardStats> {
    const { data: leads, error } = await supabase
      .from('leads')
      .select('*');

    if (error || !leads) {
      return {
        totalLeads: 0,
        leadsTrend: 0,
        pipelineValue: 0,
        pipelineTrend: 0,
        conversionRate: 0,
        conversionTrend: 0,
        activeDeals: 0,
        dealsTrend: 0
      };
    }

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonth = lastMonthDate.getMonth();
    const lastYear = lastMonthDate.getFullYear();

    const isMonth = (dateStr: string, month: number, year: number) => {
        const d = new Date(dateStr);
        return d.getMonth() === month && d.getFullYear() === year;
    };

    const activeLeads = leads.filter(l => l.status === LeadStatus.ACTIVE);
    const pipelineValue = activeLeads.reduce((acc, lead) => acc + (lead.stage !== PipelineStage.LOST ? Number(lead.value) : 0), 0);

    const valThisMonth = leads.filter(l => isMonth(l.created_at, currentMonth, currentYear)).reduce((acc, l) => acc + Number(l.value), 0);
    const valLastMonth = leads.filter(l => isMonth(l.created_at, lastMonth, lastYear)).reduce((acc, l) => acc + Number(l.value), 0);
    const pipelineTrend = valLastMonth === 0 ? (valThisMonth > 0 ? 100 : 0) : ((valThisMonth - valLastMonth) / valLastMonth) * 100;

    const totalLeads = activeLeads.length;
    const countThisMonth = leads.filter(l => isMonth(l.created_at, currentMonth, currentYear)).length;
    const countLastMonth = leads.filter(l => isMonth(l.created_at, lastMonth, lastYear)).length;
    const leadsTrend = countLastMonth === 0 ? (countThisMonth > 0 ? 100 : 0) : ((countThisMonth - countLastMonth) / countLastMonth) * 100;

    const wonLeads = leads.filter(l => l.stage === PipelineStage.WON).length;
    const closedLeads = leads.filter(l => l.stage === PipelineStage.WON || l.stage === PipelineStage.LOST).length;
    const conversionRate = closedLeads > 0 ? (wonLeads / closedLeads) * 100 : 0;

    const closedThisMonth = leads.filter(l => (l.stage === PipelineStage.WON || l.stage === PipelineStage.LOST) && isMonth(l.updated_at, currentMonth, currentYear));
    const wonThisMonthCount = closedThisMonth.filter(l => l.stage === PipelineStage.WON).length;
    const rateThisMonth = closedThisMonth.length > 0 ? (wonThisMonthCount / closedThisMonth.length) * 100 : 0;

    const closedLastMonth = leads.filter(l => (l.stage === PipelineStage.WON || l.stage === PipelineStage.LOST) && isMonth(l.updated_at, lastMonth, lastYear));
    const wonLastMonthCount = closedLastMonth.filter(l => l.stage === PipelineStage.WON).length;
    const rateLastMonth = closedLastMonth.length > 0 ? (wonLastMonthCount / closedLastMonth.length) * 100 : 0;
    
    const conversionTrend = rateThisMonth - rateLastMonth;

    const dealStages = [PipelineStage.QUALIFIED, PipelineStage.PROPOSAL, PipelineStage.CONTACTED];
    const activeDealsList = leads.filter(l => dealStages.includes(l.stage as PipelineStage) && l.status === LeadStatus.ACTIVE);
    const activeDeals = activeDealsList.length;
    const dealsTrend = leadsTrend; 

    return {
      totalLeads,
      leadsTrend,
      pipelineValue,
      pipelineTrend,
      conversionRate,
      conversionTrend,
      activeDeals,
      dealsTrend
    };
  }

  subscribeToLeads(callback: () => void) {
    return supabase
      .channel('leads-changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'leads' },
        (payload) => {
          callback();
        }
      )
      .subscribe();
  }
}

export const crmService = new CrmService();