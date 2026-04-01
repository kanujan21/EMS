import React from 'react';
import { Users, Building2, Calendar, FileText, ArrowUpRight } from 'lucide-react';
import PageHeader from '../molecules/PageHeader';
import StatCard from '../molecules/StatCard';
import Button from '../atoms/Button';
import styles from './DashboardPage.module.css';

const DashboardPage: React.FC = () => {
  const stats = [
    { label: 'Total Employees', value: '1,248', icon: <Users size={24} />, trend: { value: 12, isUp: true }, variant: 'primary' },
    { label: 'Departments', value: '14', icon: <Building2 size={24} />, variant: 'info' },
    { label: 'Pending Leaves', value: '25', icon: <Calendar size={24} />, trend: { value: 8, isUp: false }, variant: 'warning' },
    { label: 'Payroll Overview', value: '$245k', icon: <FileText size={24} />, trend: { value: 5, isUp: true }, variant: 'success' },
  ];

  const recentActivities = [
    { title: 'New Employee Joined', time: '2 hours ago', description: 'Ronald Richards joined the Engineering team.' },
    { title: 'Leave Request Approved', time: '5 hours ago', description: 'Jane Smith\'s sick leave was approved by HR.' },
    { title: 'Quarterly Report Generated', time: '1 day ago', description: 'The Q1 performance report is now available.' },
  ];

  return (
    <div className="fade-in">
      <PageHeader 
        title="Dashboard Overview" 
        description="Welcome back, here's what's happening today."
        actions={
          <Button variant="primary" leftIcon={<ArrowUpRight size={18} />}>
            Generate Report
          </Button>
        }
      />
      
      <div className={styles.statsGrid}>
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat as any} />
        ))}
      </div>

      <div className={styles.mainGrid}>
        <div className={styles.chartSection}>
          <div className="card">
            <h3 className={styles.sectionTitle}>Employee Attendance</h3>
            <div className={styles.chartPlaceholder}>
              <div className={styles.barWrapper}>
                {[65, 45, 75, 55, 85, 95, 70].map((h, i) => (
                  <div key={i} className={styles.bar} style={{ height: `${h}%` }}>
                    <div className={styles.barLabel}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.activitiesSection}>
          <div className="card">
            <h3 className={styles.sectionTitle}>Recent Activities</h3>
            <div className={styles.activityList}>
              {recentActivities.map((activity, index) => (
                <div key={index} className={styles.activityItem}>
                  <div className={styles.activityDot} />
                  <div className={styles.activityContent}>
                    <div className={styles.activityHeader}>
                      <span className={styles.activityTitle}>{activity.title}</span>
                      <span className={styles.activityTime}>{activity.time}</span>
                    </div>
                    <p className={styles.activityDesc}>{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className={styles.viewAllBtn}>View All Activities</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
