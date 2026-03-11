import { useState } from 'react';
import {
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Modal,
  Badge,
  Alert,
  Checkbox,
  Select,
  Tabs,
  Skeleton,
  useModal,
} from 'gallui';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
];

const tabs = [
  { id: 'home', label: 'Home', content: 'Welcome to GallUI!' },
  { id: 'about', label: 'About', content: 'GallUI is a modern React component library.' },
  { id: 'contact', label: 'Contact', content: 'Contact us at hello@gallui.dev' },
];

function App() {
  const { isOpen: isModalOpen, open: openModal, close: closeModal } = useModal();
  const [inputValue, setInputValue] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [selectValue, setSelectValue] = useState('');
  const [activeTab, setActiveTab] = useState('home');
  const [showAlert, setShowAlert] = useState(true);

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '32px' }}>GallUI Demo</h1>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '16px' }}>Button</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button loading>Loading</Button>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '16px' }}>Input</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
          <Input
            label="Username"
            placeholder="Enter your username"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Input label="Email" type="email" placeholder="Enter your email" />
          <Input label="Password" type="password" placeholder="Enter password" />
          <Input label="Error Input" error="This field is required" />
          <Input label="Disabled" disabled placeholder="Disabled input" />
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '16px' }}>Card</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          <Card>
            <CardHeader>Default Card</CardHeader>
            <CardBody>This is a default card with surface background.</CardBody>
          </Card>
          <Card variant="elevated">
            <CardHeader>Elevated Card</CardHeader>
            <CardBody>This card has a shadow effect.</CardBody>
          </Card>
          <Card variant="outlined">
            <CardHeader>Outlined Card</CardHeader>
            <CardBody>This card has a border outline.</CardBody>
          </Card>
          <Card variant="elevated" padding="lg">
            <CardBody>Click me!</CardBody>
            <CardFooter>Footer</CardFooter>
          </Card>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '16px' }}>Modal</h2>
        <Button onClick={openModal}>Open Modal</Button>
        <Modal isOpen={isModalOpen} onClose={closeModal} title="Example Modal">
          <p>This is a modal example. You can close it by clicking the X or the overlay.</p>
          <div style={{ marginTop: '16px', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <Button variant="ghost" onClick={closeModal}>Cancel</Button>
            <Button onClick={closeModal}>Confirm</Button>
          </div>
        </Modal>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '16px' }}>Badge</h2>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Badge>Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '16px' }}>Alert</h2>
        {showAlert && (
          <Alert title="Notice" variant="info" onClose={() => setShowAlert(false)}>
            This is an informational alert. You can close it.
          </Alert>
        )}
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Alert variant="success">Operation successful!</Alert>
          <Alert variant="warning">Warning: Please review your input.</Alert>
          <Alert variant="error">Error: Something went wrong.</Alert>
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '16px' }}>Checkbox</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Checkbox
            label="I agree to the terms"
            checked={checkboxValue}
            onChange={setCheckboxValue}
          />
          <Checkbox label="Disabled checkbox" disabled />
          <Checkbox label="Indeterminate" indeterminate />
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '16px' }}>Select</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
          <Select
            options={options}
            value={selectValue}
            onChange={setSelectValue}
            placeholder="Choose a framework..."
          />
          <Select
            options={options}
            multiple
            placeholder="Select multiple..."
          />
          <Select
            options={options}
            disabled
            placeholder="Disabled select"
          />
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '16px' }}>Tabs</h2>
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '16px' }}>Skeleton</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
          <Skeleton variant="text" width="100%" height={20} />
          <Skeleton variant="text" width="80%" height={16} />
          <Skeleton variant="text" width="60%" height={16} />
          <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
            <Skeleton variant="circular" width={60} height={60} />
            <div style={{ flex: 1 }}>
              <Skeleton variant="text" width="100%" height={16} />
              <Skeleton variant="text" width="70%" height={16} />
            </div>
          </div>
          <Skeleton variant="rectangular" width="100%" height={100} />
        </div>
      </section>
    </div>
  );
}

export default App;
