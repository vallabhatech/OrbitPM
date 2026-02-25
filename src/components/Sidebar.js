import React from 'react';
import { motion } from 'framer-motion';
import { 
  Dashboard, 
  Schedule, 
  People, 
  Info
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const SidebarIcon = ({ icon, text, active, onClick }) => {
  return (
    <button
      className="relative group"
      onClick={onClick}
      aria-label={`Navigate to ${text}`}
      aria-current={active ? 'page' : undefined}
      tabIndex={0}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        className={`sidebar-icon ${active ? 'bg-green-600 text-white' : ''}`}
        role="button"
        tabIndex={-1}
      >
        {icon}
      </motion.div>
      <span className="sidebar-tooltip group-hover:scale-100" role="tooltip">
        {text}
      </span>
    </button>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const routes = [
    { path: '/', icon: <Dashboard />, text: 'Dashboard' },
    { path: '/schedule', icon: <Schedule />, text: 'Schedule' },
    { path: '/team', icon: <People />, text: 'Team Progress' },
    { path: '/about', icon: <Info />, text: 'About' },
  ];

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className="fixed left-0 top-0 h-screen w-16 m-0 flex flex-col
                bg-gray-900 text-white shadow-lg z-40"
    >
      <div className="flex flex-col items-center mt-4">
        {routes.map((route) => (
          <SidebarIcon
            key={route.path}
            icon={route.icon}
            text={route.text}
            active={location.pathname === route.path}
            onClick={() => navigate(route.path)}
          />
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;