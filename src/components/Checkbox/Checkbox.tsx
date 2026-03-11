import React from 'react';
import './Checkbox.css';

export interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  onChange?: (checked: boolean) => void;
  indeterminate?: boolean;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  disabled = false,
  label,
  onChange,
  indeterminate = false,
  className = '',
}) => {
  const id = `checkbox-${Math.random().toString(36).slice(2, 9)}`;
  const classes = ['gallui-checkbox', className].filter(Boolean).join(' ');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.checked);
  };

  return (
    <label className={classes} htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        ref={(el) => {
          if (el) el.indeterminate = indeterminate;
        }}
      />
      <span className="gallui-checkbox__box">
        {indeterminate ? (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <path d="M2 6h8" stroke="currentColor" strokeWidth="2" />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
            <path d="M10 3L4.5 8.5 2 6" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        )}
      </span>
      {label && <span className="gallui-checkbox__label">{label}</span>}
    </label>
  );
};
