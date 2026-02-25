import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/Sidebar';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

// Code split components
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const Schedule = React.lazy(() => import('./components/Schedule'));
const TeamProgress = React.lazy(() => import('./components/TeamProgress'));
const About = React.lazy(() => import('./components/About'));
const ChatPanel = React.lazy(() => import('./components/ChatPanel'));

// Optimized QueryClient with better defaults
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        // Don't retry on permission errors
        if (error?.code === 'permission-denied') return false;
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ErrorBoundary>
          <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="ml-16 flex-1 flex">
              <main className="flex-1">
                <ErrorBoundary>
                  <Suspense fallback={<LoadingSpinner message="Loading dashboard..." />}>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/schedule" element={<Schedule />} />
                      <Route path="/team" element={<TeamProgress />} />
                      <Route path="/about" element={<About />} />
                    </Routes>
                  </Suspense>
                </ErrorBoundary>
              </main>
              <aside>
                <ErrorBoundary>
                  <Suspense fallback={<LoadingSpinner message="Loading chat..." size={24} />}>
                    <ChatPanel />
                  </Suspense>
                </ErrorBoundary>
              </aside>
            </div>
          </div>
          <ToastContainer />
        </ErrorBoundary>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
