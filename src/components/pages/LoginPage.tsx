import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, BarChart2 } from 'lucide-react';
import Button from '../atoms/Button';
import FormField from '../molecules/FormField';
import { useNotification } from '../../context/NotificationContext';
import styles from './LoginPage.module.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { success, error } = useNotification();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormErrors({});

    let errors: { email?: string; password?: string } = {};
    
    // Basic validation
    if (!email) errors.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Invalid email format';
    
    if (!password) errors.password = 'Password is required';
    else if (password.length < 6) errors.password = 'Password must be at least 6 characters';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setIsLoading(false);
      error('Login failed. Please check your credentials.');
      return;
    }

    // Mock login delay
    setTimeout(() => {
      setIsLoading(false);
      success('Successfully logged in. Welcome back!');
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.content}>
          <div className={`${styles.logo} fade-in`}>
            <div className={styles.logoIcon}>
              <BarChart2 size={32} color="#fff" />
            </div>
            <h1 className={styles.logoText}>EMS Pro</h1>
          </div>
          <p className={styles.subtitle}>
            Enter your credentials to access your management dashboard.
          </p>
          
          <form className={styles.form} onSubmit={handleLogin}>
            <FormField
              label="Email Address"
              id="email"
              type="email"
              placeholder="name@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={formErrors.email}
              required
            />
            
            <div className={styles.passwordWrapper}>
              <FormField
                label="Password"
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={formErrors.password}
                required
              />
              <button 
                type="button" 
                className={styles.toggleBtn}
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            <div className={styles.options}>
              <label className={styles.remember}>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className={styles.forgot}>Forgot password?</a>
            </div>
            
            <Button 
              type="submit" 
              fullWidth 
              size="lg" 
              isLoading={isLoading}
              className={styles.submitBtn}
            >
              Sign In
            </Button>
          </form>
          
          <div className={styles.footer}>
            Don't have an account? <a href="#">Contact HR</a>
          </div>
        </div>
      </div>
      
      <div className={styles.right}>
        <div className={styles.overlay} />
        <div className={styles.infoBox}>
          <h2>Simplify Employee Management</h2>
          <p>The all-in-one solution for human resources and workforce optimization.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
