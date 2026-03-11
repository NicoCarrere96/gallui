import React from 'react';
import './Button.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  disabled,
  className = '',
  ...props
}) => {
  const classes = [
    'gallui-button',
    `gallui-button--${variant}`,
    `gallui-button--${size}`,
    loading && 'gallui-button--loading',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classes} disabled={disabled || loading} {...props}>
      {loading && <span className="gallui-button__spinner" />}
      {icon && !loading && <span className="gallui-button__icon">{icon}</span>}
      {children && <span className="gallui-button__text">{children}</span>}
    </button>
  );
};
