import React, { useState, useEffect, useCallback } from 'react';
import './Carousel.css';

export interface CarouselItem {
  id: string | number;
  content: React.ReactNode;
  alt?: string;
}

export interface CarouselProps {
  items: CarouselItem[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  loop?: boolean;
  className?: string;
}

export const Carousel: React.FC<CarouselProps> = ({
  items,
  autoPlay = false,
  autoPlayInterval = 3000,
  showDots = true,
  showArrows = true,
  loop = true,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? (loop ? 0 : prev) : prev + 1));
  }, [items.length, loop]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? (loop ? items.length - 1 : prev) : prev - 1));
  }, [items.length, loop]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!autoPlay || items.length <= 1) return;
    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, goToNext, items.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrev, goToNext]);

  if (items.length === 0) return null;

  const classes = ['gallui-carousel', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="gallui-carousel__track" role="region" aria-label="Carousel">
        {items.map((item, index) => (
          <div
            key={item.id}
            className={`gallui-carousel__slide ${index === currentIndex ? 'gallui-carousel__slide--active' : ''}`}
            aria-hidden={index !== currentIndex}
          >
            {item.content}
          </div>
        ))}
      </div>

      {showArrows && items.length > 1 && (
        <>
          <button
            className="gallui-carousel__arrow gallui-carousel__arrow--prev"
            onClick={goToPrev}
            aria-label="Previous slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            className="gallui-carousel__arrow gallui-carousel__arrow--next"
            onClick={goToNext}
            aria-label="Next slide"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}

      {showDots && items.length > 1 && (
        <div className="gallui-carousel__dots" role="tablist">
          {items.map((_, index) => (
            <button
              key={index}
              className={`gallui-carousel__dot ${index === currentIndex ? 'gallui-carousel__dot--active' : ''}`}
              onClick={() => goToSlide(index)}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
