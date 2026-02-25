# Contributing to AI Product Manager Dashboard

Thank you for your interest in contributing to the AI Product Manager Dashboard! This guide will help you get started with contributing to our project.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Git
- Basic knowledge of React, JavaScript, and Firebase
- Familiarity with accessibility best practices

### Setup Instructions
1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install`
4. Create a feature branch: `git checkout -b feature/your-feature-name`
5. Make your changes
6. Run tests: `npm test`
7. Submit a pull request

## 📋 Development Guidelines

### Code Standards

#### JavaScript/React
- Use ES6+ features
- Follow React best practices
- Use functional components with hooks
- Implement proper error handling
- Write meaningful comments

```javascript
// ✅ Good example
const Component = ({ data, onAction }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = useCallback(() => {
    setLoading(true);
    onAction(data)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [data, onAction]);

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? 'Loading...' : 'Submit'}
    </button>
  );
};

// ❌ Avoid this
const Component = (props) => {
  return <button onClick={() => props.onAction(props.data)}>
        Submit
      </button>;
};
```

#### CSS/Tailwind
- Use Tailwind utility classes
- Keep styles consistent with design system
- Ensure accessibility (contrast, focus states)
- Use responsive design principles

```jsx
// ✅ Good example
<button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
  Submit
</button>

// ❌ Avoid this
<button className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
  Submit
</button>
```

### Component Guidelines

#### File Structure
```
src/components/
├── ComponentName.js
├── ComponentName.test.js
├── ComponentName.stories.js (optional)
└── index.js (optional)
```

#### Component Template
```javascript
import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { showToast } from '../utils/toast';

/**
 * ComponentName - Brief description of what this component does
 * @param {Object} props - Component props
 * @param {string} props.title - Component title
 * @param {Function} props.onAction - Action handler
 * @param {boolean} props.disabled - Whether component is disabled
 */
const ComponentName = ({ title, onAction, disabled = false }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = useCallback(async () => {
    if (disabled || loading) return;
    
    setLoading(true);
    try {
      await onAction();
      showToast.success('Action completed successfully');
    } catch (error) {
      showToast.error('Action failed');
      console.error('Component action error:', error);
    } finally {
      setLoading(false);
    }
  }, [disabled, loading, onAction]);

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={handleClick}
      disabled={disabled || loading}
      aria-label={title}
      aria-busy={loading}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
    >
      {loading ? 'Loading...' : title}
    </motion.button>
  );
};

export default ComponentName;
```

## 🧪 Testing Guidelines

### Test Structure
```javascript
// ComponentName.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import ComponentName from './ComponentName';

// Extend Jest matchers
expect.extend(toHaveNoViolations);

