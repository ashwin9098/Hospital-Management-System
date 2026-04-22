import React from 'react';

const TopLoadingBar = ({ message }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-blue-500 text-white p-2 text-center">
      {message}
    </div>
  );
};

export default TopLoadingBar;
