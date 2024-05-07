import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import backgroundImg from '../img/laboratorio.jpeg';
import AcceptDialog from '../components/AcceptDialog';
import { useNavigate } from 'react-router-dom';

const CreateHero = () => {
  const [name, setName] = useState('');
  const [realName, setRealName] = useState('');
  const [type, setType] = useState('');
  const [powers, setPowers] = useState('');
  const [age, setAge] = useState('');
  const [race, setRace] = useState('');
  const [gender, setGender] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    if (!name || !realName || !type || !powers || !age || !race || !gender) {
      setSuccessMessage('');
      return;
    }

    try {
      await axios.post('http://localhost:3000/superheroes', {
        name,
        realName,
        type,
        powers,
        age: parseInt(age),
        race,
        gender
      });

      setName('');
      setRealName('');
      setType('');
      setPowers('');
      setAge('');
      setRace('');
      setGender('');
      setSuccessMessage('El superhéroe ha sido creado correctamente.');
      setShowSuccessDialog(true);
    } catch (error) {
      console.error('Error creating the superhero:', error);
    }
  };

  const handleDialogClose = () => {
    setShowSuccessDialog(false)
    navigate('/heroes')
  };

  const handleNameChange = (e) => {
    const capitalizedName = e.target.value.toUpperCase();
    setName(capitalizedName);
  }

  return (
    <div className="relative h-screen" style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Navbar />
      <div className="container mx-auto py-8">
        <div className='border-white-200'>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-black border border-red-800 rounded-lg shadow-lg px-8 py-6">
            <h1 className="text-3xl font-bold text-center mb-8 text-white">Crear un Superhéroe</h1>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-white">Nombre:</label>
              <input type="text" id="name" value={name} onChange={handleNameChange} className="w-full bg-gray-900 border border-red-800 rounded-md px-3 py-2 text-white input-uppercase" />
            </div>
            <div className="mb-4">
              <label htmlFor="realName" className="block mb-2 text-white">Nombre Real:</label>
              <input type="text" id="realName" value={realName} onChange={(e) => setRealName(e.target.value)} className="w-full bg-gray-900 border border-red-800 rounded-md px-3 py-2 text-white" />
            </div>
            <div className="mb-4">
              <label htmlFor="type" className="block mb-2 text-white">Tipo:</label>
              <select id="type" value={type} onChange={(e) => setType(e.target.value)} className="w-full bg-gray-900 border border-red-800 rounded-md px-3 py-2 text-white">
              <option value="">Selecciona el tipo</option>   
                <option value="Hero">Héroe</option>
                <option value="Villain">Villano</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="powers" className="block mb-2 text-white">Poderes:</label>
              <textarea id="powers" value={powers} onChange={(e) => setPowers(e.target.value)} className="w-full bg-gray-900 border border-red-800 rounded-md px-3 py-2 text-white"></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="age" className="block mb-2 text-white">Edad:</label>
              <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} className="w-full bg-gray-900 border border-red-800 rounded-md px-3 py-2 text-white" />
            </div>
            <div className="mb-4">
              <label htmlFor="race" className="block mb-2 text-white">Raza:</label>
              <input type="text" id="race" value={race} onChange={(e) => setRace(e.target.value)} className="w-full bg-gray-900 border border-red-800 rounded-md px-3 py-2 text-white" />
            </div>
            <div className="mb-4">
              <label htmlFor="gender" className="block mb-2 text-white">Género:</label>
              <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} className="w-full bg-gray-900 border border-red-800 rounded-md px-3 py-2 text-white">
                <option value="">Selecciona el género</option>
                <option value="Male">Hombre</option>
                <option value="Female">Mujer</option>
                <option value="Unidentified">No identificado</option>
              </select>
            </div>
            <div className='flex justify-center'>
            <button type="submit" className="bg-red-800 text-white py-2 px-4 rounded-lg text-lg hover:bg-red-900 transition duration-300 ">Crear el Superhéroe</button>
            </div>
          </form>
          <AcceptDialog
            isOpen={showSuccessDialog}
            message={successMessage}
            onConfirm={handleDialogClose}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateHero;
