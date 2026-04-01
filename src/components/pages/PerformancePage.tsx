import React, { useState } from 'react';
import PageHeader from '../molecules/PageHeader';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import Badge from '../atoms/Badge';
import Modal from '../organisms/Modal';
import FormField from '../molecules/FormField';
import { useNotification } from '../../context/NotificationContext';
import { Plus, TrendingUp, Star, MoreVertical, Search, Filter, Calendar, MessageSquare } from 'lucide-react';

interface PerformanceRecord {
  id: string; // PerformanceID
  employeeId: string; // EmployeeID
  name: string; // For display
  reviewDate: string; // ReviewDate
  score: number; // Score
  comments: string; // Comments
  status: 'Completed' | 'Pending';
}

const PerformancePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formValues, setFormValues] = useState({ id: '', employeeId: '', reviewDate: '', score: '', comments: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const { success, error, info } = useNotification();

  const [reviews] = useState<PerformanceRecord[]>([
    { id: 'PFM-001', employeeId: 'EMP-001', name: 'John Doe', reviewDate: '2026-01-15', score: 4.8, comments: 'Exceeds expectations in project delivery and leadership.', status: 'Completed' },
    { id: 'PFM-002', employeeId: 'EMP-005', name: 'Jane Smith', reviewDate: '2026-03-01', score: 4.2, comments: 'Team player, strong design skills. Needs to boost documentation.', status: 'Completed' },
    { id: 'PFM-003', employeeId: 'EMP-112', name: 'Robert Johnson', reviewDate: '2026-04-10', score: 0, comments: 'Scheduled for upcoming Q2 appraisal cycle.', status: 'Pending' },
    { id: 'PFM-004', employeeId: 'EMP-098', name: 'Sarah Williams', reviewDate: '2026-02-20', score: 4.5, comments: 'Consistently high output. Promoted to Senior role.', status: 'Completed' },
  ]);

  const filtered = reviews.filter(rev => 
    rev.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    rev.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rev.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formValues.id.trim()) errors.id = 'Performance ID is required';
    else if (!/^PFM-\d{3}$/.test(formValues.id)) errors.id = 'ID must be in PFM-XXX format';

    if (!formValues.employeeId.trim()) errors.employeeId = 'Employee ID is required';
    else if (!/^EMP-\d{3}$/.test(formValues.employeeId)) errors.employeeId = 'ID must be in EMP-XXX format';

    if (!formValues.reviewDate) errors.reviewDate = 'Review date is required';
    
    const scoreNum = parseFloat(formValues.score);
    if (!formValues.score) errors.score = 'Performance score is required';
    else if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 5) {
      errors.score = 'Score must be between 0 and 5';
    }

    if (!formValues.comments.trim()) errors.comments = 'Manager comments are required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      error('Please complete the appraisal form correctly.');
      return;
    }
    setIsModalOpen(false);
    success('New performance review successfully recorded.');
  };

  return (
    <div className="fade-in">
      <PageHeader 
        title="Performance Tracking" 
        description="Monitor staff achievements and review cycle historical records."
        actions={
          <div className="flex gap-sm">
            <Button variant="outline" leftIcon={<TrendingUp size={18} />} onClick={() => info('Opening Full performance Analytics Dashboard...')}>Analytics</Button>
            <Button variant="primary" leftIcon={<Plus size={18} />} onClick={() => { setFormValues({ id: '', employeeId: '', reviewDate: '', score: '', comments: '' }); setFormErrors({}); setIsModalOpen(true); }}>New Review</Button>
          </div>
        }
      />

      <div className="filters-row">
        <div className="search-wrapper">
          <div className="search-icon-fixed">
            <Icon icon={Search} size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Search performance ID, employee ID or name..." 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" leftIcon={<Filter size={18} />} onClick={() => info('Filter options: Currently showing all records.')}>Filter Range</Button>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Performance ID</th>
              <th>Employee ID</th>
              <th>Overall Score (/5.0)</th>
              <th>Review Date</th>
              <th>Manager Comments</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((rev) => (
              <tr key={rev.id}>
                <td><span style={{ fontWeight: 600 }}>{rev.id}</span></td>
                <td className="name-cell">
                  <div className="avatar-sm" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
                    {rev.name.charAt(0)}
                  </div>
                  <div className="cell-info">
                    <div className="cell-title">{rev.name}</div>
                    <div className="cell-subtitle">{rev.employeeId}</div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-xs">
                    {rev.score > 0 ? (
                      <>
                        <Icon icon={Star} size={16} fill="var(--warning)" color="var(--warning)" />
                        <span className="font-semibold" style={{ fontSize: '1rem' }}>{rev.score}</span>
                      </>
                    ) : (
                      <span style={{ color: 'var(--text-muted)' }}>TBD</span>
                    )}
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-xs" style={{ fontSize: '0.875rem' }}>
                    <Calendar size={14} color="var(--text-muted)" />
                    {rev.reviewDate}
                  </div>
                </td>
                <td>
                  <div className="flex gap-xs" style={{ maxWidth: '280px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                    <MessageSquare size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {rev.comments}
                    </span>
                  </div>
                </td>
                <td>
                  <Badge variant={rev.status === 'Completed' ? 'success' : 'warning'}>
                    {rev.status}
                  </Badge>
                </td>
                <td>
                  <div className="action-btns">
                    <button className="action-btn-circle" title="View Details" onClick={() => info('Detailed review view opened.')}><Icon icon={MoreVertical} size={16} /></button>
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
        title="New Performance Review Entry"
        footer={
          <div className="flex justify-end gap-sm">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => (document.getElementById('pfm-form') as HTMLFormElement)?.requestSubmit()}>Submit Appraisal</Button>
          </div>
        }
      >
        <form id="pfm-form" onSubmit={handleSubmit} className="flex-col gap-md">
          <FormField 
            label="Performance ID" 
            placeholder="e.g. PFM-445" 
            value={formValues.id}
            onChange={(e) => setFormValues({ ...formValues, id: e.target.value })}
            error={formErrors.id}
            required 
          />
          <FormField 
            label="Employee ID" 
            placeholder="e.g. EMP-220" 
            value={formValues.employeeId}
            onChange={(e) => setFormValues({ ...formValues, employeeId: e.target.value })}
            error={formErrors.employeeId}
            required 
          />
          <FormField 
            label="Review Date" 
            type="date" 
            value={formValues.reviewDate}
            onChange={(e) => setFormValues({ ...formValues, reviewDate: e.target.value })}
            error={formErrors.reviewDate}
            required 
          />
          <FormField 
            label="Score (0-5)" 
            type="number" 
            placeholder="5.0" 
            value={formValues.score}
            onChange={(e) => setFormValues({ ...formValues, score: e.target.value })}
            error={formErrors.score}
            required 
          />
          <FormField 
            label="Manager Overall Comments" 
            placeholder="Overall review summary..." 
            value={formValues.comments}
            onChange={(e) => setFormValues({ ...formValues, comments: e.target.value })}
            error={formErrors.comments}
            required 
          />
        </form>
      </Modal>
    </div>
  );
};

export default PerformancePage;
