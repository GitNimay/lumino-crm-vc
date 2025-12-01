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

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'In Progress' | 'Completed' | 'Archived';
  dueDate?: string;
  leadIds: string[]; // Array of UUIDs
  createdAt: string;
}

export interface List {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  leadCount?: number; // Aggregated
}

export interface KPIMetric {
  label: string;
  value: string | number;
  change: number; // percentage
  trend: 'up' | 'down' | 'neutral';
}

export interface DashboardStats {
  totalLeads: number;
  leadsTrend: number;
  pipelineValue: number;
  pipelineTrend: number;
  conversionRate: number;
  conversionTrend: number;
  activeDeals: number;
  dealsTrend: number;
}