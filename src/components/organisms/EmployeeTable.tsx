import React from 'react';
import { Edit2, Trash2, MoreVertical, Calendar, User } from 'lucide-react';
import { type Employee } from '../../types/employee';
import Badge from '../atoms/Badge';
import Icon from '../atoms/Icon';

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, onEdit, onDelete }) => {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Inactive': return 'error';
      case 'On Leave': return 'warning';
      default: return 'secondary';
    }
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name & Contact</th>
            <th>Dept ID</th>
            <th>Role ID</th>
            <th>Hire Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td><span style={{ fontWeight: 600, color: 'var(--text-secondary)' }}>{employee.id}</span></td>
              <td className="name-cell">
                <div className="avatar-sm" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
                  <Icon icon={User} size={18} />
                </div>
                <div className="cell-info">
                  <div className="cell-title">{employee.name}</div>
                  <div className="cell-subtitle" style={{ fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                       {employee.contact}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <Badge variant="outline">{employee.departmentId}</Badge>
              </td>
              <td>
                <Badge variant="secondary">{employee.jobRoleId}</Badge>
              </td>
              <td>
                <div className="flex items-center gap-xs" style={{ fontSize: '0.875rem' }}>
                  <Calendar size={14} color="var(--text-muted)" />
                  {employee.hireDate}
                </div>
              </td>
              <td>
                <Badge variant={getStatusVariant(employee.status)}>
                  {employee.status}
                </Badge>
              </td>
              <td>
                <div className="action-btns">
                  <button className="action-btn-circle" title="Edit" onClick={() => onEdit(employee)}>
                    <Edit2 size={16} />
                  </button>
                  <button className="action-btn-circle delete" title="Delete" onClick={() => onDelete(employee.id)}>
                    <Trash2 size={16} />
                  </button>
                  <button className="action-btn-circle" title="Options">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
