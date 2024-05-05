import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import heroestop from '../img/carrousel.jpg';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-3xl font-bold mb-8 text-primary">¡Bienvenido a la Web de Superhéroes!</h1>
        <img src={heroestop} alt="Heroes of marvel" className="mx-auto mb-8 w-full h-auto" style={{ maxWidth: '100%', height: 'auto' }} />
        <div className="text-lg mb-4">
          <p>En nuestra web, podrás encontrar información sobre tus superhéroes favoritos, desde sus orígenes hasta sus habilidades únicas y aventuras emocionantes.</p>

          <p> También tienes la opción de añadir un superhéroe si todavía no está incluido en la lista. Luego podrás editar y suprimir todos los superhéroes que quieras.</p>
        </div>
        <div className="flex justify-center">
          <Link to="/heroes" className="bg-primary text-white py-2 px-4 rounded-lg text-lg hover:bg-secondary-100 transition duration-300">Ver Lista de Superhéroes</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
