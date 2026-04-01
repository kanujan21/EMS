import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart2, 
  Users, 
  Building2, 
  Briefcase, 
  Calendar, 
  DollarSign, 
  LineChart, 
  FileText,
  LogOut,
  LayoutDashboard
} from 'lucide-react';
import styles from './Sidebar.module.css';

interface SidebarProps {
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout, isOpen, onClose }) => {
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { name: 'Employees', icon: <Users size={20} />, path: '/employees' },
    { name: 'Departments', icon: <Building2 size={20} />, path: '/departments' },
    { name: 'Job Roles', icon: <Briefcase size={20} />, path: '/job-roles' },
    { name: 'Leaves', icon: <Calendar size={20} />, path: '/leaves' },
    { name: 'Payroll', icon: <DollarSign size={20} />, path: '/payroll' },
    { name: 'Performance', icon: <LineChart size={20} />, path: '/performance' },
    { name: 'Reports', icon: <FileText size={20} />, path: '/reports' },
  ];

  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <div className={styles.homeIconMobile}>
        <BarChart2 size={24} color="#fff" />
      </div>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <BarChart2 size={24} color="#fff" />
        </div>
        <span className={styles.logoText}>EMS Pro</span>
      </div>
      
      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path} 
            onClick={onClose}
            className={({ isActive }) => 
              `${styles.navLink} ${isActive ? styles.active : ''}`
            }
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.name}>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className={styles.footer}>
        <button className={styles.logoutBtn} onClick={onLogout}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
