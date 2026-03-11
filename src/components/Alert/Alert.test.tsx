import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renders children', () => {
    render(<Alert>Alert message</Alert>);
    expect(screen.getByText('Alert message')).toBeInTheDocument();
  });

  it('renders with title', () => {
    render(<Alert title="Title">Message</Alert>);
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('renders with variants', () => {
    const { rerender } = render(<Alert variant="info">Info</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('gallui-alert--info');

    rerender(<Alert variant="success">Success</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('gallui-alert--success');

    rerender(<Alert variant="warning">Warning</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('gallui-alert--warning');

    rerender(<Alert variant="error">Error</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('gallui-alert--error');
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(<Alert onClose={handleClose}>Alert</Alert>);
    fireEvent.click(screen.getByRole('button', { name: /close alert/i }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
