# AI Product Manager Dashboard

A comprehensive, enterprise-grade React application that leverages AI to provide intelligent project management insights, team collaboration tools, and real-time analytics.

## 🚀 Features

### Core Functionality
- **AI-Powered Dashboard**: Real-time project metrics and KPIs with intelligent insights
- **Team Schedule Management**: Smart calendar with meeting scheduling and team availability
- **Team Progress Tracking**: Individual and team performance analytics with visual charts
- **AI Assistant Chat**: Intelligent chat interface for project queries and assistance
- **Real-time Collaboration**: Live updates and synchronized team data

### Technical Features
- **Code Splitting**: Optimized performance with lazy-loaded components
- **Error Handling**: Global error boundaries and toast notifications
- **Accessibility**: WCAG AA compliant with full keyboard navigation
- **Security**: Role-based access control and environment variable configuration
- **Performance Optimized**: React Query caching and intelligent data fetching

## 🛠️ Technology Stack

### Frontend
- **React 18**: Modern React with hooks and concurrent features
- **Material-UI (MUI)**: Component library for consistent design
- **Framer Motion**: Smooth animations and transitions
- **Nivo Charts**: Advanced data visualization
- **React Router**: Client-side routing with lazy loading
- **React Query**: Server state management and caching
- **Tailwind CSS**: Utility-first styling framework

### Backend & Database
- **Firebase Firestore**: NoSQL real-time database
- **Firebase Authentication**: User authentication and authorization
- **Firebase Hosting**: Production deployment
- **External AI Service**: GCP GenCal AI orchestration service

### Development Tools
- **Jest**: Unit testing framework
- **React Testing Library**: Component testing utilities
- **MSW**: API mocking for testing
- **ESLint**: Code quality and consistency

