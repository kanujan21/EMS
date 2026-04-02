import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Building, ArrowRight, Smartphone } from 'lucide-react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Label from '../atoms/Label';
import FormField from '../molecules/FormField';
import { useNotification } from '../../hooks/useNotification';
import styles from './LoginPage.module.css';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const navigate = useNavigate();
  const { success, error } = useNotification();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Full name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (!formData.company) newErrors.company = 'Company name is required';
    if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      error('Registration failed. Please check the form for errors.');
      return;
    }

    setIsLoading(true);
    // Mock registration API call
    setTimeout(() => {
      setIsLoading(false);
      success('Account created successfully! Welcome to EMS Pro.');
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <User size={28} color="#fff" />
            </div>
            <h1 className={styles.logoName}>EMS Pro</h1>
          </div>
          <h2 className={styles.title}>Create your account</h2>
          <p className={styles.subtitle}>Start managing your team effectively today.</p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <FormField 
            label="Full Name" 
            error={errors.name}
            required
          >
            <div className={styles.inputWrapper}>
              <User className={styles.inputIcon} size={18} />
              <Input 
                name="name"
                placeholder="John Doe" 
                value={formData.name}
                onChange={handleChange}
                className={styles.inputWithIcon}
              />
            </div>
          </FormField>

          <FormField 
            label="Work Email" 
            error={errors.email}
            required
          >
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} size={18} />
              <Input 
                name="email"
                type="email" 
                placeholder="name@company.com" 
                value={formData.email}
                onChange={handleChange}
                className={styles.inputWithIcon}
              />
            </div>
          </FormField>

          <FormField 
            label="Company Name" 
            error={errors.company}
            required
          >
            <div className={styles.inputWrapper}>
              <Building className={styles.inputIcon} size={18} />
              <Input 
                name="company"
                placeholder="Acme Inc." 
                value={formData.company}
                onChange={handleChange}
                className={styles.inputWithIcon}
              />
            </div>
          </FormField>

          <FormField 
            label="Password" 
            error={errors.password}
            required
          >
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={18} />
              <Input 
                name="password"
                type={showPassword ? 'text' : 'password'} 
                placeholder="••••••••" 
                value={formData.password}
                onChange={handleChange}
                className={styles.inputWithIcon}
              />
              <button 
                type="button" 
                className={styles.passwordToggle}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </FormField>

          <div className={styles.checkboxWrapper} style={{ marginBottom: '1.5rem' }}>
            <input 
              type="checkbox" 
              id="agreeToTerms" 
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
            />
            <Label htmlFor="agreeToTerms" style={{ fontSize: '0.875rem', marginLeft: '0.5rem', fontWeight: 'normal' }}>
              I agree to the <Link to="/terms" style={{ color: 'var(--primary)', fontWeight: '600' }}>Terms of Service</Link> and <Link to="/privacy" style={{ color: 'var(--primary)', fontWeight: '600' }}>Privacy Policy</Link>.
            </Label>
            {errors.agreeToTerms && <p className={styles.errorMessage} style={{ margin: '0.25rem 0 0 1.5rem' }}>{errors.agreeToTerms}</p>}
          </div>

          <Button 
            type="submit" 
            variant="primary" 
            fullWidth 
            isLoading={isLoading}
            rightIcon={<ArrowRight size={18} />}
          >
            Create Account
          </Button>

          <div className={styles.divider}>
            <span>Or register with</span>
          </div>

          <div className={styles.socialLogins}>
            <Button variant="outline" fullWidth leftIcon={<Smartphone size={18} />}>
              Mobile App
            </Button>
            <Button variant="outline" fullWidth leftIcon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/>
              </svg>
            }>
              Google
            </Button>
          </div>
        </form>

        <p className={styles.footer}>
          Already have an account? <Link to="/login" className={styles.link}>Sign in instead</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
