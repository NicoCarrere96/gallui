import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useModal } from './useModal';

describe('useModal', () => {
  it('initializes with false', () => {
    const { result } = renderHook(() => useModal());
    expect(result.current.isOpen).toBe(false);
  });

  it('initializes with custom initial state', () => {
    const { result } = renderHook(() => useModal(true));
    expect(result.current.isOpen).toBe(true);
  });

  it('opens modal', () => {
    const { result } = renderHook(() => useModal());
    act(() => result.current.open());
    expect(result.current.isOpen).toBe(true);
  });

  it('closes modal', () => {
    const { result } = renderHook(() => useModal(true));
    act(() => result.current.close());
    expect(result.current.isOpen).toBe(false);
  });

  it('toggles modal', () => {
    const { result } = renderHook(() => useModal());
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(true);
    act(() => result.current.toggle());
    expect(result.current.isOpen).toBe(false);
  });
});