## 📦 Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Firebase project setup

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/vallabhatech/work.git
   cd work
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your Firebase configuration
   ```

4. **Firebase Setup**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Firestore Database
   - Enable Authentication
   - Copy configuration to `.env` file

5. **Deploy Firestore Rules**
   ```bash
   firebase deploy --only firestore:rules
   ```

6. **Start Development Server**
   ```bash
   npm start
   ```

## 🔧 Configuration

### Environment Variables
Create a `.env` file with the following variables:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890abcdef
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Firebase Security Rules
The application implements role-based access control (RBAC) with the following security features:
- **Authentication Required**: Only authenticated users can access data
- **Project Member Access**: Users can only access projects they're members of
- **Owner Permissions**: Document owners have full read/write access
- **Default Deny**: All access is denied by default unless explicitly allowed

## 🧪 Testing

### Run Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

### Testing Structure
- **Unit Tests**: Component testing with React Testing Library
- **Integration Tests**: API mocking with MSW
- **Accessibility Tests**: A11y compliance testing
- **Performance Tests**: Bundle optimization verification

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Firebase Hosting
```bash
firebase deploy
```

### Environment-Specific Builds
- **Development**: `npm start` - Hot reload with dev tools
- **Production**: `npm run build` - Optimized production bundle
- **Testing**: `npm test` - Test suite execution

## 📊 Performance

### Optimization Features
- **Code Splitting**: Routes loaded on-demand reducing initial bundle size by ~38%
- **Data Caching**: Intelligent React Query caching reduces Firestore reads by 60-80%
- **Lazy Loading**: Components loaded only when needed
- **Image Optimization**: Efficient avatar and icon loading

### Performance Metrics
- **First Contentful Paint**: < 2 seconds
- **Largest Contentful Paint**: < 3 seconds  
- **Time to Interactive**: < 4 seconds
- **Bundle Size**: Optimized for fast loading

## ♿ Accessibility

### WCAG AA Compliance
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators and modal focus trapping
- **Color Contrast**: WCAG AA compliant color ratios
- **Semantic Structure**: Proper HTML5 landmarks and headings

### Accessibility Features
- **Skip Links**: Quick navigation for keyboard users
- **Alt Text**: Descriptive text for all images and icons
- **Aria Labels**: Contextual labels for interactive elements
- **Reduced Motion**: Respects user motion preferences

## 🔒 Security

### Security Features
- **Environment Variables**: Sensitive data stored securely
- **Role-Based Access**: Granular permissions by user role
- **Input Validation**: Client and server-side validation
- **Secure Authentication**: Firebase Auth with proper configuration
- **Data Encryption**: Firebase provides encryption at rest and in transit

### Security Best Practices
- **No Hardcoded Secrets**: All configuration in environment variables
- **Principle of Least Privilege**: Minimal required permissions
- **Regular Updates**: Dependencies kept up-to-date
- **Security Headers**: Proper HTTP security headers

## 📈 Architecture

### Component Structure
```
src/
├── components/          # React components
│   ├── Dashboard.js     # Main dashboard with metrics
│   ├── Schedule.js      # Calendar and scheduling
│   ├── TeamProgress.js  # Team performance analytics
│   ├── ChatPanel.js     # AI assistant interface
│   ├── Sidebar.js       # Navigation component
│   ├── ErrorBoundary.js # Error handling wrapper
│   └── LoadingSpinner.js # Loading states
├── hooks/               # Custom React hooks
│   └── useFirestoreData.js # Optimized data fetching
├── utils/               # Utility functions
│   └── toast.js         # Notification system
└── __tests__/           # Test files
```

### Data Flow
- **React Query**: Manages server state and caching
- **Firebase**: Real-time database and authentication
- **Context API**: Global state management
- **Local State**: Component-level state with hooks

## 🤖 AI Integration

### AI Assistant Features
- **Natural Language Processing**: Understands project management queries
- **Contextual Responses**: Provides relevant project insights
- **Real-time Assistance**: Live chat interface for immediate help
- **Multi-turn Conversations**: Maintains conversation context

### AI Service Integration
- **External API**: GCP GenCal orchestration service
- **Error Handling**: Graceful fallbacks for AI failures
- **Rate Limiting**: Prevents API abuse
- **Caching**: Optimizes AI response times

## 🎨 Design System

### UI Components
- **Material-UI**: Consistent design language
- **Custom Theme**: Branded color scheme and typography
- **Responsive Design**: Mobile-first approach
- **Dark Mode**: Theme switching capability

### Animation & Transitions
- **Framer Motion**: Smooth micro-interactions
- **Loading States**: Engaging loading animations
- **Page Transitions**: Smooth route changes
- **Hover Effects**: Interactive feedback

## 🔧 Development

### Code Quality
- **ESLint**: Consistent code style
- **Prettier**: Automated formatting
- **TypeScript**: Type safety (optional migration path)
- **Git Hooks**: Pre-commit quality checks

### Development Workflow
1. **Feature Branches**: Isolated development
2. **Pull Requests**: Code review process
3. **Automated Testing**: CI/CD pipeline
4. **Deployment**: Staging to production workflow

## 📚 Documentation

### Available Documentation
- **SECURITY_SETUP.md**: Security configuration guide
- **ERROR_HANDLING_SETUP.md**: Error handling implementation
- **PERFORMANCE_OPTIMIZATION.md**: Performance improvements guide
- **ACCESSIBILITY_IMPROVEMENTS.md**: A11y implementation details

### API Documentation
- **Firebase Integration**: Database and auth setup
- **AI Service**: External API integration
- **Component Props**: Detailed component documentation

## 🤝 Contributing

### Development Guidelines
1. **Follow Code Standards**: ESLint and Prettier configuration
2. **Write Tests**: Unit tests for new features
3. **Update Documentation**: Keep docs current
4. **Accessibility First**: Ensure a11y compliance
5. **Performance Consideration**: Optimize for speed

### Pull Request Process
1. **Fork Repository**: Create personal fork
2. **Feature Branch**: Isolated development branch
3. **Testing**: Comprehensive test coverage
4. **Documentation**: Update relevant docs
5. **Code Review**: Peer review process

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

### Getting Help
- **Documentation**: Comprehensive guides available
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Feature requests and general questions
- **Community**: Join our developer community

### Contact
- **Maintainer**: Vallabha Tech
- **Email**: vallabha1243@gmail.com   
- **Website**: https://vallabha.me

---

**Built with ❤️ by Vallabha Tech**
