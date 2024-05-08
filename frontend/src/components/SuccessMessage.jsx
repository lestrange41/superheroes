import React from 'react'

const SuccessMessage = ({ isOpen, message }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-xl text-center mb-4 text-black">{message}</p>
          </div>
        </div>
      )}
    </>
  );
}

export default SuccessMessage;
