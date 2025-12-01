export enum PipelineStage {
  NEW = 'New',
  CONTACTED = 'Contacted',
  QUALIFIED = 'Qualified',
  PROPOSAL = 'Proposal',
  WON = 'Won',
  LOST = 'Lost'
}

export enum LeadStatus {
  ACTIVE = 'Active',
  COLD = 'Cold',
  CLOSED = 'Closed'
}

export interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone?: string;
  value: number;
  stage: PipelineStage;
  status: LeadStatus;
  tags: string[];
  createdAt: string; // ISO date string
  lastActivity: string; // ISO date string
  avatarUrl?: string;
}

export interface KPIMetric {
  label: string;
  value: string | number;
  change: number; // percentage
  trend: 'up' | 'down' | 'neutral';
}

export interface DashboardStats {
  totalLeads: number;
  pipelineValue: number;
  conversionRate: number;
  activeDeals: number;
}