describe('ComponentName', () => {
  // Basic rendering tests
  test('renders correctly with required props', () => {
    const mockAction = jest.fn();
    render(<ComponentName title="Test" onAction={mockAction} />);
    
    expect(screen.getByRole('button', { name: 'Test' })).toBeInTheDocument();
  });

  // Interaction tests
  test('calls onAction when clicked', async () => {
    const mockAction = jest.fn();
    render(<ComponentName title="Test" onAction={mockAction} />);
    
    fireEvent.click(screen.getByRole('button', { name: 'Test' }));
    
    await waitFor(() => {
      expect(mockAction).toHaveBeenCalledTimes(1);
    });
  });

  // Accessibility tests
  test('should not have accessibility violations', async () => {
    const mockAction = jest.fn();
    const { container } = render(
      <ComponentName title="Test" onAction={mockAction} />
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  // Edge cases
  test('is disabled when disabled prop is true', () => {
    const mockAction = jest.fn();
    render(<ComponentName title="Test" onAction={mockAction} disabled />);
    
    const button = screen.getByRole('button', { name: 'Test' });
    expect(button).toBeDisabled();
  });
});
```

### Testing Requirements
- **Unit Tests**: All components must have unit tests
- **Accessibility Tests**: All interactive components must pass axe tests
- **Integration Tests**: Critical user flows should have integration tests
- **Coverage**: Maintain 80%+ test coverage

## ♿ Accessibility Guidelines

### Required A11y Features
- **Keyboard Navigation**: All interactive elements must be keyboard accessible
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators and logical tab order
- **Color Contrast**: WCAG AA compliant color ratios (4.5:1 minimum)
- **Alternative Text**: All images and icons need descriptive alt text

### Accessibility Checklist
- [ ] Semantic HTML elements used appropriately
- [ ] All interactive elements have accessible names
- [ ] Focus indicators are visible and clear
- [ ] Keyboard navigation works for all features
- [ ] ARIA labels are descriptive and accurate
- [ ] Color contrast meets WCAG AA standards
- [ ] Forms have proper labels and error messages
- [ ] Modals trap focus and can be closed with Escape key

### Example Accessible Component
```jsx
// ✅ Accessible button with proper ARIA
<button
  onClick={handleClick}
  aria-label="Submit form"
  aria-describedby="submit-help"
  disabled={loading}
  className="px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  {loading ? 'Submitting...' : 'Submit'}
</button>
<div id="submit-help" className="sr-only">
  Submits the form and processes your request
</div>

// ✅ Accessible form input
<label htmlFor="email" className="block text-sm font-medium text-gray-700">
  Email Address
</label>
<input
  type="email"
  id="email"
  name="email"
  required
  aria-describedby="email-error"
  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
/>
{error && (
  <div id="email-error" className="mt-2 text-sm text-red-600" role="alert">
    {error}
  </div>
)}
```

## 🔒 Security Guidelines

### Security Best Practices
- **Input Validation**: Validate all user inputs on both client and server
- **Authentication**: Use Firebase Auth for user authentication
- **Authorization**: Implement proper role-based access control
- **Data Protection**: Never expose sensitive data in client-side code
- **API Security**: Use HTTPS and validate all API requests

### Security Checklist
- [ ] Environment variables used for sensitive configuration
- [ ] Input validation implemented for all forms
- [ ] Firebase security rules are properly configured
- [ ] No hardcoded secrets in the codebase
- [ ] Proper error handling without information leakage

## 📝 Documentation Guidelines

### Code Comments
```javascript
/**
 * Calculates the completion percentage for a project
 * @param {Object} project - The project object
 * @param {number} project.completed - Number of completed tasks
 * @param {number} project.total - Total number of tasks
 * @returns {number} Completion percentage (0-100)
 * @throws {Error} If project data is invalid
 */
const calculateProgress = (project) => {
  if (!project || typeof project.completed !== 'number' || typeof project.total !== 'number') {
    throw new Error('Invalid project data');
  }
  
  if (project.total === 0) return 0;
  return Math.round((project.completed / project.total) * 100);
};
```

### README Updates
When adding new features:
1. Update the main README.md
2. Add relevant sections to the DEVELOPMENT_GUIDE.md
3. Update CHANGELOG.md with new features
4. Add new documentation files if needed

## 🔄 Pull Request Process

### Before Submitting
1. **Code Review**: Self-review your code
2. **Tests**: Ensure all tests pass
3. **Linting**: Run `npm run lint` and fix any issues
4. **Formatting**: Run `npm run format` to ensure consistent formatting
5. **Documentation**: Update relevant documentation

### Pull Request Template
```markdown
## Description
Brief description of the changes made.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] All tests pass
- [ ] New tests added for new features
- [ ] Accessibility tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No hardcoded secrets
- [ ] Accessibility compliance verified
```

### Review Process
1. **Automated Checks**: CI/CD pipeline runs tests and linting
2. **Peer Review**: At least one team member reviews the PR
3. **Accessibility Review**: A11y compliance is verified
4. **Security Review**: Security implications are assessed
5. **Merge**: PR is merged after approval

## 🐛 Bug Reports

### Bug Report Template
```markdown
## Bug Description
Clear and concise description of the bug.

## Steps to Reproduce
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

## Expected Behavior
What you expected to happen.

## Actual Behavior
What actually happened.

## Screenshots
Add screenshots to help explain your problem.

## Environment
- OS: [e.g. Windows 10, macOS 12.0]
- Browser: [e.g. Chrome, Firefox, Safari]
- Version: [e.g. 22]

## Additional Context
Add any other context about the problem here.
```

## 💡 Feature Requests

### Feature Request Template
```markdown
## Feature Description
Clear and concise description of the feature.

## Problem Statement
What problem does this feature solve?

## Proposed Solution
How do you envision this feature working?

## Alternatives Considered
What other approaches did you consider?

## Additional Context
Add any other context or screenshots about the feature request here.
```

## 🏆 Recognition

### Contributor Recognition
- **Contributors**: Listed in README.md
- **Special Thanks**: Acknowledged in release notes
- **Badges**: Earn badges for significant contributions
- **Swag**: Receive project swag for major contributions

### Contribution Types
- **Code**: Bug fixes, features, improvements
- **Documentation**: Guides, tutorials, API docs
- **Testing**: Test cases, test improvements
- **Design**: UI/UX improvements, accessibility
- **Community**: Support, reviews, feedback

## 📞 Getting Help

### Resources
- **Documentation**: Check existing docs first
- **Issues**: Search existing issues before creating new ones
- **Discussions**: Use GitHub Discussions for questions
- **Community**: Join our developer community

### Contact
- **Maintainers**: Tag maintainainers in issues for priority attention
- **Security Issues**: Report security issues privately
- **Urgent Issues**: Use "urgent" label for critical bugs

---

## 🎉 Thank You!

Your contributions help make the AI Product Manager Dashboard better for everyone. We appreciate your time and effort in improving our project!

**Happy Contributing! 🚀**
