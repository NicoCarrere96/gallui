import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Modal } from './Modal';

describe('Modal', () => {
  it('renders nothing when closed', () => {
    render(<Modal isOpen={false}>Content</Modal>);
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('renders content when open', () => {
    render(<Modal isOpen>Modal Content</Modal>);
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('renders with title', () => {
    render(
      <Modal isOpen title="Modal Title">
        Content
      </Modal>
    );
    expect(screen.getByText('Modal Title')).toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen onClose={handleClose}>
        Content
      </Modal>
    );
    fireEvent.click(screen.getByRole('button', { name: /close modal/i }));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when Escape is pressed', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen onClose={handleClose}>
        Content
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('closes on overlay click', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen onClose={handleClose}>
        Content
      </Modal>
    );
    fireEvent.click(screen.getByRole('dialog'));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('does not close on overlay click when closeOnOverlay is false', () => {
    const handleClose = vi.fn();
    render(
      <Modal isOpen onClose={handleClose} closeOnOverlay={false}>
        Content
      </Modal>
    );
    fireEvent.click(screen.getByRole('dialog'));
    expect(handleClose).not.toHaveBeenCalled();
  });
});
