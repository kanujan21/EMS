import React from 'react';
import { Search } from 'lucide-react';
import styles from './SearchBar.module.css';

const SearchBar: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return (
    <div className={styles.container}>
      <Search className={styles.icon} size={18} />
      <input type="text" className={styles.input} {...props} />
    </div>
  );
};

export default SearchBar;
