# Week 1 – Frontend + Analytics

A comprehensive full-stack development scaffold featuring modern frontend components and data analytics capabilities.

## 🏗️ Project Structure

```
week1/
├── frontend/          # React + TypeScript + Vite frontend
│   ├── src/
│   │   ├── components/    # Accessible UI primitives
│   │   │   ├── Button.tsx       # Accessible button component
│   │   │   ├── Input.tsx        # Form input with validation
│   │   │   ├── Modal.tsx        # Keyboard-accessible modal
│   │   │   ├── DataTable.tsx    # Sortable data table
│   │   │   └── *.test.tsx       # Unit tests
│   │   ├── App.tsx           # Demo application
│   │   └── test/            # Test configuration
│   ├── e2e/              # Playwright e2e tests
│   ├── .husky/           # Git hooks
│   └── package.json      # Dependencies and scripts
└── analytics/         # Python data analysis
    ├── eda_analysis.py      # Comprehensive EDA script
    ├── eda_notebook.ipynb   # Jupyter notebook version
    ├── requirements.txt     # Python dependencies
    └── *.csv              # Generated datasets
```

## 🚀 Quick Start

### Frontend Development

```bash
cd frontend
npm install
npm run dev          # Start development server
npm run test         # Run unit tests
npm run e2e          # Run e2e tests (requires dev server)
npm run build        # Build for production
```

### Analytics

```bash
cd analytics
pip install -r requirements.txt
python3 eda_analysis.py    # Run analysis script
jupyter notebook           # Open notebook environment
```

## 🎨 Frontend Features

### Accessible UI Components

- **Button**: Multiple variants (primary, secondary, danger), sizes, loading states
- **Input**: Labels, validation, helper text, error handling
- **Modal**: Keyboard navigation, focus management, ARIA compliance
- **DataTable**: Sortable columns, accessible headers, responsive design

### Technical Stack

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS with accessible color palette
- **Testing**: Vitest + React Testing Library + Playwright
- **Code Quality**: ESLint + Prettier + Husky pre-commit hooks

### Development Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run test` | Run unit tests |
| `npm run test:coverage` | Run tests with coverage |
| `npm run e2e` | Run end-to-end tests |
| `npm run lint` | Run ESLint |
| `npm run format` | Format code with Prettier |
| `npm run type-check` | TypeScript type checking |

## 📊 Analytics Features

### EDA Analysis Capabilities

1. **Data Generation**: Synthetic e-commerce datasets (customers, transactions)
2. **Data Joining**: Pandas merge operations demonstrating relational data handling  
3. **Three Visualization Types**:
   - **Distribution Plot**: Transaction amount histogram with statistical markers
   - **Categorical Analysis**: Stacked bar chart of categories by age groups
   - **Time Series**: Dual-axis plot showing monthly trends
4. **Statistical Insights**: Comprehensive analysis of customer demographics, transaction patterns, and business metrics

### Python Stack

- **Python**: 3.11+ (tested on 3.12)
- **Data Processing**: pandas 2.0+, numpy
- **Visualization**: matplotlib 3.6+, seaborn 0.12+
- **Environment**: Jupyter notebook support

### Sample Output

The analysis generates:
- 📈 **eda_analysis.png**: Combined visualization dashboard
- 📄 **customers.csv**: Customer demographic data (1,000 records)
- 📄 **transactions.csv**: Transaction data (5,000 records)  
- 📄 **merged_data.csv**: Joined dataset for analysis

## 🛠️ Development Workflow

### Code Quality

- **Pre-commit hooks** automatically run linting and formatting
- **TypeScript strict mode** for type safety
- **Accessibility linting** with eslint-plugin-jsx-a11y
- **Test coverage** reporting with Vitest

### Git Hooks

```bash
# Automatically runs on commit:
- ESLint --fix
- Prettier --write
- Type checking
```

### Testing Strategy

- **Unit Tests**: Component behavior and edge cases
- **Integration Tests**: Component interaction patterns
- **E2E Tests**: Full user workflows and accessibility features

## 📖 Usage Examples

### Frontend Components

```tsx
import { Button, Input, Modal, DataTable } from './components';

// Accessible button with loading state
<Button variant="primary" loading={isSubmitting}>
  Submit Form
</Button>

// Input with validation
<Input 
  label="Email" 
  error={errors.email}
  onChange={handleChange}
/>

// Sortable data table
<DataTable 
  data={users} 
  columns={columnConfig}
  loading={isLoading}
/>
```

### Analytics

```python
# Run complete EDA analysis
from eda_analysis import main
main()

# Or use individual functions
customers, transactions = generate_sample_data()
merged_data = perform_eda_analysis(customers, transactions)
```

## 🎯 Key Features Delivered

### ✅ Frontend Requirements
- [x] React + TypeScript + Vite setup
- [x] Accessible UI primitives (Button, Input, Modal, DataTable)
- [x] Unit/integration tests (Vitest + React Testing Library) 
- [x] Basic Playwright e2e testing
- [x] ESLint + Prettier configuration
- [x] Husky pre-commit hooks
- [x] Type-check script

### ✅ Analytics Requirements
- [x] Python 3.11+ environment
- [x] pandas-based EDA with 3 distinct plots
- [x] Data join operations demonstrating relational analysis
- [x] Both script and notebook formats
- [x] Comprehensive statistical insights

### ✅ Tooling Requirements
- [x] ESLint + Prettier integration
- [x] Husky pre-commit automation
- [x] TypeScript strict type checking
- [x] Accessibility linting rules

## 🌟 Highlights

- **Production Ready**: Proper build pipeline, testing, and code quality tools
- **Accessibility First**: WCAG compliant components with proper ARIA labels
- **Modern Stack**: Latest versions of React, TypeScript, and Python packages
- **Developer Experience**: Hot reload, comprehensive linting, automated formatting
- **Comprehensive Testing**: Unit, integration, and e2e test coverage
- **Real-World EDA**: Practical data analysis patterns with business insights

This scaffold provides a solid foundation for full-stack development projects requiring both interactive frontend components and data analysis capabilities.
