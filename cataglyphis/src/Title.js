import React from 'react';

const Title = () => {
  const titleStyle = {
    textAlign: 'center',
    color: 'black',
    fontFamily: 'Arial, sans-serif',
    fontSize: '48px',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
  };

  return (
    <h1 style={titleStyle}>Cataglyphis</h1>
  );
};

export default Title;