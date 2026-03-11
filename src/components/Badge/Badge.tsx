import React from 'react';
import './Badge.css';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  className = '',
}) => {
  const classes = ['gallui-badge', `gallui-badge--${variant}`, className].filter(Boolean).join(' ');

  return <span className={classes}>{children}</span>;
};
