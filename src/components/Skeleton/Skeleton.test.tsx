import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders with default variant', () => {
    render(<Skeleton />);
    const skeleton = document.querySelector('.gallui-skeleton');
    expect(skeleton).toHaveClass('gallui-skeleton--text');
  });

  it('renders with circular variant', () => {
    render(<Skeleton variant="circular" />);
    const skeleton = document.querySelector('.gallui-skeleton');
    expect(skeleton).toHaveClass('gallui-skeleton--circular');
  });

  it('renders with rectangular variant', () => {
    render(<Skeleton variant="rectangular" />);
    const skeleton = document.querySelector('.gallui-skeleton');
    expect(skeleton).toHaveClass('gallui-skeleton--rectangular');
  });

  it('applies custom dimensions', () => {
    render(<Skeleton width={200} height={50} />);
    const skeleton = document.querySelector('.gallui-skeleton');
    expect(skeleton).toHaveStyle({ width: '200px', height: '50px' });
  });
});
