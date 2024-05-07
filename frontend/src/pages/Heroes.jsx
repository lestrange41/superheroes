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
        const searchTermCapitalized = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
        setSearchTerm(searchTermCapitalized);
    };

    const getCardColor = (type) => {
        return type.toLowerCase() === 'villain' ? 'bg-rose-950' : 'bg-blue-900';
    };

    return (
        <div>
            <div style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
                <Navbar />
                <div className='container mx-auto py-8'>
                    <div className="mt-8">
                        <Link to="/createHero" className="bg-primary hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            + Add a HERO
                        </Link>
                    </div>
                    <div className="mt-8">
                        <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search by name" className="w-full border border-gray-300 bg-gray-200 rounded-md p-2 text-black" />
                    </div>
                    <div className='grid grid-cols-3 gap-4 mt-8'>
                        {filteredHeroes.map((hero) => (
                            <div key={hero.id} className={`border border-red-300 p-4 rounded-lg ${getCardColor(hero.type)}`}>
                                <h2 className='text-3xl text-primary font-semibold mb-4'>{hero.name.charAt(0).toUpperCase() + hero.name.slice(1).toLowerCase()}</h2>
                                <p className='text-white-600 mb-2'><strong>Real Name:</strong> {hero.realName}</p>
                                <p className='text-white-600 mb-2'><strong>Type:</strong> {hero.type}</p>
                                <p className='text-white-600 mb-2'><strong>Powers:</strong> {hero.powers}</p>
                                <p className='text-white-600 mb-2'><strong>Age:</strong> {hero.age}</p>
                                <p className='text-white-600 mb-2'><strong>Race:</strong> {hero.race}</p>
                                <p className='text-white-600 mb-4'><strong>Gender:</strong> {hero.gender}</p>
                                <div className="flex justify-between">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEdit(hero.id)}>Edit</button>
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleDelete(hero.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <ConfirmationDialog
                        isOpen={selectedHeroId !== null}
                        message="Are you sure you want to delete this hero?"
                        onCancel={cancelDelete}
                        onConfirm={confirmDelete}
                    />
                    <SuccessMessage
                        isOpen={showSuccessMessage}
                        message="The character has been deleted successfully."
                    />
                </div>
            </div>
        </div>
    );
}

export default Heroes;
