import React from "react";

const Background = () => {
  return (
    <div className="fixed inset-0 w-full h-screen z-[-1] bg-gray-200">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] flex items-center animate-bounce ease-in-out duration-[10000ms] space-x-4 px-4">
        <img
          src="./images/icon.png"
          className="w-16 sm:w-24 md:w-32"
          alt="Logo"
        />
        <h1 className="text-4xl sm:text-6xl md:text-8xl tracking-[6px] sm:tracking-[8px] md:tracking-[10px] font-mono font-bold text-green-500">
          Inve<span className="text-green-700">trix</span>
        </h1>
      </div>
    </div>
  );
};

export default Background;
