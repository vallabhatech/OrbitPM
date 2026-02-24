import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Schedule from './components/Schedule';
import TeamProgress from './components/TeamProgress';
import About from './components/About';
import ChatPanel from './components/ChatPanel';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ErrorBoundary>
          <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="ml-16 flex-1 flex">
              <div className="flex-1">
                <ErrorBoundary>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/team" element={<TeamProgress />} />
                    <Route path="/about" element={<About />} />
                  </Routes>
                </ErrorBoundary>
              </div>
              <ErrorBoundary>
                <ChatPanel />
              </ErrorBoundary>
            </div>
          </div>
          <ToastContainer />
        </ErrorBoundary>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
