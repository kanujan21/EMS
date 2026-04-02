import React, { useState } from 'react';
import PageHeader from '../molecules/PageHeader';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import Badge from '../atoms/Badge';
import Modal from '../organisms/Modal';
import ConfirmModal from '../organisms/ConfirmModal';
import FormField from '../molecules/FormField';
import { useNotification } from '../../hooks/useNotification';
import { Plus, Briefcase, DollarSign, Edit2, Trash2, Search, Filter } from 'lucide-react';

interface JobRole {
  id: string; // RoleID
  title: string; // Title
  salaryGrade: string; // SalaryGrade
  baseSalary: string;
}

const JobRolesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setSearchConfirmOpen] = useState(false); // Renamed for correctness if needed, but fixed usage below
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingRole, setEditingRole] = useState<JobRole | null>(null);

  const [formValues, setFormValues] = useState({ id: '', title: '', salaryGrade: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { success, error, info } = useNotification();

  const [roles, setRoles] = useState<JobRole[]>([
    { id: 'ROLE-001', title: 'Senior Software Engineer', salaryGrade: 'Grade-L5', baseSalary: '$8,500' },
    { id: 'ROLE-002', title: 'HR Manager', salaryGrade: 'Grade-M2', baseSalary: '$9,200' },
    { id: 'ROLE-003', title: 'Marketing Specialist', salaryGrade: 'Grade-L2', baseSalary: '$5,400' },
  ]);

  const handleAdd = () => {
    setEditingRole(null);
    setFormValues({ id: '', title: '', salaryGrade: '' });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleEdit = (role: JobRole) => {
    setEditingRole(role);
    setFormValues({ id: role.id, title: role.title, salaryGrade: role.salaryGrade });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeletingId(id);
    setSearchConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (deletingId) {
      setRoles(prev => prev.filter(r => r.id !== deletingId));
      success('Job role record deleted successfully.');
      setSearchConfirmOpen(false);
      setDeletingId(null);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formValues.id.trim()) errors.id = 'Role ID is required';
    else if (!/^ROLE-\d{3}$/.test(formValues.id)) errors.id = 'ID must be in ROLE-XXX format';

    if (!formValues.title.trim()) errors.title = 'Job title is required';
    else if (formValues.title.length < 3) errors.title = 'Title must be at least 3 characters';

    if (!formValues.salaryGrade.trim()) errors.salaryGrade = 'Salary grade is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      error('Configuration failed. Please check the fields.');
      return;
    }
    setIsModalOpen(false);
    success(editingRole ? 'Job role updated successfully.' : 'New job role established.');
  };

  return (
    <div className="fade-in">
      <PageHeader 
        title="Job Roles" 
        description="Configure organizational titles and compensation grades."
        actions={
          <Button variant="primary" leftIcon={<Plus size={18} />} onClick={handleAdd}>Add New Role</Button>
        }
      />

      <div className="filters-row">
        <div className="search-wrapper">
          <div className="search-icon-fixed"><Icon icon={Search} size={18} /></div>
          <input type="text" placeholder="Search role ID, title or grade..." className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <Button variant="outline" leftIcon={<Filter size={18} />} onClick={() => info('Filter options: Scale view mode activated.')}>Scale View</Button>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Role ID</th>
              <th>Title</th>
              <th>Salary Grade</th>
              <th>Base Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.filter(r => r.title.toLowerCase().includes(searchTerm.toLowerCase())).map((role) => (
              <tr key={role.id}>
                <td><span style={{ fontWeight: 600 }}>{role.id}</span></td>
                <td className="name-cell">
                  <div className="avatar-sm" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}><Icon icon={Briefcase} size={18} /></div>
                  <div className="cell-info"><div className="cell-title">{role.title}</div></div>
                </td>
                <td><Badge variant="primary"><div className="flex items-center gap-xs"><Icon icon={DollarSign} size={12} />{role.salaryGrade}</div></Badge></td>
                <td style={{ color: 'var(--success)', fontWeight: 600 }}>{role.baseSalary}</td>
                <td>
                  <div className="action-btns">
                    <button className="action-btn-circle" title="Edit Role" onClick={() => handleEdit(role)}><Icon icon={Edit2} size={16} /></button>
                    <button className="action-btn-circle delete" title="Delete Role" onClick={() => handleDeleteClick(role.id)}><Icon icon={Trash2} size={16} /></button>
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
        title={editingRole ? 'Update Job Role' : 'Create New Role'}
        footer={
          <div className="flex justify-end gap-sm">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => (document.getElementById('role-form') as HTMLFormElement)?.requestSubmit()}>{editingRole ? 'Update Record' : 'Submit Record'}</Button>
          </div>
        }
      >
        <form id="role-form" onSubmit={handleSubmit} className="flex-col gap-md">
          <FormField 
            label="Role ID" 
            placeholder="e.g. ROLE-010" 
            value={formValues.id} 
            onChange={(e) => setFormValues({ ...formValues, id: e.target.value })}
            error={formErrors.id}
            required 
          />
          <FormField 
            label="Job Title" 
            placeholder="e.g. Lead Designer" 
            value={formValues.title} 
            onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
            error={formErrors.title}
            required 
          />
          <FormField 
            label="Salary Grade" 
            placeholder="e.g. Grade-L1" 
            value={formValues.salaryGrade} 
            onChange={(e) => setFormValues({ ...formValues, salaryGrade: e.target.value })}
            error={formErrors.salaryGrade}
            required 
          />
        </form>
      </Modal>

      <ConfirmModal 
        isOpen={isConfirmOpen} 
        onClose={() => setSearchConfirmOpen(false)} 
        onConfirm={confirmDelete}
        title="Delete Job Role?"
        message="This action cannot be undone. All employees currently assigned to this role may require manual re-assignment. Continue?"
        confirmText="Delete Role"
        variant="danger"
      />
    </div>
  );
};

export default JobRolesPage;
