import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Card, CardHeader, CardBody, CardFooter } from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('renders with variants', () => {
    const { rerender } = render(<Card variant="default">Default</Card>);
    expect(screen.getByText('Default')).toHaveClass('gallui-card--default');

    rerender(<Card variant="elevated">Elevated</Card>);
    expect(screen.getByText('Elevated')).toHaveClass('gallui-card--elevated');

    rerender(<Card variant="outlined">Outlined</Card>);
    expect(screen.getByText('Outlined')).toHaveClass('gallui-card--outlined');
  });

  it('handles click', () => {
    const handleClick = vi.fn();
    render(<Card onClick={handleClick}>Clickable Card</Card>);
    fireEvent.click(screen.getByText('Clickable Card'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders CardHeader, CardBody, CardFooter', () => {
    render(
      <Card>
        <CardHeader>Header</CardHeader>
        <CardBody>Body</CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>
    );
    expect(screen.getByText('Header')).toHaveClass('gallui-card__header');
    expect(screen.getByText('Body')).toHaveClass('gallui-card__body');
    expect(screen.getByText('Footer')).toHaveClass('gallui-card__footer');
  });
});
