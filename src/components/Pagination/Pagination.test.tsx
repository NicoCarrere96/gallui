import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('renders correct number of pages', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('calls onPageChange when page is clicked', () => {
    const handleChange = vi.fn();
    render(<Pagination currentPage={1} totalPages={5} onPageChange={handleChange} />);
    fireEvent.click(screen.getByText('2'));
    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it('navigates to previous page', () => {
    const handleChange = vi.fn();
    render(<Pagination currentPage={3} totalPages={5} onPageChange={handleChange} />);
    fireEvent.click(screen.getByRole('button', { name: /previous page/i }));
    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it('navigates to next page', () => {
    const handleChange = vi.fn();
    render(<Pagination currentPage={1} totalPages={5} onPageChange={handleChange} />);
    fireEvent.click(screen.getByRole('button', { name: /next page/i }));
    expect(handleChange).toHaveBeenCalledWith(2);
  });

  it('disables previous button on first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByRole('button', { name: /previous page/i })).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={() => {}} />);
    expect(screen.getByRole('button', { name: /next page/i })).toBeDisabled();
  });

  it('shows ellipsis for many pages', () => {
    render(<Pagination currentPage={5} totalPages={20} onPageChange={() => {}} />);
    const ellipses = document.querySelectorAll('.gallui-pagination__ellipsis');
    expect(ellipses.length).toBe(2);
  });

  it('opens dropdown when ellipsis is clicked', () => {
    render(<Pagination currentPage={5} totalPages={20} onPageChange={() => {}} />);
    const ellipsis = screen.getAllByRole('button', { name: /go to previous pages/i })[0];
    fireEvent.click(ellipsis);
    expect(document.querySelector('.gallui-pagination__dropdown')).toBeInTheDocument();
  });

  it('selects page from dropdown', () => {
    const handleChange = vi.fn();
    render(<Pagination currentPage={5} totalPages={20} onPageChange={handleChange} />);
    const ellipsis = screen.getAllByRole('button', { name: /go to next pages/i })[0];
    fireEvent.click(ellipsis);
    const pageOption = screen.getByText('10');
    fireEvent.click(pageOption);
    expect(handleChange).toHaveBeenCalledWith(10);
  });
});
