import React, { useState } from 'react';
import { DollarSign, Download, Filter, Search, Plus, Eye, FileCheck, TrendingUp } from 'lucide-react';
import PageHeader from '../molecules/PageHeader';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import Icon from '../atoms/Icon';
import Modal from '../organisms/Modal';
import FormField from '../molecules/FormField';
import { useNotification } from '../../context/NotificationContext';
import styles from './PayrollPage.module.css';

interface PayrollRecord {
  payrollId: string;
  employeeId: string;
  name: string;
  basicSalary: number;
  deductions: number;
  netPay: number;
  payDate: string;
  status: 'Paid' | 'Processing' | 'Failed';
}

const PayrollPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [basicSalaryInput, setBasicSalaryInput] = useState(5000);
  const [deductionInput, setDeductionInput] = useState(250);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { success, error, info } = useNotification();

  const calculateNetPay = (basic: number, ded: number) => basic - ded;

  const [history] = useState<PayrollRecord[]>([
    { 
      payrollId: 'PR-2026-001', 
      employeeId: 'EMP-101', 
      name: 'John Doe', 
      basicSalary: 5200, 
      deductions: 450, 
      netPay: 4750, 
      payDate: '2026-03-30',
      status: 'Paid' 
    },
    { 
      payrollId: 'PR-2026-002', 
      employeeId: 'EMP-105', 
      name: 'Jane Smith', 
      basicSalary: 6100, 
      deductions: 600, 
      netPay: 5500, 
      payDate: '2026-03-30',
      status: 'Paid' 
    },
    { 
      payrollId: 'PR-2026-003', 
      employeeId: 'EMP-112', 
      name: 'Michael Brown', 
      basicSalary: 4800, 
      deductions: 300, 
      netPay: 4500, 
      payDate: '2026-03-30',
      status: 'Processing' 
    },
  ]);

  const filteredHistory = history.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.payrollId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validatePayroll = () => {
    const errors: Record<string, string> = {};
    if (basicSalaryInput <= 0) errors.basic = 'Standard salary must be a positive value';
    if (deductionInput < 0) errors.deductions = 'Deductions cannot be negative';
    if (deductionInput > basicSalaryInput) errors.deductions = 'Deductions exceed basic salary limits';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProcessPayroll = () => {
    setFormErrors({});
    setIsModalOpen(true);
  };

  const confirmPayrollProcess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePayroll()) {
      error('Configuration check failed. Please review values.');
      return;
    }
    setIsModalOpen(false);
    success('Monthly payroll cycle successfully initiated.');
  };

  const handleSaveAdjustment = () => {
    if (!validatePayroll()) {
      error('Validation failed for global adjustment.');
      return;
    }
    success(`Standard adjustment of $${basicSalaryInput.toLocaleString()} stored as default.`);
  };

  const handleExport = () => {
    info('Generating Payroll PDF Report... Download will start automatically.');
  };

  return (
    <div className="fade-in">
      <PageHeader 
        title="Payroll Management" 
        description="Oversee employee compensation, deductions, and payment historical logs."
        actions={
          <div className="flex gap-sm">
            <Button variant="outline" icon={TrendingUp} onClick={handleExport}>Report</Button>
            <Button variant="primary" icon={Plus} onClick={handleProcessPayroll}>Process Payroll</Button>
          </div>
        }
      />

      <div className={styles.topSection}>
        <div className="card" style={{ flex: 1 }}>
          <div className="flex items-center gap-sm mb-md">
            <div className="avatar-sm" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
              <Icon icon={DollarSign} size={20} />
            </div>
            <h3 style={{ fontSize: '1.25rem' }}>Salary Calculator</h3>
          </div>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-md)' }}>
            <FormField 
              label="Adjust Basic ($)" 
              type="number" 
              value={basicSalaryInput.toString()} 
              onChange={(e) => setBasicSalaryInput(Number(e.target.value))} 
              error={formErrors.basic}
            />
            <FormField 
              label="Adjust Deductions ($)" 
              type="number" 
              value={deductionInput.toString()} 
              onChange={(e) => setDeductionInput(Number(e.target.value))} 
              error={formErrors.deductions}
            />
            <div style={{ background: 'linear-gradient(135deg, var(--surface-hover) 0%, var(--background) 100%)', padding: '1.25rem', borderRadius: 'var(--radius-lg)', border: '1.5px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Preview Net Pay</span>
              <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--success)' }}>
                ${calculateNetPay(basicSalaryInput, deductionInput).toLocaleString()}
              </span>
            </div>
          </div>
          <Button variant="primary" leftIcon={<Icon icon={FileCheck} size={18} />} style={{ marginTop: '1.5rem' }} onClick={handleSaveAdjustment}>Apply Calculation</Button>
        </div>

        <div className="card glass" style={{ width: '320px', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>Payroll Summary</h3>
          <div className={styles.summaryBox}>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Next Run</span>
              <Badge variant="primary">12 Apr 2026</Badge>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Disbursed</span>
              <span className={styles.infoValue} style={{ color: 'var(--success)', fontWeight: 800 }}>$142,500</span>
            </div>
            <div className={styles.infoRow}>
              <span className={styles.infoLabel}>Total Tax</span>
              <span className={styles.infoValue}>$12,400</span>
            </div>
          </div>
          <div style={{ height: '4px', background: 'var(--border)', borderRadius: '2px', overflow: 'hidden' }}>
             <div style={{ width: '85%', height: '100%', background: 'var(--primary)' }} />
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>85% of monthly cycle completed.</div>
        </div>
      </div>

      <div className="filters-row mt-xl">
        <div className="search-wrapper">
          <div className="search-icon-fixed">
            <Icon icon={Search} size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Search payroll ID, employee or name..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" leftIcon={<Filter size={18} />} onClick={() => info('Filter options: Currently showing March 2026.')}>March 2026</Button>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Payroll ID</th>
              <th>Employee</th>
              <th>Basic Salary</th>
              <th>Deductions</th>
              <th>Net Pay</th>
              <th>Pay Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.map((record) => (
              <tr key={record.payrollId}>
                <td><span style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>{record.payrollId}</span></td>
                <td className="name-cell">
                  <div className="avatar-sm">{record.name.charAt(0)}</div>
                  <div className="cell-info">
                    <div className="cell-title">{record.name}</div>
                    <div className="cell-subtitle">{record.employeeId}</div>
                  </div>
                </td>
                <td>${record.basicSalary.toLocaleString()}</td>
                <td style={{ color: 'var(--error)' }}>-${record.deductions.toLocaleString()}</td>
                <td style={{ fontWeight: 700, color: 'var(--success)' }}>${record.netPay.toLocaleString()}</td>
                <td>{record.payDate}</td>
                <td>
                  <Badge variant={
                    record.status === 'Paid' ? 'success' : 
                    record.status === 'Processing' ? 'warning' : 'error'
                  }>
                    {record.status}
                  </Badge>
                </td>
                <td>
                  <div className="action-btns">
                    <button className="action-btn-circle" title="View Payslip" onClick={() => info(`Opening payslip for ${record.payrollId}`)}><Icon icon={Eye} size={16} /></button>
                    <button className="action-btn-circle" title="Download PDF" onClick={() => success('PDF Download initiated.') }><Icon icon={Download} size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Execute Monthly Payroll"
        footer={
          <>
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Discard</Button>
            <Button variant="primary" onClick={() => (document.getElementById('payroll-form') as HTMLFormElement)?.requestSubmit()}>Execute Disbursement</Button>
          </>
        }
      >
        <form id="payroll-form" onSubmit={confirmPayrollProcess} className="flex-col gap-lg">
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem' }}>
            Adjust global payroll parameters for all active employees. This will perform an automated disbursement calculation.
          </p>
          
          <div className="grid gap-md" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <FormField 
              label="Standard Basic ($)" 
              type="number" 
              value={basicSalaryInput.toString()} 
              onChange={(e) => setBasicSalaryInput(Number(e.target.value))} 
              error={formErrors.basic}
              required 
            />
            <FormField 
              label="Standard Deductions ($)" 
              type="number" 
              value={deductionInput.toString()} 
              onChange={(e) => setDeductionInput(Number(e.target.value))} 
              error={formErrors.deductions}
              required 
            />
          </div>

          <div style={{ background: 'var(--surface-hover)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '2px dashed var(--border)' }}>
             <div className="flex justify-between items-center">
                <div>
                   <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>Individual Net Yield</div>
                   <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--success)' }}>
                      ${calculateNetPay(basicSalaryInput, deductionInput).toLocaleString()}
                   </div>
                </div>
                <Button variant="outline" size="sm" type="button" onClick={handleSaveAdjustment}>Set Default</Button>
             </div>
          </div>

          <div className="flex justify-between items-center mt-sm pt-sm" style={{ borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
               <Badge variant="primary">142 STAFF</Badge>
               <Badge variant="success">$48,250 ESTIMATED TOTAL</Badge>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default PayrollPage;
