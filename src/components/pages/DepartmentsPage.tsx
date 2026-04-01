import React, { useState } from 'react';
import PageHeader from '../molecules/PageHeader';
import Button from '../atoms/Button';
import Icon from '../atoms/Icon';
import Badge from '../atoms/Badge';
import Modal from '../organisms/Modal';
import ConfirmModal from '../organisms/ConfirmModal';
import FormField from '../molecules/FormField';
import { useNotification } from '../../context/NotificationContext';
import { Plus, Users, Search, Eye, Edit2, Trash2, Filter, Download, UserCheck } from 'lucide-react';

interface Department {
  id: string; // DepartmentID
  name: string; // Name
  managerId: string; // ManagerID
  employeesCount: number;
}

const DepartmentsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingDept, setEditingDept] = useState<Department | null>(null);

  const [formValues, setFormValues] = useState({ id: '', name: '' });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const { success, error, info } = useNotification();

  const [departments, setDepartments] = useState<Department[]>([
    { id: 'DEPT-001', name: 'Engineering', managerId: 'EMP-001', employeesCount: 42 },
    { id: 'DEPT-002', name: 'Human Resources', managerId: 'EMP-002', employeesCount: 8 },
    { id: 'DEPT-003', name: 'Marketing', managerId: 'EMP-003', employeesCount: 15 },
  ]);

  const filtered = departments.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setEditingDept(null);
    setFormValues({ id: '', name: '' });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleEdit = (dept: Department) => {
    setEditingDept(dept);
    setFormValues({ id: dept.id, name: dept.name });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeletingId(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (deletingId) {
      setDepartments(prev => prev.filter(d => d.id !== deletingId));
      success('Department record removed successfully.');
      setIsConfirmOpen(false);
      setDeletingId(null);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formValues.id.trim()) errors.id = 'Department ID is required';
    else if (!/^DEPT-\d{3}$/.test(formValues.id)) errors.id = 'ID must be in DEPT-XXX format';
    
    if (!formValues.name.trim()) errors.name = 'Department name is required';
    else if (formValues.name.length < 3) errors.name = 'Name must be at least 3 characters';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      error('Please fix the validation errors before saving.');
      return;
    }
    setIsModalOpen(false);
    success(editingDept ? 'Department updated successfully.' : 'New department created successfully.');
  };

  return (
    <div className="fade-in">
      <PageHeader 
        title="Departments" 
        description="Manage organizational departments and assignments."
        actions={
          <div className="flex gap-sm">
            <Button variant="outline" leftIcon={<Download size={18} />} onClick={() => info('Starting department list export...')}>Export</Button>
            <Button variant="primary" leftIcon={<Plus size={18} />} onClick={handleAdd}>Add Department</Button>
          </div>
        }
      />

      <div className="filters-row">
        <div className="search-wrapper">
          <div className="search-icon-fixed"><Icon icon={Search} size={18} /></div>
          <input type="text" placeholder="Search department name or ID..." className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <Button variant="outline" leftIcon={<Filter size={18} />} onClick={() => info('Filter options: All active departments shown.')}>All Active</Button>
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Department ID</th>
              <th>Name</th>
              <th>Manager ID</th>
              <th>Employees</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((dept) => (
              <tr key={dept.id}>
                <td><span style={{ fontWeight: 600 }}>{dept.id}</span></td>
                <td className="name-cell">
                  <div className="avatar-sm" style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}><Icon icon={Users} size={18} /></div>
                  <div className="cell-info"><div className="cell-title">{dept.name}</div></div>
                </td>
                <td><div className="flex items-center gap-xs"><Icon icon={UserCheck} size={14} color="var(--text-muted)" /><span style={{ fontWeight: 500 }}>{dept.managerId}</span></div></td>
                <td><Badge variant="primary">{dept.employeesCount} Members</Badge></td>
                <td>
                  <div className="action-btns">
                    <button className="action-btn-circle" title="View Dashboard" onClick={() => info(`Opening dashboard for ${dept.name}`)}><Icon icon={Eye} size={16} /></button>
                    <button className="action-btn-circle" title="Edit Department" onClick={() => handleEdit(dept)}><Icon icon={Edit2} size={16} /></button>
                    <button className="action-btn-circle delete" title="Remove Department" onClick={() => handleDeleteClick(dept.id)}><Icon icon={Trash2} size={16} /></button>
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
        title={editingDept ? "Update Department" : "New Department Entry"}
        footer={
          <div className="flex justify-end gap-sm">
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => (document.getElementById('dept-form') as HTMLFormElement)?.requestSubmit()}>{editingDept ? 'Update Details' : 'Create Department'}</Button>
          </div>
        }
      >
        <form id="dept-form" onSubmit={handleSubmit} className="flex-col gap-md">
          <FormField 
            label="Department ID" 
            placeholder="e.g. DEPT-101" 
            value={formValues.id} 
            onChange={(e) => setFormValues({ ...formValues, id: e.target.value })}
            error={formErrors.id}
            required 
          />
          <FormField 
            label="Department Name" 
            placeholder="e.g. Sales" 
            value={formValues.name} 
            onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
            error={formErrors.name}
            required 
          />
        </form>
      </Modal>

      <ConfirmModal 
        isOpen={isConfirmOpen} 
        onClose={() => setIsConfirmOpen(false)} 
        onConfirm={confirmDelete}
        title="Remove Department Record?"
        message="This will dissolve the department record and unassign all current members. This action cannot be undone. Proceed?"
        confirmText="Remove Record"
        variant="danger"
      />
    </div>
  );
};

export default DepartmentsPage;
