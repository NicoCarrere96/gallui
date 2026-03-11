import React, { forwardRef } from 'react';
import './Input.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;
    const hasError = Boolean(error);

    const classes = [
      'gallui-input',
      hasError && 'gallui-input--error',
      props.disabled && 'gallui-input--disabled',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className="gallui-input-wrapper">
        {label && (
          <label htmlFor={inputId} className="gallui-input__label">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={classes}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${inputId}-error` : undefined}
          {...props}
        />
        {(error || helperText) && (
          <span
            id={`${inputId}-${hasError ? 'error' : 'helper'}`}
            className={`gallui-input__helper ${hasError ? 'gallui-input__helper--error' : ''}`}
          >
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
