# Development Guide

## 🚀 Quick Start for Developers

This guide provides everything you need to get started developing the AI Product Manager Dashboard.

## 📋 Prerequisites

### Required Software
- **Node.js**: Version 16.0 or higher
- **npm**: Version 7.0 or higher (comes with Node.js)
- **Git**: For version control
- **VS Code**: Recommended IDE with extensions
- **Firebase CLI**: For deployment and database management

### VS Code Extensions (Recommended)
```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-jest",
    "formulahendry.auto-rename-tag",
    "christian-kohler.path-intellisense"
  ]
}
```

## 🛠️ Setup Process

### 1. Repository Setup
```bash
# Clone the repository
git clone https://github.com/vallabhatech/work.git
cd work

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
```

### 2. Environment Configuration
Edit `.env` file with your Firebase credentials:
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890abcdef
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Firebase Setup
```bash
# Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (if not already done)
firebase init

# Deploy security rules
firebase deploy --only firestore:rules
```

### 4. Start Development
```bash
# Start development server
npm start

# Run tests in another terminal
npm test -- --watch
```

## 🏗️ Project Architecture

### Directory Structure
```
src/
├── components/          # React components
│   ├── Dashboard.js     # Main dashboard component
│   ├── Schedule.js      # Calendar and scheduling
│   ├── TeamProgress.js  # Team analytics
│   ├── ChatPanel.js     # AI assistant
│   ├── Sidebar.js       # Navigation
│   ├── ErrorBoundary.js # Error handling
│   └── LoadingSpinner.js # Loading states
├── hooks/               # Custom React hooks
│   └── useFirestoreData.js # Data fetching hooks
├── utils/               # Utility functions
│   └── toast.js         # Notification system
├── __tests__/           # Test files
│   ├── components/      # Component tests
│   └── setupTests.js    # Test configuration
├── firebase-config.js   # Firebase initialization
├── App.js              # Main application component
└── index.js            # Application entry point
```

### Component Hierarchy
```
App
├── ErrorBoundary (Global)
│   ├── Sidebar (Navigation)
│   └── Main Content
│       ├── ErrorBoundary (Routes)
│       │   ├── Dashboard
│       │   ├── Schedule
│       │   ├── TeamProgress
│       │   └── About
│       └── ChatPanel
│           └── ErrorBoundary (Chat)
```

## 🔧 Development Workflow

### 1. Feature Development
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes
# ... develop your feature ...

# Run tests
npm test

# Format code
npm run format

# Lint code
npm run lint

# Commit changes
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/new-feature
```

### 2. Code Standards

#### ESLint Configuration
```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:jsx-a11y/recommended'
  ],
  rules: {
    'jsx-a11y/anchor-is-valid': 'warn',
    'jsx-a11y/alt-text': 'error',
    'prefer-const': 'error',
    'no-var': 'error'
  }
};
```

#### Prettier Configuration
```json
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

### 3. Testing Guidelines

#### Unit Testing
```javascript
// Example component test
import React from 'react';
import { render, screen } from '@testing-library/react';
import Component from './Component';

describe('Component', () => {
  test('renders correctly', () => {
    render(<Component />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  test('handles user interaction', () => {
    const handleClick = jest.fn();
    render(<Component onClick={handleClick} />);
    
    screen.getByRole('button').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

#### Accessibility Testing
```javascript
// Example accessibility test
import { axe, toHaveNoViolations } from 'jest-axe';

