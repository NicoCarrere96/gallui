import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Tabs } from './Tabs';

const tabs = [
  { id: 'tab1', label: 'Tab 1', content: 'Content 1' },
  { id: 'tab2', label: 'Tab 2', content: 'Content 2' },
  { id: 'tab3', label: 'Tab 3', content: 'Content 3' },
];

describe('Tabs', () => {
  it('renders tabs', () => {
    render(<Tabs tabs={tabs} activeTab="tab1" onChange={() => {}} />);
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();
  });

  it('shows active tab content', () => {
    render(<Tabs tabs={tabs} activeTab="tab2" onChange={() => {}} />);
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('calls onChange when tab is clicked', () => {
    const handleChange = vi.fn();
    render(<Tabs tabs={tabs} activeTab="tab1" onChange={handleChange} />);
    fireEvent.click(screen.getByText('Tab 2'));
    expect(handleChange).toHaveBeenCalledWith('tab2');
  });

  it('marks active tab', () => {
    render(<Tabs tabs={tabs} activeTab="tab1" onChange={() => {}} />);
    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent('Tab 1');
  });
});
