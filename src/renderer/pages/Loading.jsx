import React, { useState, useEffect } from 'react';

const Loading = () => {
  const [loading, setLoading] = useState(true);

  const loadingStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'white',
    color: 'black',
    transition: 'opacity 0.5s ease-in-out',
  };

  return (
    <div style={loadingStyles}>
      <h1>Loading...</h1>
    </div>
  );
};

export default Loading;