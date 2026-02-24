import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Toast configuration
export const toastConfig = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
};

// Custom toast types
export const showToast = {
  success: (message, options = {}) => {
    return toast.success(message, { ...toastConfig, ...options });
  },
  
  error: (message, options = {}) => {
    return toast.error(message, { 
      ...toastConfig, 
      autoClose: 8000, // Errors stay longer
      ...options 
    });
  },
  
  warning: (message, options = {}) => {
    return toast.warning(message, { ...toastConfig, ...options });
  },
  
  info: (message, options = {}) => {
    return toast.info(message, { ...toastConfig, ...options });
  },
  
  // Network error specific
  networkError: (error, defaultMessage = 'Network request failed') => {
    const message = error?.message || defaultMessage;
    return toast.error(`🌐 ${message}`, {
      ...toastConfig,
      autoClose: 10000,
    });
  },
  
  // Firebase error specific
  firebaseError: (error, defaultMessage = 'Database operation failed') => {
    let message = defaultMessage;
    
    // Handle common Firebase error codes
    if (error?.code) {
      switch (error.code) {
        case 'permission-denied':
          message = 'You don\'t have permission to perform this action';
          break;
        case 'unavailable':
          message = 'Service is currently unavailable. Please try again later';
          break;
        case 'deadline-exceeded':
          message = 'Request timed out. Please check your connection';
          break;
        case 'not-found':
          message = 'The requested data was not found';
          break;
        case 'already-exists':
          message = 'This data already exists';
          break;
        case 'resource-exhausted':
          message = 'Too many requests. Please try again later';
          break;
        case 'unauthenticated':
          message = 'Please sign in to continue';
          break;
        default:
          message = error.message || defaultMessage;
      }
    }
    
    return toast.error(`🔥 ${message}`, {
      ...toastConfig,
      autoClose: 8000,
    });
  },
  
  // AI API error specific
  aiError: (error, defaultMessage = 'AI service unavailable') => {
    const message = error?.message || defaultMessage;
    return toast.error(`🤖 ${message}`, {
      ...toastConfig,
      autoClose: 8000,
    });
  }
};

export default showToast;
