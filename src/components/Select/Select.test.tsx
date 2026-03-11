import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Select } from './Select';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

describe('Select', () => {
  it('renders with placeholder', () => {
    render(<Select options={options} placeholder="Choose..." />);
    expect(screen.getByText('Choose...')).toBeInTheDocument();
  });

  it('opens dropdown on click', () => {
    render(<Select options={options} />);
    fireEvent.click(screen.getByText('Select...'));
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('calls onChange when option is selected', () => {
    const handleChange = vi.fn();
    render(<Select options={options} onChange={handleChange} />);
    fireEvent.click(screen.getByText('Select...'));
    fireEvent.click(screen.getByText('Option 1'));
    expect(handleChange).toHaveBeenCalledWith('1');
  });

  it('shows selected value', () => {
    render(<Select options={options} value="2" />);
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('handles disabled state', () => {
    render(<Select options={options} disabled />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('handles multiple selection', () => {
    const handleChange = vi.fn();
    render(<Select options={options} multiple onChange={handleChange} />);
    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Option 1'));
    expect(handleChange).toHaveBeenCalledWith(['1']);
  });
});
