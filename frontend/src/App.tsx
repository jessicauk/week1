import { useState } from 'react'
import { Button, Input, Modal, DataTable, type Column } from './components'

interface User extends Record<string, unknown> {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

const sampleData: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Manager', status: 'active' },
];

const columns: Column<User>[] = [
  {
    key: 'id',
    header: 'ID',
    accessor: 'id',
    sortable: true,
    width: '80px',
  },
  {
    key: 'name',
    header: 'Name',
    accessor: 'name',
    sortable: true,
  },
  {
    key: 'email',
    header: 'Email',
    accessor: 'email',
    sortable: true,
  },
  {
    key: 'role',
    header: 'Role',
    accessor: 'role',
    sortable: true,
  },
  {
    key: 'status',
    header: 'Status',
    accessor: (row) => (
      <span
        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          row.status === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {row.status}
      </span>
    ),
    sortable: true,
  },
];

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (!inputValue.trim()) {
      setInputError('This field is required');
      return;
    }
    setInputError('');
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert(`Submitted: ${inputValue}`);
      setInputValue('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            UI Components Demo
          </h1>
          <p className="text-lg text-gray-600">
            A showcase of accessible React + TypeScript components
          </p>
        </div>

        <div className="space-y-12">
          {/* Button Examples */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Buttons</h2>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="danger">Danger Button</Button>
              <Button size="small">Small Button</Button>
              <Button size="large">Large Button</Button>
              <Button loading disabled>
                Loading...
              </Button>
              <Button disabled>Disabled</Button>
            </div>
          </section>

          {/* Input Examples */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Input Fields</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Name"
                placeholder="Enter your name"
                helperText="This will be displayed publicly"
              />
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                error={inputError}
              />
              <Input
                label="Disabled Field"
                placeholder="This field is disabled"
                disabled
              />
              <div>
                <Button onClick={handleSubmit} loading={loading}>
                  {loading ? 'Submitting...' : 'Submit Form'}
                </Button>
              </div>
            </div>
          </section>

          {/* Modal Example */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Modal</h2>
            <Button onClick={() => setIsModalOpen(true)}>
              Open Modal
            </Button>
            
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Example Modal"
              size="medium"
            >
              <div className="space-y-4">
                <p className="text-gray-600">
                  This is a modal dialog with proper accessibility features including:
                </p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Focus management</li>
                  <li>Keyboard navigation (ESC to close)</li>
                  <li>ARIA labels and roles</li>
                  <li>Background scroll prevention</li>
                </ul>
                <div className="flex justify-end space-x-3 mt-6">
                  <Button
                    variant="secondary"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => setIsModalOpen(false)}>
                    Confirm
                  </Button>
                </div>
              </div>
            </Modal>
          </section>

          {/* DataTable Example */}
          <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Table</h2>
            <DataTable<User>
              data={sampleData}
              columns={columns}
              className="border border-gray-200 rounded-lg"
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default App
