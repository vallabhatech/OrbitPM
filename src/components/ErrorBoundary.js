import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Alert, 
  AlertTitle,
  IconButton 
} from '@mui/material';
import { 
  Refresh as RefreshIcon,
  BugReport as BugReportIcon,
  Home as HomeIcon
} from '@mui/icons-material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      errorId: null
    };
  }

  static getDerivedStateFromError(error) {
    // Generate unique error ID for tracking
    const errorId = `ERR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    return { 
      hasError: true, 
      errorId,
      error 
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Log to external service in production
    if (process.env.NODE_ENV === 'production') {
      // You could integrate with services like Sentry, LogRocket, etc.
      console.error('Production Error:', {
        errorId: this.state.errorId,
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack
      });
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f5f5f5',
            p: 3
          }}
        >
          <Paper
            elevation={3}
            sx={{
              maxWidth: 600,
              p: 4,
              textAlign: 'center'
            }}
          >
            <Box sx={{ mb: 3 }}>
              <BugReportIcon 
                sx={{ 
                  fontSize: 64, 
                  color: 'error.main',
                  mb: 2
                }} 
              />
              <Typography variant="h4" component="h1" gutterBottom color="error.main">
                Oops! Something went wrong
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph>
                We're sorry, but something unexpected happened. Our team has been notified.
              </Typography>
            </Box>

            <Alert severity="warning" sx={{ mb: 3, textAlign: 'left' }}>
              <AlertTitle>Error Reference</AlertTitle>
              <Typography variant="body2" component="code" sx={{ fontSize: '0.875rem' }}>
                {this.state.errorId}
              </Typography>
            </Alert>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <Box sx={{ mb: 3, textAlign: 'left' }}>
                <Alert severity="info">
                  <AlertTitle>Development Details</AlertTitle>
                  <Typography variant="body2" component="pre" sx={{ 
                    fontSize: '0.75rem', 
                    overflow: 'auto',
                    maxHeight: 200,
                    backgroundColor: '#f5f5f5',
                    p: 1,
                    borderRadius: 1
                  }}>
                    {this.state.error.toString()}
                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                  </Typography>
                </Alert>
              </Box>
            )}

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={this.handleReload}
                sx={{ minWidth: 120 }}
              >
                Reload Page
              </Button>
              <Button
                variant="outlined"
                startIcon={<HomeIcon />}
                onClick={this.handleGoHome}
                sx={{ minWidth: 120 }}
              >
                Go Home
              </Button>
            </Box>

            <Typography variant="caption" color="text.secondary" sx={{ mt: 3, display: 'block' }}>
              If this problem persists, please contact support with the error reference above.
            </Typography>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
