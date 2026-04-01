import React from 'react';
import { Bell, Search, User, Menu, Moon, Sun, BarChart2 } from 'lucide-react';
import styles from './Navbar.module.css';

interface NavbarProps {
  onToggleSidebar?: () => void;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, isDarkMode, onToggleDarkMode }) => {
  return (
    <header className={styles.navbar}>
      <div className={styles.left}>
        <button className={styles.menuIcon} onClick={onToggleSidebar}>
          <Menu size={22} />
        </button>
        <div className={styles.mobileLogo}>
          <BarChart2 size={24} className={styles.mobileLogoIcon} />
          <span className={styles.mobileLogoText}>EMS Pro</span>
        </div>
        <div className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input type="text" placeholder="Search anything..." className={styles.searchInput} />
        </div>
      </div>
      
      <div className={styles.right}>
        <button className={styles.iconBtn} onClick={onToggleDarkMode}>
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className={styles.iconBtn}>
          <Bell size={20} />
          <span className={styles.badge} />
        </button>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <User size={20} color="#fff" />
          </div>
          <div className={styles.profileInfo}>
            <span className={styles.profileName}>Admin User</span>
            <span className={styles.profileRole}>Administrator</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
