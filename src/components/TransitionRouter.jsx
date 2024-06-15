import React from 'react';
import { useLocation } from 'react-router-dom';

const TransitionRouter = ({ children }) => {
  const location = useLocation();

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        key={location.key}
      >
        {children}
      </div>
    </div>
  );
};

export default TransitionRouter;