import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

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
      await axios.post('http://localhost:3000/superheroes', {
        nombre,
        nombreReal,
        tipo,
        poderes,
        edad: parseInt(edad), // Convertir a número
        raza,
        genero
      });
      setNombre('');
      setNombreReal('');
      setTipo('');
      setPoderes('');
      setEdad('');
      setRaza('');
      setGenero('');
      setMensajeExito('El superhéroe se ha creado con éxito.');
    } catch (error) {
      console.error('Error al crear el superhéroe:', error);
      setMensajeError('Error al crear el superhéroe. Por favor, inténtelo de nuevo.');
    }
  };
  return (
    <div>
        <Navbar />
        <div className="container mx-auto py-8">
            
        <h1 className="text-3xl font-bold text-center mb-8">Creación de Superhéroe</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="mb-4">
            <label htmlFor="nombre" className="block mb-2">Nombre:</label>
            <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full border rounded-md px-3 py-2" />
            </div>
            <div className="mb-4">
            <label htmlFor="nombreReal" className="block mb-2">Nombre Real:</label>
            <input type="text" id="nombreReal" value={nombreReal} onChange={(e) => setNombreReal(e.target.value)} className="w-full border rounded-md px-3 py-2" />
            </div>
            <div className="mb-4">
            <label htmlFor="tipo" className="block mb-2">Tipo:</label>
            <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} className="w-full border rounded-md px-3 py-2">
                <option value="">Seleccionar tipo</option>
                <option value="Héroe">Héroe</option>
                <option value="Villano">Villano</option>
            </select>
            </div>
            <div className="mb-4">
            <label htmlFor="poderes" className="block mb-2">Poderes:</label>
            <textarea id="poderes" value={poderes} onChange={(e) => setPoderes(e.target.value)} className="w-full border rounded-md px-3 py-2"></textarea>
            </div>
            <div className="mb-4">
            <label htmlFor="edad" className="block mb-2">Edad:</label>
            <input type="number" id="edad" value={edad} onChange={(e) => setEdad(e.target.value)} className="w-full border rounded-md px-3 py-2" />
            </div>
            <div className="mb-4">
            <label htmlFor="raza" className="block mb-2">Raza:</label>
            <input type="text" id="raza" value={raza} onChange={(e) => setRaza(e.target.value)} className="w-full border rounded-md px-3 py-2" />
            </div>
            <div className="mb-4">
            <label htmlFor="tipo" className="block mb-2">Género:</label>
            <select id="tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} className="w-full border rounded-md px-3 py-2">
                <option value="">Seleccionar género</option>
                <option value="Héroe">Hombre</option>
                <option value="Villano">Mujer</option>
                <option value="Villano">No identificado</option>
            </select>
            </div>
            <button type="submit" className="bg-primary text-white py-2 px-4 rounded-lg text-lg hover:bg-secondary-100 transition duration-300">Crear Superhéroe</button>
        </form>
        </div>
    </div>
  );
}

export default CreateHeroe;
