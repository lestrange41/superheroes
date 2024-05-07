import React from 'react'
import img from '../img/superman-triste.png'

const Error404 = () => {
    return (
        <div className='flex flex-col justify-center items-center h-screen'>
            <div className='text-center text-4xl'>Error 404, página no encontrada</div>
            <img src={img} alt="Superman triste" className="mt-4" />
        </div>
    );
}

export default Error404;
