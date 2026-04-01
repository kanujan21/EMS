import React from 'react';
import PageHeader from '../molecules/PageHeader';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import Badge from '../atoms/Badge';
import { FileText, Download, BarChart2, PieChart, Users, DollarSign, Calendar, TrendingUp } from 'lucide-react';
import styles from './DashboardPage.module.css';

const ReportsPage: React.FC = () => {
  const reportTypes = [
    { 
      id: '1', 
      title: 'Employee Directory', 
      description: 'Complete list of active and inactive staff with full details.', 
      icon: Users, 
      color: '#3b82f6',
      lastGenerated: 'Today, 10:45 AM'
    },
    { 
      id: '2', 
      title: 'Payroll Summary', 
      description: 'Monthly financial breakdown of salaries, taxes, and deductions.', 
      icon: DollarSign, 
      color: '#10b981',
      lastGenerated: 'Yesterday, 5:30 PM'
    },
    { 
      id: '3', 
      title: 'Leave Utilization', 
      description: 'Attendance patterns, leave balances, and department absence rates.', 
      icon: Calendar, 
      color: '#f59e0b',
      lastGenerated: '2 days ago'
    },
    { 
      id: '4', 
      title: 'Performance Analytics', 
      description: 'Aggregated performance history and annual appraisal summaries.', 
      icon: BarChart2, 
      color: '#8b5cf6',
      lastGenerated: 'March 15, 2026'
    },
    { 
      id: '5', 
      title: 'Growth Trends', 
      description: 'Hiring trends, turnover rates, and projected workforce growth.', 
      icon: TrendingUp, 
      color: '#ef4444',
      lastGenerated: 'Never'
    },
  ];

  const handleExport = () => {
    alert('Preparing Batch Export... All modules (Employees, Payroll, Leaves) are being compressed for download.');
  };

  const handleGenerate = (title: string) => {
    alert(`Generating ${title} document in High-Resolution PDF...`);
  };

  return (
    <div className="fade-in">
      <PageHeader 
        title="Reports & Analytics" 
        description="Generate and export comprehensive data reports for your organization."
        actions={
          <div className="flex gap-sm">
            <Button variant="outline" leftIcon={<PieChart size={18} />} onClick={() => alert('Switching to data visualization view...')}>Visualization Mode</Button>
            <Button variant="primary" leftIcon={<Download size={18} />} onClick={handleExport}>Batch Export</Button>
          </div>
        }
      />

      <div className={styles.statsGrid}>
        {reportTypes.map((report) => (
          <div key={report.id} className="card flex-col gap-md">
            <div className="flex items-center justify-between">
              <div 
                className="flex items-center justify-center" 
                style={{ 
                  background: `${report.color}15`, 
                  color: report.color,
                  width: '3.5rem',
                  height: '3.5rem',
                  borderRadius: 'var(--radius-lg)'
                }}
              >
                <Icon icon={report.icon} size={28} />
              </div>
              <Badge variant="secondary">PDF / XLSX</Badge>
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{report.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.4' }}>{report.description}</p>
            </div>
            
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: '0.5rem' }}>
              <div className="flex items-center justify-between" style={{ marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Last Generated:</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{report.lastGenerated}</span>
              </div>
              <div className="flex gap-sm">
                <Button variant="outline" leftIcon={<FileText size={16} />} fullWidth onClick={() => alert(`Configuring ${report.title} parameters...`)}>Configure</Button>
                <Button variant="secondary" leftIcon={<Download size={16} />} onClick={() => handleGenerate(report.title)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsPage;
