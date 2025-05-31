import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-10 w-10">
      <img
        src="./images/icon.png"
        alt="Loading"
        className="animate-spin w-10 h-10"
      />
    </div>
  );
};

export default Loading;
