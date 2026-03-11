import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Carousel } from './Carousel';

const items = [
  { id: 1, content: <div>Slide 1</div> },
  { id: 2, content: <div>Slide 2</div> },
  { id: 3, content: <div>Slide 3</div> },
];

describe('Carousel', () => {
  it('renders empty when no items', () => {
    render(<Carousel items={[]} />);
    expect(document.querySelector('.gallui-carousel')).toBeNull();
  });

  it('renders first slide by default', () => {
    render(<Carousel items={items} />);
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
  });

  it('shows all slides when showDots is false', () => {
    render(<Carousel items={items} showDots={false} />);
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
  });

  it('navigates to next slide', () => {
    render(<Carousel items={items} showArrows />);
    fireEvent.click(screen.getByRole('button', { name: /next slide/i }));
    expect(screen.getByText('Slide 2')).toBeInTheDocument();
  });

  it('navigates to previous slide', () => {
    render(<Carousel items={items} showArrows />);
    fireEvent.click(screen.getByRole('button', { name: /next slide/i }));
    fireEvent.click(screen.getByRole('button', { name: /previous slide/i }));
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
  });

  it('navigates via dots', () => {
    render(<Carousel items={items} />);
    const dots = screen.getAllByRole('tab');
    fireEvent.click(dots[2]);
    expect(screen.getByText('Slide 3')).toBeInTheDocument();
  });

  it('loops when loop is true', () => {
    render(<Carousel items={items} loop />);
    fireEvent.click(screen.getByRole('button', { name: /next slide/i }));
    fireEvent.click(screen.getByRole('button', { name: /next slide/i }));
    fireEvent.click(screen.getByRole('button', { name: /next slide/i }));
    expect(screen.getByText('Slide 1')).toBeInTheDocument();
  });
});
