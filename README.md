# GallUI

A modern, accessible, and well-tested React component library built with TypeScript.

## Features

- **10+ Components** - Button, Input, Card, Modal, Badge, Alert, Checkbox, Select, Tabs, Skeleton
- **5 Custom Hooks** - useModal, useClickOutside, useDebounce, useLocalStorage, useMediaQuery
- **Fully Typed** - Complete TypeScript support
- **Accessible** - ARIA attributes and keyboard navigation
- **Well Tested** - 56+ tests with React Testing Library
- **Tree-shakeable** - Import only what you need
- **CSS Variables** - Easy theming

## Installation

```bash
npm install gallui
```

## Usage

```tsx
import { Button, Input, Card } from 'gallui';
import 'gallui/styles.css';

function App() {
  return (
    <Card>
      <Input label="Username" placeholder="Enter your username" />
      <Button>Submit</Button>
    </Card>
  );
}
```

## Components

### Button

```tsx
<Button variant="primary" size="md" loading={false}>
  Click me
</Button>
```

Variants: `primary`, `secondary`, `outline`, `ghost`, `danger`  
Sizes: `sm`, `md`, `lg`

### Input

```tsx
<Input
  label="Email"
  type="email"
  placeholder="Enter email"
  error="Invalid email"
/>
```

### Card

```tsx
<Card variant="elevated" padding="md">
  <CardHeader>Title</CardHeader>
  <CardBody>Content</CardBody>
  <CardFooter>Footer</CardFooter>
</Card>
```

### Modal

```tsx
const { isOpen, open, close } = useModal();

<Button onClick={open}>Open Modal</Button>
<Modal isOpen={isOpen} onClose={close} title="Modal Title">
  Content here
</Modal>
```

### Select

```tsx
const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
];

<Select
  options={options}
  value={value}
  onChange={setValue}
  multiple
/>
```

### Tabs

```tsx
const tabs = [
  { id: 'home', label: 'Home', content: 'Home content' },
  { id: 'about', label: 'About', content: 'About content' },
];

<Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
```

## Hooks

### useModal

```tsx
const { isOpen, open, close, toggle } = useModal();
```

### useDebounce

```tsx
const debouncedValue = useDebounce(value, 500);
```

### useLocalStorage

```tsx
const [value, setValue] = useLocalStorage('key', defaultValue);
```

### useMediaQuery

```tsx
const isMobile = useMediaQuery('(max-width: 768px)');
```

### useClickOutside

```tsx
const ref = useRef(null);
useClickOutside(ref, () => console.log('clicked outside'));
```

## Theming

Override CSS variables in your CSS:

```css
:root {
  --gallui-primary: #6366f1;
  --gallui-primary-hover: #4f46e5;
  --gallui-radius-md: 8px;
  --gallui-shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
```

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run linter
npm run lint

# Build library
npm run build

# Run demo
cd demo && npm run dev
```

## License

MIT
