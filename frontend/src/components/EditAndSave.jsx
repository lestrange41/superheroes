import React from 'react';

const EditAndSave = ({ isOpen, message, onCancel, onConfirm }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="text-xl text-center mb-4 text-black">{message}</p>
                        <div className="flex justify-center">
                            <button
                                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-4"
                                onClick={onCancel}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mr-4 rounded"
                                onClick={onConfirm}
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default EditAndSave;
