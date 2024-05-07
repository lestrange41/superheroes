import React from 'react';

const ConfirmationDialog = ({ isOpen, message, onCancel, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg shadow-md">
                <p className="text-lg mb-4 text-black">{message}</p>
                <div className="flex justify-center ">
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-4" onClick={onCancel}>Cancelar</button>
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={onConfirm}>Confirmar</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;

