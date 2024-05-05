import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import backgroundimg from '../img/laboratorio.jpeg';

const CreateHeroe = () => {
  const [nombre, setNombre] = useState('');
  const [nombreReal, setNombreReal] = useState('');
  const [tipo, setTipo] = useState('');
  const [poderes, setPoderes] = useState('');
  const [edad, setEdad] = useState('');
  const [raza, setRaza] = useState('');
  const [genero, setGenero] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [mensajeError, setMensajeError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !nombreReal || !tipo || !poderes || !edad || !raza || !genero) {
      setMensajeError('Por favor, complete todos los campos para crear el superhéroe.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:3000/superheroes', {
        nombre,
        nombreReal,
        tipo,
        poderes,
        edad: parseInt(edad),
        raza,
        genero
      });
      if (response.status === 201) {
        setNombre('');
        setNombreReal('');
        setTipo('');
        setPoderes('');
        setEdad('');
        setRaza('');
        setGenero('');
        setMensajeExito('El superhéroe se ha creado con éxito.');
        setMensajeError('');
      } else {
        throw new Error('Error al crear el superhéroe. Por favor, inténtelo de nuevo.');
      }
    } catch (error) {
      console.error('Error al crear el superhéroe:', error);
      setMensajeError('Error al crear el superhéroe. Por favor, inténtelo de nuevo.');
      setMensajeExito('');
    }
  };

  return (
    <div className="relative h-screen" style={{ backgroundImage: `url(${backgroundimg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <Navbar />
      <div className="container mx-auto py-8">

        <div className='border-white-200'>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-black border border-red-800 rounded-lg shadow-lg px-8 py-6">
            <h1 className="text-3xl font-bold text-center mb-8 text-white">Creación de Superhéroe</h1>
            <div className="mb-4">
              <label htmlFor="nombre" className="block mb-2 text-white">Nombre:</label>
              <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full bg-gray-900 border border-red-800 rounded-md px-3 py-2 text-white" />
            </div>
            <div className="mb-4">
              <label htmlFor="nombreReal" className="block mb-2 text-white">Nombre Real:</label>
              <input type="text" id="nombreReal" value={nombreReal} onChange={(e) => setNombreReal(e.target.value)} className="w-full bg-gray-900 border border-red-800 rounded-md px-3 py-2 text-white" />
            </div>
            <div className="mb-4">
              <label htmlFor="tipo" className="block mb-2 text-white">Tipo:</label>
              <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} className="w-full bg-gray-900 border border-red-800 rounded-md px-3 py-2 text-white">
                <option value="">Seleccionar tipo</option>
                <option value="Héroe">Héroe</option>
                <option value="Villano">Villano</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="poderes" className="block mb-2 text-white">Poderes:</label>
              <textarea id="poderes" value={poderes} onChange={(e) => setPoderes(e.target.value)} className="w-full bg-gray-900 border border-red-800 rounded-md px-3 py-2 text-white"></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="edad" className="block mb-2 text-white">Edad:</label>
              <input type="number" id="edad" value={edad} onChange={(e) => setEdad(e.target.value)} className="w-full bg-gray-900 border border-red-800 rounded-md px-3 py-2 text-white" />
            </div>
            <div className="mb-4">
              <label htmlFor="raza" className="block mb-2 text-white">Raza:</label>
              <input type="text" id="raza" value={raza} onChange={(e) => setRaza(e.target.value)} className="w-full bg-gray-900 border border-red-800 rounded-md px-3 py-2 text-white" />
            </div>
            <div className="mb-4">
              <label htmlFor="tipo" className="block mb-2 text-white">Género:</label>
              <select id="tipo" value={genero} onChange={(e) => setGenero(e.target.value)} className="w-full bg-gray-900 border border-red-800 rounded-md px-3 py-2 text-white">
                <option value="">Seleccionar género</option>
                <option value="Hombre">Hombre</option>
                <option value="Mujer">Mujer</option>
                <option value="No identificado">No identificado</option>
              </select>
            </div>
            <button type="submit" className="bg-red-800 text-white py-2 px-4 rounded-lg text-lg hover:bg-red-900 transition duration-300">Crear Superhéroe</button>
            {mensajeError && <p className="text-red-500 mt-4">{mensajeError}</p>}
            {mensajeExito && <p className="text-green-500 mt-4">{mensajeExito}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateHeroe;
