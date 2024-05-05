import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import EditAndSave from '../components/EditAndSave';

const EditHero = () => {
    const { id } = useParams();
    const [hero, setHero] = useState({
        nombre: '',
        nombreReal: '',
        tipo: '',
        poderes: '',
        edad: 0,
        raza: '',
        genero: ''
    });

    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/superheroes/${id}`);
                setHero(response.data);
            } catch (error) {
                console.error('Error al obtener el héroe:', error);
            }
        };

        fetchHero();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setHero({
            ...hero,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowConfirmationDialog(true); // Abre el diálogo de confirmación antes de guardar los cambios
    };

    const handleConfirmSubmit = async () => {
        try {
            await axios.put(`http://localhost:3000/superheroes/${id}`, hero);
            console.log('Héroe actualizado exitosamente');
            setShowConfirmationDialog(false); // Cierra el diálogo de confirmación
            // Aquí podrías redirigir a la página de detalles del héroe actualizado o a otra página
        } catch (error) {
            console.error('Error al actualizar el héroe:', error);
        }
    };

    const handleCancelSubmit = () => {
        setShowConfirmationDialog(false); // Cierra el diálogo de confirmación
    };

    return (
        <div>
            <Navbar />
            <div className='container mx-auto py-8'>
                <h1 className='text-3xl font-bold text-center mb-8 text-primary'>Editar Héroe</h1>
                <form onSubmit={handleSubmit}>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='col-span-2'>
                            <label className='block mb-2 text-white-600'>Nombre</label>
                            <input type='text' name='nombre' value={hero.nombre} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2 text-black' />
                        </div>
                        <div className='col-span-2'>
                            <label className='block mb-2'>Nombre Real</label>
                            <input type='text' name='nombreReal' value={hero.nombreReal} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2 text-black' />
                        </div>
                        <div className='col-span-2'>
                            <label className='block mb-2'>Tipo:</label>
                            <select name='genero' value={hero.genero} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2 text-black'>
                                <option value='Héroe'>Héroe</option>
                                <option value='Villano'>Villano</option>
                            </select>
                        </div>
                        <div className='col-span-2'>
                            <label className='block mb-2'>Poderes</label>
                            <textarea name='poderes' value={hero.poderes} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2 text-black'></textarea>
                        </div>
                        <div className='col-span-1'>
                            <label className='block mb-2'>Edad</label>
                            <input type='number' name='edad' value={hero.edad} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2 text-black' />
                        </div>
                        <div className='col-span-1'>
                            <label className='block mb-2'>Raza</label>
                            <input type='text' name='raza' value={hero.raza} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2 text-black' />
                        </div>
                        <div className='col-span-2'>
                            <label className='block mb-2'>Género</label>
                            <select name='genero' value={hero.genero} onChange={handleChange} className='w-full border border-gray-300 rounded-md p-2 text-black'>
                                <option value='Masculino'>Masculino</option>
                                <option value='Femenino'>Femenino</option>
                            </select>
                        </div>
                        <div className='col-span-2'>
                            <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Guardar</button>
                        </div>
                    </div>
                </form>
                <EditAndSave
                    isOpen={showConfirmationDialog}
                    message="¿Estás seguro de que deseas guardar los cambios?"
                    onCancel={handleCancelSubmit}
                    onConfirm={handleConfirmSubmit}
                />
            </div>
        </div>
    );
};

export default EditHero;
