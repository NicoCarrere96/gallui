import React, { useState, useRef, useEffect } from 'react';
import './Navbar.css';

export interface NavItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface NavbarProps {
  logo?: React.ReactNode;
  items?: NavItem[];
  variant?: 'default' | 'transparent' | 'dark';
  fixed?: boolean;
  className?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  logo,
  items = [],
  variant = 'default',
  fixed = false,
  className = '',
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const classes = [
    'gallui-navbar',
    `gallui-navbar--${variant}`,
    fixed && 'gallui-navbar--fixed',
    isScrolled && 'gallui-navbar--scrolled',
    isMenuOpen && 'gallui-navbar--menu-open',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <header className={classes}>
      <div className="gallui-navbar__container">
        <div className="gallui-navbar__brand">{logo}</div>

        <nav className="gallui-navbar__nav" aria-label="Main navigation">
          <ul className="gallui-navbar__list">
            {items.map((item, index) => (
              <li key={index} className="gallui-navbar__item">
                {item.href ? (
                  <a href={item.href} className="gallui-navbar__link">
                    {item.label}
                  </a>
                ) : (
                  <button className="gallui-navbar__link" onClick={item.onClick}>
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="gallui-navbar__actions">{/* Additional actions can be added */}</div>

        <button
          className="gallui-navbar__toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="gallui-navbar__hamburger">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {isMenuOpen && (
        <div className="gallui-navbar__mobile" ref={menuRef}>
          <ul className="gallui-navbar__mobile-list">
            {items.map((item, index) => (
              <li key={index} className="gallui-navbar__mobile-item">
                {item.href ? (
                  <a
                    href={item.href}
                    className="gallui-navbar__mobile-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    className="gallui-navbar__mobile-link"
                    onClick={() => {
                      item.onClick?.();
                      setIsMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};
