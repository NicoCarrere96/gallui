import React, { useState, useRef, useEffect } from 'react';
import './Pagination.css';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblings?: number;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblings = 1,
  className = '',
}) => {
  const [openDropdown, setOpenDropdown] = useState<'ellipsis-start' | 'ellipsis-end' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPageNumbers = () => {
    const pages: { value: number | string; type: 'page' | 'ellipsis-start' | 'ellipsis-end' }[] = [];
    const totalSiblings = siblings * 2 + 1;
    
    if (totalPages <= totalSiblings + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push({ value: i, type: 'page' });
      }
    } else {
      pages.push({ value: 1, type: 'page' });
      
      if (currentPage > siblings + 2) {
        pages.push({ value: '...', type: 'ellipsis-start' });
      }
      
      const start = Math.max(2, currentPage - siblings);
      const end = Math.min(totalPages - 1, currentPage + siblings);
      
      for (let i = start; i <= end; i++) {
        pages.push({ value: i, type: 'page' });
      }
      
      if (currentPage < totalPages - siblings - 1) {
        pages.push({ value: '...', type: 'ellipsis-end' });
      }
      
      pages.push({ value: totalPages, type: 'page' });
    }
    
    return pages;
  };

  const getEllipsisPages = (type: 'ellipsis-start' | 'ellipsis-end') => {
    const pages: number[] = [];
    if (type === 'ellipsis-start') {
      const start = 2;
      const end = Math.max(2, currentPage - siblings - 1);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.min(totalPages - 1, currentPage + siblings + 1);
      const end = totalPages - 1;
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    return pages;
  };

  const handleClick = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
    setOpenDropdown(null);
  };

  const classes = ['gallui-pagination', className].filter(Boolean).join(' ');

  return (
    <nav className={classes} ref={dropdownRef} aria-label="Pagination">
      <button
        className="gallui-pagination__arrow"
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M11 12L5 8l6-4v8z" />
        </svg>
      </button>

      <ul className="gallui-pagination__list">
        {getPageNumbers().map((page, index) => (
          <li key={index}>
            {page.type === 'ellipsis-start' || page.type === 'ellipsis-end' ? (
              <div className="gallui-pagination__ellipsis-wrapper">
                <button
                  className="gallui-pagination__ellipsis"
                  onClick={() => setOpenDropdown(openDropdown === page.type ? null : (page.type as 'ellipsis-start' | 'ellipsis-end'))}
                  aria-label={page.type === 'ellipsis-start' ? 'Go to previous pages' : 'Go to next pages'}
                  aria-expanded={openDropdown === page.type}
                >
                  ...
                </button>
                {openDropdown === page.type && (
                  <div className={`gallui-pagination__dropdown ${page.type === 'ellipsis-start' ? 'gallui-pagination__dropdown--left' : 'gallui-pagination__dropdown--right'}`}>
                    {getEllipsisPages(page.type).map((pageNum) => (
                      <button
                        key={pageNum}
                        className={`gallui-pagination__dropdown-item ${currentPage === pageNum ? 'gallui-pagination__dropdown-item--active' : ''}`}
                        onClick={() => handleClick(pageNum)}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <button
                className={`gallui-pagination__page ${currentPage === page.value ? 'gallui-pagination__page--active' : ''}`}
                onClick={() => handleClick(page.value as number)}
                aria-current={currentPage === page.value ? 'page' : undefined}
              >
                {page.value}
              </button>
            )}
          </li>
        ))}
      </ul>

      <button
        className="gallui-pagination__arrow"
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M5 4l6 4-6 4V4z" />
        </svg>
      </button>
    </nav>
  );
};
