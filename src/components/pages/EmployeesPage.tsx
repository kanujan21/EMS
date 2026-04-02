import React, { useState } from 'react';
import { Plus, Download, Filter } from 'lucide-react';
import PageHeader from '../molecules/PageHeader';
import EmployeeTable from '../organisms/EmployeeTable';
import Button from '../atoms/Button';
import SearchBar from '../molecules/SearchBar';
import Modal from '../organisms/Modal';
import ConfirmModal from '../organisms/ConfirmModal';
import FormField from '../molecules/FormField';
import { useNotification } from '../../hooks/useNotification';
import { mockEmployees, type Employee } from '../../types/employee';
import styles from './EmployeesPage.module.css';

const initialFormValues = {
  id: '',
  name: '',
  contact: '',
  departmentId: '',
  jobRoleId: '',
  hireDate: new Date().toISOString().split('T')[0],
};

const EmployeesPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  const { success, error, info } = useNotification();

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setFormValues(initialFormValues);
    setFormErrors({});
    setEditingEmployee(null);
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setFormValues({
      id: employee.id,
      name: employee.name,
      contact: employee.contact,
      departmentId: employee.departmentId,
      jobRoleId: employee.jobRoleId,
      hireDate: employee.hireDate,
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeletingId(id);
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (deletingId) {
      setEmployees(prev => prev.filter(emp => emp.id !== deletingId));
      success('Employee record terminated successfully.');
      setIsConfirmOpen(false);
      setDeletingId(null);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!formValues.id) errors.id = 'Employee ID is required';
    if (!formValues.name) errors.name = 'Full name is required';
    if (!formValues.contact) errors.contact = 'Contact information is required';
    if (!formValues.departmentId) errors.departmentId = 'Department ID is required';
    if (!formValues.jobRoleId) errors.jobRoleId = 'Job Role ID is required';
    if (!formValues.hireDate) errors.hireDate = 'Hire date is required';
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      error('Please correct the errors in the form.');
      return;
    }

    if (editingEmployee) {
      setEmployees(prev => prev.map(emp => emp.id === editingEmployee.id ? { 
        ...formValues, 
        status: emp.status,
        department: emp.department, // In a real app, these would come from the ID lookup
        role: emp.role 
      } as Employee : emp));
      success('Employee profile updated successfully.');
    } else {
      const newEmployee: Employee = {
        ...formValues,
        status: 'Active',
        department: 'General', // Mock/Default
        role: 'Employee'       // Mock/Default
      };
      setEmployees(prev => [...prev, newEmployee]);
      success('New employee record created successfully.');
    }
    
    setIsModalOpen(false);
    resetForm();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="fade-in">
      <PageHeader 
        title="Employees" 
        description={`Manage your workforce of ${employees.length} employees.`}
        actions={
          <div className={styles.headerActions}>
            <Button variant="outline" leftIcon={<Download size={18} />} onClick={() => info('Exporting employee records...')}>Export</Button>
            <Button variant="primary" leftIcon={<Plus size={18} />} onClick={() => { resetForm(); setIsModalOpen(true); }}>Add Employee</Button>
          </div>
        }
      />

      <div className={styles.filters}>
        <SearchBar placeholder="Search by name, ID or department ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <Button variant="outline" leftIcon={<Filter size={18} />}>Advanced Filter</Button>
      </div>

      <EmployeeTable employees={filteredEmployees} onEdit={handleEdit} onDelete={handleDeleteClick} />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingEmployee ? 'Update Employee Profile' : 'New Employee Entry'}
        footer={
          <>
            <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => (document.getElementById('employee-form') as HTMLFormElement)?.requestSubmit()}>{editingEmployee ? 'Commit Changes' : 'Create Record'}</Button>
          </>
        }
      >
        <form id="employee-form" className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <FormField 
              label="Employee ID" 
              name="id" 
              value={formValues.id} 
              onChange={handleInputChange} 
              error={formErrors.id}
              required 
            />
            <FormField 
              label="Full Name" 
              name="name" 
              value={formValues.name} 
              onChange={handleInputChange} 
              error={formErrors.name}
              required 
            />
            <FormField 
              label="Contact" 
              name="contact" 
              value={formValues.contact} 
              onChange={handleInputChange} 
              error={formErrors.contact}
              required 
            />
            <FormField 
              label="Dept ID" 
              name="departmentId" 
              value={formValues.departmentId} 
              onChange={handleInputChange} 
              error={formErrors.departmentId}
              required 
            />
            <FormField 
              label="Role ID" 
              name="jobRoleId" 
              value={formValues.jobRoleId} 
              onChange={handleInputChange} 
              error={formErrors.jobRoleId}
              required 
            />
            <FormField 
              label="Hire Date" 
              name="hireDate" 
              type="date" 
              value={formValues.hireDate} 
              onChange={handleInputChange} 
              error={formErrors.hireDate}
              required 
            />
          </div>
        </form>
      </Modal>

      <ConfirmModal 
        isOpen={isConfirmOpen} 
        onClose={() => setIsConfirmOpen(false)} 
        onConfirm={confirmDelete}
        title="Terminate Employee Record?"
        message="This action is permanent. All associated payroll and performance history will be archived. Continue?"
        confirmText="Terminate"
        variant="danger"
      />
    </div>
  );
};

export default EmployeesPage;
