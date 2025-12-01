import { Lead, PipelineStage, LeadStatus, DashboardStats } from '../types';

// Mock Data
const MOCK_LEADS: Lead[] = [
  {
    id: '1',
    name: 'Alice Freeman',
    company: 'Nexus Tech',
    email: 'alice@nexustech.com',
    value: 12000,
    stage: PipelineStage.NEW,
    status: LeadStatus.ACTIVE,
    tags: ['SaaS', 'High Priority'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    lastActivity: new Date().toISOString(),
    avatarUrl: 'https://picsum.photos/100/100?random=1'
  },
  {
    id: '2',
    name: 'Bob Smith',
    company: 'Global Corp',
    email: 'bob@globalcorp.com',
    value: 45000,
    stage: PipelineStage.CONTACTED,
    status: LeadStatus.ACTIVE,
    tags: ['Enterprise', 'Q4'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    lastActivity: new Date().toISOString(),
    avatarUrl: 'https://picsum.photos/100/100?random=2'
  },
  {
    id: '3',
    name: 'Charlie Davis',
    company: 'StartUp Inc',
    email: 'charlie@startup.io',
    value: 5000,
    stage: PipelineStage.QUALIFIED,
    status: LeadStatus.ACTIVE,
    tags: ['Referral'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    lastActivity: new Date().toISOString(),
    avatarUrl: 'https://picsum.photos/100/100?random=3'
  },
  {
    id: '4',
    name: 'Diana Prince',
    company: 'Themyscira Ltd',
    email: 'diana@themyscira.com',
    value: 85000,
    stage: PipelineStage.PROPOSAL,
    status: LeadStatus.ACTIVE,
    tags: ['Enterprise', 'Warm'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString(),
    lastActivity: new Date().toISOString(),
    avatarUrl: 'https://picsum.photos/100/100?random=4'
  },
  {
    id: '5',
    name: 'Evan Wright',
    company: 'Wright Design',
    email: 'evan@wright.design',
    value: 3200,
    stage: PipelineStage.WON,
    status: LeadStatus.CLOSED,
    tags: ['Design', 'Quick Win'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString(),
    lastActivity: new Date().toISOString(),
    avatarUrl: 'https://picsum.photos/100/100?random=5'
  },
  {
    id: '6',
    name: 'Fiona Gallagher',
    company: 'Shameless PR',
    email: 'fiona@shameless.pr',
    value: 1500,
    stage: PipelineStage.NEW,
    status: LeadStatus.COLD,
    tags: ['Outbound'],
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    lastActivity: new Date().toISOString(),
  }
];

// Simulating async API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

class CrmService {
  private leads: Lead[] = [...MOCK_LEADS];

  async getLeads(): Promise<Lead[]> {
    await delay(600); // Simulate network latency
    return [...this.leads];
  }

  async getDashboardStats(): Promise<DashboardStats> {
    await delay(400);
    const totalLeads = this.leads.length;
    const pipelineValue = this.leads.reduce((acc, lead) => acc + (lead.stage !== PipelineStage.LOST ? lead.value : 0), 0);
    const wonLeads = this.leads.filter(l => l.stage === PipelineStage.WON).length;
    const closedLeads = this.leads.filter(l => l.stage === PipelineStage.WON || l.stage === PipelineStage.LOST).length;
    const conversionRate = closedLeads > 0 ? (wonLeads / closedLeads) * 100 : 0;
    const activeDeals = this.leads.filter(l => l.status === LeadStatus.ACTIVE).length;

    return {
      totalLeads,
      pipelineValue,
      conversionRate,
      activeDeals
    };
  }

  async updateLeadStage(leadId: string, newStage: PipelineStage): Promise<Lead | null> {
    await delay(200);
    const leadIndex = this.leads.findIndex(l => l.id === leadId);
    if (leadIndex > -1) {
      const updatedLead = { 
        ...this.leads[leadIndex], 
        stage: newStage, 
        lastActivity: new Date().toISOString() 
      };
      // Determine status update based on stage for convenience
      if (newStage === PipelineStage.WON || newStage === PipelineStage.LOST) {
        updatedLead.status = LeadStatus.CLOSED;
      } else {
        updatedLead.status = LeadStatus.ACTIVE;
      }
      
      this.leads[leadIndex] = updatedLead;
      return updatedLead;
    }
    return null;
  }

  async createLead(leadData: Partial<Lead>): Promise<Lead> {
    await delay(500);
    const newLead: Lead = {
      id: Math.random().toString(36).substr(2, 9),
      name: leadData.name || 'Unknown Lead',
      company: leadData.company || 'Unknown Company',
      email: leadData.email || '',
      value: leadData.value || 0,
      stage: PipelineStage.NEW,
      status: LeadStatus.ACTIVE,
      tags: leadData.tags || [],
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString(),
      avatarUrl: `https://picsum.photos/100/100?random=${Math.floor(Math.random() * 1000)}`
    };
    this.leads = [newLead, ...this.leads];
    return newLead;
  }

  async deleteLead(id: string): Promise<boolean> {
    await delay(300);
    this.leads = this.leads.filter(l => l.id !== id);
    return true;
  }
}

export const crmService = new CrmService();
