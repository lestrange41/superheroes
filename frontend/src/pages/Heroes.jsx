import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ConfirmationDialog from '../components/ConfirmationDialog';
import img1 from '../img/dcvsmarvel.jpg';
import SuccessMessage from '../components/SuccessMessage';

const Heroes = () => {
    const [heroes, setHeroes] = useState([]);
    const [filteredHeroes, setFilteredHeroes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedHeroId, setSelectedHeroId] = useState(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    useEffect(() => {
        const fetchHeroes = async () => {
            try {
                const response = await axios.get('http://localhost:3000/superheroes');
                setHeroes(response.data);
            } catch (error) {
                console.error('Error fetching heroes:', error);
            }
        };

        fetchHeroes();
    }, []);

    useEffect(() => {
        const filtered = heroes.filter(hero =>
            hero.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredHeroes(filtered);
    }, [heroes, searchTerm]);

    const handleEdit = (id) => {
        window.location.href = `/editHero/${id}`;
    };

    const handleDelete = async (id) => {
        setSelectedHeroId(id);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/superheroes/${selectedHeroId}`);

            const updatedHeroes = heroes.filter(hero => hero.id !== selectedHeroId);
            setHeroes(updatedHeroes);
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
        } catch (error) {
            console.error('Error deleting hero:', error);
        }
        setSelectedHeroId(null);
    };

    const cancelDelete = () => {
        setSelectedHeroId(null);
    };

    const handleSearch = (e) => {
        const searchTermCapitalized = e.target.value.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        setSearchTerm(searchTermCapitalized);
    };

    const getCardColor = (type) => {
        return type.toLowerCase() === 'villano' ? 'bg-rose-950' : 'bg-blue-900';
    };

    return (
        <div>
            <div style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
                <Navbar />
                <div className='container mx-auto py-8'>
                    <div className="mt-8">
                        <Link to="/createHero" className="bg-primary hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            + Añadir un Superhéroe
                        </Link>
                    </div>
                    <div className="mt-8">
                        <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Buscar un superhéroe" className="w-full border border-gray-300 bg-gray-200 rounded-md p-2 text-black" />
                    </div>
                    <div className='grid grid-cols-3 gap-4 mt-8'>
                        {filteredHeroes.map((hero) => (
                            <div key={hero.id} className={`border border-red-300 p-4 rounded-lg ${getCardColor(hero.type)}`}>
                            <h2 className='text-3xl text-primary font-semibold mb-4'>{hero.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}</h2>
                                <p className='text-white-600 mb-2'><strong>Nombre real:</strong> {hero.realName}</p>
                                <p className='text-white-600 mb-2'><strong>Tipo:</strong> {hero.type}</p>
                                <p className='text-white-600 mb-2'><strong>Poderes:</strong> {hero.powers}</p>
                                <p className='text-white-600 mb-2'><strong>Edad:</strong> {hero.age}</p>
                                <p className='text-white-600 mb-2'><strong>Raza:</strong> {hero.race}</p>
                                <p className='text-white-600 mb-4'><strong>Género:</strong> {hero.gender}</p>
                                <div className="flex justify-between">
                                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-4" onClick={() => handleEdit(hero.id)}>Editar</button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(hero.id)}>Eliminar</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <ConfirmationDialog
                        isOpen={selectedHeroId !== null}
                        message="Estas seguro que quieres eliminiar el superhéroe?"
                        onCancel={cancelDelete}
                        onConfirm={confirmDelete}
                    />
                    <SuccessMessage
                        isOpen={showSuccessMessage}
                        message="El superhéroe ha sido eliminado correctamente."
                    />
                </div>
            </div>
        </div>
    );
};

export default Heroes;
