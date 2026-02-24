import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingSpinner = ({ 
  size = 40, 
  message = 'Loading...', 
  fullScreen = false,
  minHeight = '200px'
}) => {
  const containerProps = fullScreen 
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        zIndex: 9999
      }
    : {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight,
        padding: 2
      };

  return (
    <Box sx={containerProps}>
      <CircularProgress 
        size={size} 
        thickness={4}
        sx={{
          color: 'primary.main',
          marginBottom: message ? 2 : 0
        }}
      />
      {message && (
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ marginTop: 1 }}
        >
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default LoadingSpinner;
