import React, { useState } from 'react';

interface MyPopupProps {
  content: string;
  children: React.ReactNode;
}

const MyPopup: React.FC<MyPopupProps> = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setIsVisible(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Element (children) */}
      {children}

      {/* Popup content */}
      {isVisible && (
        <div className="absolute z-10 p-2 bg-gray-800 text-white text-sm rounded-md shadow-lg max-w-xs">
          {content}
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-0 h-0 border-x-8 border-x-transparent border-b-8 border-b-gray-800"></div>
        </div>
      )}
    </div>
  );
};

export default MyPopup;
