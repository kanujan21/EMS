import React, { useState } from 'react';
import { Plus, Download, Filter, Search, Calendar, User } from 'lucide-react';
import PageHeader from '../molecules/PageHeader';
import Button from '../atoms/Button';
import Badge from '../atoms/Badge';
import Icon from '../atoms/Icon';
import Modal from '../organisms/Modal';
import FormField from '../molecules/FormField';
import { useNotification } from '../../hooks/useNotification';
import styles from './LeavePage.module.css';

interface LeaveRecord {
  leaveId: string; // LeaveID
  employeeId: string; // EmployeeID
  name: string; // For display
  leaveType: string; // LeaveType
  startDate: string; // StartDate
  endDate: string; // EndDate
  status: 'Approved' | 'Pending' | 'Rejected'; // Status
}

const LeavePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({ leaveType: '', startDate: '', endDate: '', reason: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const { success, error, info } = useNotification();

  const leaves: LeaveRecord[] = [
    { leaveId: 'LEA-001', employeeId: 'EMP-001', name: 'John Doe', leaveType: 'Sick Leave', startDate: '2026-03-20', endDate: '2026-03-22', status: 'Approved' },
    { leaveId: 'LEA-002', employeeId: 'EMP-005', name: 'Jane Smith', leaveType: 'Vacation', startDate: '2026-04-01', endDate: '2026-04-10', status: 'Pending' },
    { leaveId: 'LEA-003', employeeId: 'EMP-012', name: 'Robert Johnson', leaveType: 'Personal', startDate: '2026-03-25', endDate: '2026-03-25', status: 'Rejected' },
    { leaveId: 'LEA-004', employeeId: 'EMP-023', name: 'Michael Brown', leaveType: 'Casual', startDate: '2026-03-28', endDate: '2026-03-30', status: 'Approved' },
  ];

  const filtered = leaves.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.leaveId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formValues.leaveType.trim()) errors.leaveType = 'Leave type is required';
    if (!formValues.startDate) errors.startDate = 'Start date is required';
    if (!formValues.endDate) errors.endDate = 'End date is required';
    else if (new Date(formValues.endDate) < new Date(formValues.startDate)) {
      errors.endDate = 'End date cannot be before start date';
    }
    if (!formValues.reason.trim()) errors.reason = 'Reason for leave is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      error('Please complete the leave request form correctly.');
      return;
    }
    setIsModalOpen(false);
    success('Leave request submitted successfully for approval.');
  };

  return (
    <div className="fade-in">
      <PageHeader 
        title="Leave Management" 
        description="Track and process organizational leave requests."
        actions={
          <Button variant="primary" leftIcon={<Plus size={18} />} onClick={() => { setFormValues({ leaveType: '', startDate: '', endDate: '', reason: '' }); setFormErrors({}); setIsModalOpen(true); }}>
            New Request
          </Button>
        }
      />

      <div className="filters-row">
        <div className="search-wrapper">
          <div className="search-icon-fixed">
            <Icon icon={Search} size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Search leave ID, employee ID or name..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" leftIcon={<Filter size={18} />} onClick={() => info('Filter options: Currently showing all request types.')}>Filter Types</Button>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Leave ID</th>
              <th>Employee ID</th>
              <th>Type</th>
              <th>Dates</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((leave) => (
              <tr key={leave.leaveId}>
                <td><span style={{ fontWeight: 600 }}>{leave.leaveId}</span></td>
                <td className="name-cell">
                  <div className="avatar-sm" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
                    <Icon icon={User} size={18} />
                  </div>
                  <div className="cell-info">
                    <div className="cell-title">{leave.name}</div>
                    <div className="cell-subtitle">{leave.employeeId}</div>
                  </div>
                </td>
                <td>{leave.leaveType}</td>
                <td>
                  <div className="flex items-center gap-xs" style={{ fontSize: '0.875rem' }}>
                    <Calendar size={14} color="var(--text-muted)" />
                    {leave.startDate} → {leave.endDate}
                  </div>
                </td>
                <td>
                  <Badge variant={leave.status === 'Approved' ? 'success' : leave.status === 'Pending' ? 'warning' : 'error'}>
                    {leave.status}
                  </Badge>
                </td>
                <td>
                  <div className="action-btns">
                    <button className="action-btn-circle" title="View Details" onClick={() => info(`Viewing details for request ${leave.leaveId}`)}>Details</button>
                    <button className="action-btn-circle" title="Download Report" onClick={() => success('Report download started.')}><Icon icon={Download} size={16} /></button>
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
        title="Submit Leave Request"
        footer={
          <div className="flex justify-end gap-sm">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => (document.getElementById('leave-form') as HTMLFormElement)?.requestSubmit()}>Submit Request</Button>
          </div>
        }
      >
        <form id="leave-form" className={styles.form} onSubmit={handleSubmit}>
           <div className={styles.dateGrid}>
            <FormField label="Employee ID" value="EMP-001" disabled />
            <FormField 
              label="Leave Type" 
              placeholder="e.g. Sick, Vacation" 
              value={formValues.leaveType}
              onChange={(e) => setFormValues({ ...formValues, leaveType: e.target.value })}
              error={formErrors.leaveType}
              required 
            />
          </div>
          <div className={styles.dateGrid}>
            <FormField 
              label="Start Date" 
              type="date" 
              value={formValues.startDate}
              onChange={(e) => setFormValues({ ...formValues, startDate: e.target.value })}
              error={formErrors.startDate}
              required 
            />
            <FormField 
              label="End Date" 
              type="date" 
              value={formValues.endDate}
              onChange={(e) => setFormValues({ ...formValues, endDate: e.target.value })}
              error={formErrors.endDate}
              required 
            />
          </div>
          <FormField 
            label="Reason & Comments" 
            placeholder="Brief reason for leave" 
            value={formValues.reason}
            onChange={(e) => setFormValues({ ...formValues, reason: e.target.value })}
            error={formErrors.reason}
            required 
          />
        </form>
      </Modal>
    </div>
  );
};

export default LeavePage;
