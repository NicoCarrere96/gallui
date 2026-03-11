import React, { useState, useRef, useEffect } from 'react';
import './Select.css';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  placeholder?: string;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
}

export const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select...',
  multiple = false,
  disabled = false,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOptions = multiple
    ? options.filter((opt) => (value as string[])?.includes(opt.value))
    : options.find((opt) => opt.value === value);

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const current = (value as string[]) || [];
      const newValue = current.includes(optionValue)
        ? current.filter((v) => v !== optionValue)
        : [...current, optionValue];
      onChange?.(newValue);
    } else {
      onChange?.(optionValue);
      setIsOpen(false);
    }
  };

  const classes = ['gallui-select', isOpen && 'gallui-select--open', className].filter(Boolean).join(' ');

  return (
    <div className={classes} ref={selectRef}>
      <button
        type="button"
        className="gallui-select__trigger"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span>
          {selectedOptions
            ? multiple
              ? (selectedOptions as SelectOption[]).map((o) => o.label).join(', ')
              : (selectedOptions as SelectOption).label
            : placeholder}
        </span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M4.427 6.427l3.396 3.396a.25.25 0 00.354 0l3.396-3.396A.25.25 0 0011.396 6H4.604a.25.25 0 00-.177.427z" />
        </svg>
      </button>
      {isOpen && (
        <div className="gallui-select__dropdown">
          {options.map((option) => {
            const isSelected = multiple
              ? (value as string[])?.includes(option.value)
              : value === option.value;
            return (
              <button
                key={option.value}
                type="button"
                className={`gallui-select__option ${isSelected ? 'gallui-select__option--selected' : ''}`}
                onClick={() => handleSelect(option.value)}
              >
                {multiple && <span className="gallui-select__checkbox">{isSelected && '✓'}</span>}
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