test('should not have accessibility violations', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

## 🎯 Common Development Tasks

### Adding a New Component
1. Create component file in `src/components/`
2. Follow naming convention: `PascalCase.js`
3. Include proper props and TypeScript-style JSDoc
4. Add accessibility attributes
5. Write tests in `src/__tests__/components/`

```javascript
// Example new component
import React from 'react';
import { motion } from 'framer-motion';

/**
 * NewComponent - Brief description
 * @param {Object} props - Component props
 * @param {string} props.title - Component title
 * @param {Function} props.onClick - Click handler
 */
const NewComponent = ({ title, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      onClick={onClick}
      aria-label={title}
      className="new-component"
    >
      {title}
    </motion.button>
  );
};

export default NewComponent;
```

### Adding a New Hook
1. Create hook file in `src/hooks/`
2. Use `use` prefix for hook names
3. Include proper error handling
4. Add tests for the hook

```javascript
// Example custom hook
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

export const useCustomData = (id) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['customData', id],
    queryFn: () => fetchCustomData(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (error) {
      console.error('Error fetching custom data:', error);
    }
  }, [error]);

  return { data, isLoading, error };
};
```

### Adding New API Endpoints
1. Update Firebase security rules
2. Create utility functions in `src/utils/`
3. Add error handling and loading states
4. Write tests for API calls

```javascript
// Example API utility
import { doc, getDoc, setDoc } from 'firebase/firestore';
import db from '../firebase-config';

export const fetchDocument = async (collection, id) => {
  try {
    const docRef = doc(db, collection, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  } catch (error) {
    console.error(`Error fetching ${collection}/${id}:`, error);
    throw error;
  }
};

export const updateDocument = async (collection, id, data) => {
  try {
    const docRef = doc(db, collection, id);
    await setDoc(docRef, data, { merge: true });
    return true;
  } catch (error) {
    console.error(`Error updating ${collection}/${id}:`, error);
    throw error;
  }
};
```

## 🐛 Debugging Guide

### Common Issues

#### Firebase Connection Issues
```javascript
// Check Firebase configuration
import { getApps, initializeApp } from 'firebase/app';

if (!getApps().length) {
  console.error('Firebase not initialized');
  // Check environment variables
}
```

#### React Query Issues
```javascript
// Enable React Query devtools in development
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Add to App.js in development
if (process.env.NODE_ENV === 'development') {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* Your app */}
      </QueryClientProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}
```

#### Performance Issues
```javascript
// Check bundle size
npm run build

// Analyze bundle
npx webpack-bundle-analyzer build/static/js/*.js

// Check React Query cache
console.log(queryClient.getQueryCache().getAll());
```

### Debugging Tools

#### Browser DevTools
- **React DevTools**: Component inspection and state debugging
- **Redux DevTools**: (if using Redux) State management debugging
- **Network Tab**: API request monitoring
- **Performance Tab**: Rendering performance analysis

#### VS Code Debugging
```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug React App",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["start"]
    }
  ]
}
```

## 📱 Testing Strategy

### Test Types
1. **Unit Tests**: Individual component testing
2. **Integration Tests**: Component interaction testing
3. **E2E Tests**: Full user journey testing
4. **Accessibility Tests**: WCAG compliance testing
5. **Performance Tests**: Load and rendering performance

### Testing Commands
```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch

# Run specific test file
npm test -- Component.test.js

# Run tests matching pattern
npm test -- --testNamePattern="should render"
```

### Test Coverage Goals
- **Statements**: 80%+
- **Branches**: 75%+
- **Functions**: 80%+
- **Lines**: 80%+

## 🚀 Deployment

### Development Deployment
```bash
# Deploy to Firebase hosting
npm run build
firebase deploy
```

### Production Deployment
```bash
# Build for production
npm run build

# Deploy to production
firebase deploy --only hosting:production

# Deploy Firestore rules
firebase deploy --only firestore:rules
```

### Environment Variables
- **Development**: `.env.development`
- **Production**: `.env.production`
- **Testing**: `.env.test`

## 🔧 Performance Optimization

### Code Splitting
```javascript
// Lazy loading components
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// Use with Suspense
<Suspense fallback={<LoadingSpinner />}>
  <LazyComponent />
</Suspense>
```

### Image Optimization
```javascript
// Use next/image style optimization
const OptimizedImage = ({ src, alt, ...props }) => (
  <img
    src={src}
    alt={alt}
    loading="lazy"
    {...props}
  />
);
```

### Bundle Optimization
```javascript
// Dynamic imports for large libraries
const loadChartLibrary = () => import('heavy-chart-library');

// Use in component
useEffect(() => {
  loadChartLibrary().then(module => {
    // Use library
  });
}, []);
```

## 📚 Resources

### Documentation
- [React Documentation](https://react.dev/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Material-UI Documentation](https://mui.com/)
- [React Query Documentation](https://tanstack.com/query/latest)

### Tools
- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/)
- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/)
- [Accessibility Inspector](https://chrome.google.com/webstore/detail/accessibility-inspector-for/)

### Communities
- [React Community](https://react.dev/community)
- [Firebase Community](https://firebase.google.com/community)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/react)

---

## 🆘 Getting Help

### Common Issues Solutions
1. **Firebase Connection**: Check environment variables and project settings
2. **Build Errors**: Clear node_modules and reinstall dependencies
3. **Test Failures**: Check test environment setup and mocks
4. **Performance Issues**: Use React.memo and useMemo for optimization

### Support Channels
- **GitHub Issues**: Report bugs and request features
- **Documentation**: Check existing docs and guides
- **Community**: Join discussions and ask questions
- **Team**: Contact development team for critical issues

---

Happy coding! 🚀
