import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
    <nav className="bg-secondary-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-lg text-4x1">Superhéroes</div>
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-primary hover:text-white">Inicio</Link></li>
          <li><Link to="/heroes" className="text-primary hover:text-white">Héroes</Link></li>
          <li><Link to="/crearheroe" className="text-primary hover:text-white">Crear Héroe</Link></li>
         
        </ul>
      </div>
    </nav>
    <div className="bg-red-500 h-1"></div>
  </div>
);
}
 

export default Navbar;
