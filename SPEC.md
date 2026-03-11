# GallUI - Modern React Component Library

## Project Overview

**Project Name:** GallUI  
**Type:** React Component Library  
**Core Functionality:** A modern, accessible, and well-tested component library for React applications  
**Target Users:** React developers building web applications

## Technical Stack

- React 18+ with TypeScript
- Vite for development and building
- Rollup for library bundling
- Vitest + React Testing Library for testing
- CSS Modules with CSS Variables for styling
- ESLint + Prettier for code quality

## UI/UX Specification

### Design System

**Color Palette:**
- Primary: `#6366f1` (Indigo-500)
- Primary Hover: `#4f46e5` (Indigo-600)
- Secondary: `#64748b` (Slate-500)
- Success: `#22c55e` (Green-500)
- Warning: `#f59e0b` (Amber-500)
- Error: `#ef4444` (Red-500)
- Background: `#ffffff`
- Surface: `#f8fafc` (Slate-50)
- Text Primary: `#1e293b` (Slate-800)
- Text Secondary: `#64748b` (Slate-500)
- Border: `#e2e8f0` (Slate-200)

**Typography:**
- Font Family: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- Heading 1: 32px, font-weight 700
- Heading 2: 24px, font-weight 600
- Heading 3: 20px, font-weight 600
- Body: 16px, font-weight 400
- Small: 14px, font-weight 400

**Spacing:**
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

**Border Radius:**
- sm: 4px
- md: 8px
- lg: 12px
- full: 9999px

**Shadows:**
- sm: `0 1px 2px rgba(0, 0, 0, 0.05)`
- md: `0 4px 6px -1px rgba(0, 0, 0, 0.1)`
- lg: `0 10px 15px -3px rgba(0, 0, 0, 0.1)`

### Components

1. **Button**
   - Variants: primary, secondary, outline, ghost, danger
   - Sizes: sm, md, lg
   - States: default, hover, active, disabled, loading
   - Props: onClick, children, variant, size, disabled, loading, icon

2. **Input**
   - Types: text, password, email, number, search
   - States: default, focus, error, disabled
   - Props: label, placeholder, error, disabled, value, onChange, type

3. **Card**
   - Variants: default, elevated, outlined
   - Props: children, variant, padding, onClick

4. **Modal**
   - Features: overlay, close button, animation
   - Props: isOpen, onClose, title, children, size

5. **Badge**
   - Variants: default, success, warning, error, info
   - Props: children, variant

6. **Alert**
   - Variants: info, success, warning, error
   - Props: title, children, variant, onClose

7. **Checkbox**
   - States: unchecked, checked, indeterminate, disabled
   - Props: checked, disabled, label, onChange

8. **Select**
   - Features: options, searchable, multiple
   - Props: options, value, onChange, placeholder, multiple

9. **Tabs**
   - Props: tabs, activeTab, onChange

10. **Skeleton**
    - Variants: text, circular, rectangular
    - Props: variant, width, height, animation

## Functionality Specification

### Core Features

- Fully typed components with TypeScript
- Accessibility (ARIA attributes, keyboard navigation)
- CSS variables for theming
- Tree-shakeable exports
- SSR compatible
- Custom hooks for common patterns

### Custom Hooks

- `useModal` - Modal state management
- `useClickOutside` - Click outside detection
- `useDebounce` - Debounce value
- `useLocalStorage` - Local storage persistence
- `useMediaQuery` - Media query detection

### Testing Requirements

- Unit tests for all components
- Tests for custom hooks
- Coverage target: 80%+
- Tests use react-testing-library
- Mock utilities for common patterns

## Project Structure

```
gallui/
├── src/
│   ├── components/
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Card/
│   │   ├── Modal/
│   │   ├── Badge/
│   │   ├── Alert/
│   │   ├── Checkbox/
│   │   ├── Select/
│   │   ├── Tabs/
│   │   └── Skeleton/
│   ├── hooks/
│   ├── utils/
│   ├── styles/
│   └── index.ts
├── tests/
├── .eslintrc.json
├── .prettierrc
├── tsconfig.json
├── vite.config.ts
├── rollup.config.js
└── package.json
```

## Acceptance Criteria

1. All components render without errors
2. All components are accessible (pass a11y tests)
3. All components have tests with >80% coverage
4. Library builds successfully with Rollup
5. Components are fully typed
6. Demo app showcases all components
7. Documentation includes usage examples
