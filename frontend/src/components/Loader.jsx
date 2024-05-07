import React, { useState, useEffect } from 'react';
import PacmanLoader from "react-spinners/PacmanLoader";

const Loader = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <>
            {loading && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-80 z-50">
                    <div className="text-white">
                        <PacmanLoader color={'#d63636'} loading={loading} size={50} />
                    </div>
                </div>
            )}
        </>
    );
}

export default Loader;
