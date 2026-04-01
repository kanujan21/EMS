export interface Employee {
  id: string; // EmployeeID
  name: string; // Name
  contact: string; // Contact (Phone/Email)
  departmentId: string; // DepartmentID
  jobRoleId: string; // JobRoleID
  hireDate: string; // HireDate
  status: 'Active' | 'Inactive' | 'On Leave';
  department: string; // For display
  role: string; // For display
}

export const mockEmployees: Employee[] = [
  { 
    id: 'EMP001', 
    name: 'John Doe', 
    contact: '+1 234 567 8901 | john.doe@example.com', 
    departmentId: 'DEPT-001', 
    jobRoleId: 'ROLE-001', 
    hireDate: '2023-01-15', 
    status: 'Active', 
    department: 'Engineering', 
    role: 'Senior Developer' 
  },
  { 
    id: 'EMP002', 
    name: 'Jane Smith', 
    contact: '+1 234 567 8902 | jane.smith@example.com', 
    departmentId: 'DEPT-002', 
    jobRoleId: 'ROLE-002', 
    hireDate: '2023-02-20', 
    status: 'Active', 
    department: 'Human Resources', 
    role: 'HR Manager' 
  },
  { 
    id: 'EMP003', 
    name: 'Robert Johnson', 
    contact: '+1 234 567 8903 | robert.j@example.com', 
    departmentId: 'DEPT-003', 
    jobRoleId: 'ROLE-003', 
    hireDate: '2022-11-05', 
    status: 'On Leave', 
    department: 'Marketing', 
    role: 'Growth Lead' 
  },
  { 
    id: 'EMP004', 
    name: 'Sarah Williams', 
    contact: '+1 234 567 8904 | sarah.w@example.com', 
    departmentId: 'DEPT-001', 
    jobRoleId: 'ROLE-005', 
    hireDate: '2023-05-12', 
    status: 'Active', 
    department: 'Engineering', 
    role: 'Product Manager' 
  },
];
