import React from 'react';
import './Skeleton.css';

export interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = '',
}) => {
  const classes = ['gallui-skeleton', `gallui-skeleton--${variant}`, className].filter(Boolean).join(' ');

  const style: React.CSSProperties = {
    width: width || (variant === 'circular' ? 40 : '100%'),
    height: height || (variant === 'text' ? 16 : variant === 'circular' ? 40 : 100),
  };

  return <div className={classes} style={style} aria-hidden="true" />;
};
