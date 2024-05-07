import React, { useEffect, useState } from 'react';
import photoSpinner from '../img/reloadred.svg';

const Loader = () => {
  const [showImg, setShowImg] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowImg(false);
    }, 3000);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
      <div className="bg-gray-900 bg-opacity-50 p-4 rounded-lg">
        {showImg && (
          <img src={photoSpinner} alt="Animation Batman Bat" />
        )}
      </div>
    </div>
  );
};

export default Loader;
