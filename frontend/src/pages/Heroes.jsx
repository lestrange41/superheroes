import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ConfirmationDialog from '../components/ConfirmationDialog';
import img1 from '../img/laboratorio.jpeg'

const Heroes = () => {
    const [heroes, setHeroes] = useState([]);
    const [filteredHeroes, setFilteredHeroes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedHeroId, setSelectedHeroId] = useState(null);

    useEffect(() => {
        const fetchHeroes = async () => {
            try {
                const response = await axios.get('http://localhost:3000/superheroes');
                setHeroes(response.data);
            } catch (error) {
                console.error('Error al obtener los héroes:', error);
            }
        };

        fetchHeroes();
    }, []);

    useEffect(() => {
        const filtered = heroes.filter(hero =>
            hero.nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredHeroes(filtered);
    }, [heroes, searchTerm]);

    const handleEdit = (id) => {
        // Redirige a la página de edición del héroe con el ID proporcionado
        window.location.href = `/editarheroe/${id}`;
    };

    const handleDelete = async (id) => {
        setSelectedHeroId(id);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/superheroes/${selectedHeroId}`);
            // Actualiza la lista de héroes después de la eliminación
            const updatedHeroes = heroes.filter(hero => hero.id !== selectedHeroId);
            setHeroes(updatedHeroes);
        } catch (error) {
            console.error('Error al borrar el héroe:', error);
        }
        setSelectedHeroId(null);
    };

    const cancelDelete = () => {
        setSelectedHeroId(null);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const getCardColor = (tipo) => {
        return tipo.toLowerCase() === 'villano' ? 'bg-rose-950' : 'bg-blue-900';
    };

    return (
        <div style={{backgroundImage: `url(${img1})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>
            <Navbar />
            <div className='container mx-auto py-8'>
                
                <div className="mt-8">
                    <Link to="/crearheroe" className="bg-primary hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                        + Añade un SUPERHÉROE 
                    </Link>
                </div>
                <div className="mt-8">
                    <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Buscar por nombre" className="w-full border border-gray-300 bg-gray-200 rounded-md p-2 text-black" />
                </div>
                <div className='grid grid-cols-3 gap-4 mt-8'>
                    {filteredHeroes.map((heroe) => (
                        <div key={heroe.id} className={`border border-red-300 p-4 rounded-lg ${getCardColor(heroe.tipo)}`}>
                        <h2 className='text-3xl text-primary font-semibold mb-4'>{heroe.nombre.charAt(0).toUpperCase() + heroe.nombre.slice(1)}</h2>
                        <p className='text-white-600 mb-2'><strong>Nombre Real:</strong> {heroe.nombreReal}</p>
                        <p className='text-white-600 mb-2'><strong>Tipo:</strong> {heroe.tipo}</p>
                        <p className='text-white-600 mb-2'><strong>Poderes:</strong> {heroe.poderes}</p>
                        <p className='text-white-600 mb-2'><strong>Edad:</strong> {heroe.edad}</p>
                        <p className='text-white-600 mb-2'><strong>Raza:</strong> {heroe.raza}</p>
                        <p className='text-white-600 mb-4'><strong>Género:</strong> {heroe.genero}</p>
                        <div className="flex justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEdit(heroe.id)}>Editar</button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(heroe.id)}>Eliminar</button>
                        </div>
                    </div>
                    
                    ))}
                </div>
                <ConfirmationDialog
                    isOpen={selectedHeroId !== null}
                    message="¿Estás seguro de que deseas borrar este héroe?"
                    onCancel={cancelDelete}
                    onConfirm={confirmDelete}
                />
            </div>
        </div>
    );
}
    

export default Heroes;
