import React, { useState, useRef } from 'react';
import { crmService } from '../services/crmService';
import { Button, Input, GlassCard } from './GlassUI';
import { Upload, ArrowRight, Check, AlertCircle } from 'lucide-react';
import { Lead } from '../types';

interface ImportWizardProps {
  isOpen: boolean;
  onClose: () => void;
  targetListId?: string;
  onComplete: () => void;
}

export const ImportWizard: React.FC<ImportWizardProps> = ({ isOpen, onClose, targetListId, onComplete }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [file, setFile] = useState<File | null>(null);
  const [headers, setHeaders] = useState<string[]>([]);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [mappings, setMappings] = useState<Record<string, string>>({});
  const [importStats, setImportStats] = useState<{ success: number; failed: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const LEAD_FIELDS = [
    { key: 'name', label: 'Full Name', required: true },
    { key: 'email', label: 'Email', required: false },
    { key: 'company', label: 'Company', required: false },
    { key: 'value', label: 'Value ($)', required: false },
  ];

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const data = await crmService.parseCSV(selectedFile);
      if (data.length > 0) {
        setHeaders(Object.keys(data[0]));
        setPreviewData(data.slice(0, 3));
        
        // Auto-map logic
        const autoMap: Record<string, string> = {};
        Object.keys(data[0]).forEach(header => {
          const lower = header.toLowerCase();
          if (lower.includes('name')) autoMap[header] = 'name';
          else if (lower.includes('email')) autoMap[header] = 'email';
          else if (lower.includes('company') || lower.includes('organization')) autoMap[header] = 'company';
          else if (lower.includes('value') || lower.includes('amount') || lower.includes('revenue')) autoMap[header] = 'value';
        });
        setMappings(autoMap);
        setStep(2);
      }
    }
  };

  const executeImport = async () => {
    if (!file) return;
    setLoading(true);
    
    try {
      const data = await crmService.parseCSV(file);
      const leadsToImport: Partial<Lead>[] = data.map((row: any) => {
        const lead: any = {};
        Object.entries(mappings).forEach(([header, field]) => {
          const h = header as string;
          const f = field as string;
          if (f && f !== 'ignore') {
            lead[f] = row[h];
          }
        });
        return lead;
      }).filter((l: any) => l.name); // Basic validation

      const stats = await crmService.importLeads(leadsToImport, targetListId);
      setImportStats(stats);
      setStep(3);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center">
          <div>
             <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Import Leads</h3>
             <p className="text-xs text-gray-500">Step {step} of 3</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto flex-1">
          {step === 1 && (
            <div className="text-center py-12 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <input type="file" accept=".csv" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
                <Upload size={24} />
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Click to upload CSV</p>
              <p className="text-xs text-gray-500 mt-1">or drag and drop file here</p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">Map your CSV columns to Lumina CRM fields.</p>
              
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-3">
                {headers.map(header => (
                  <div key={header} className="grid grid-cols-2 items-center gap-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{header}</p>
                      <p className="text-[10px] text-gray-500 truncate">Example: {previewData[0]?.[header]}</p>
                    </div>
                    <select 
                      className="text-xs p-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                      value={mappings[header] || ''}
                      onChange={(e) => setMappings({...mappings, [header]: e.target.value})}
                    >
                      <option value="ignore">Ignore</option>
                      {LEAD_FIELDS.map(f => (
                        <option key={f.key} value={f.key}>{f.label} {f.required && '*'}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && importStats && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
                <Check size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Import Complete</h3>
              <p className="text-gray-500 text-sm mb-6">Your leads have been processed.</p>
              
              <div className="flex justify-center gap-8 mb-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{importStats.success}</p>
                  <p className="text-xs text-gray-500">Imported</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{importStats.failed}</p>
                  <p className="text-xs text-gray-500">Failed/Skipped</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3 bg-gray-50/50 dark:bg-gray-900 rounded-b-xl">
           {step === 2 && (
             <Button onClick={executeImport} isLoading={loading}>Start Import</Button>
           )}
           {step === 3 && (
             <Button onClick={() => { onComplete(); onClose(); }}>Done</Button>
           )}
           {step === 1 && (
             <Button variant="ghost" onClick={onClose}>Cancel</Button>
           )}
        </div>
      </div>
    </div>
  );
};