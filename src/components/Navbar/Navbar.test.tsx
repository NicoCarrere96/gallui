import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navbar } from './Navbar';

const items = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', onClick: vi.fn() },
];

describe('Navbar', () => {
  it('renders with logo', () => {
    render(<Navbar logo={<span>Logo</span>} />);
    expect(screen.getByText('Logo')).toBeInTheDocument();
  });

  it('renders navigation items', () => {
    render(<Navbar items={items} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('renders with variants', () => {
    const { rerender } = render(<Navbar variant="default" />);
    expect(document.querySelector('.gallui-navbar--default')).toBeInTheDocument();

    rerender(<Navbar variant="transparent" />);
    expect(document.querySelector('.gallui-navbar--transparent')).toBeInTheDocument();

    rerender(<Navbar variant="dark" />);
    expect(document.querySelector('.gallui-navbar--dark')).toBeInTheDocument();
  });

  it('renders fixed navbar', () => {
    render(<Navbar fixed />);
    expect(document.querySelector('.gallui-navbar--fixed')).toBeInTheDocument();
  });

  it('opens mobile menu on toggle', () => {
    render(<Navbar items={items} />);
    const toggle = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(toggle);
    expect(document.querySelector('.gallui-navbar--menu-open')).toBeInTheDocument();
  });

  it('calls onClick for nav items', () => {
    const handleClick = vi.fn();
    render(<Navbar items={[{ label: 'Click me', onClick: handleClick }]} />);
    const toggle = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(toggle);
    fireEvent.click(screen.getAllByText('Click me')[0]);
    expect(handleClick).toHaveBeenCalled();
  });
});
