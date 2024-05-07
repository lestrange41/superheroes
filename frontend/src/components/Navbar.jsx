import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
    <nav className="bg-secondary-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
      <div className="text-4xl font-bold">
      <span className="text-white-500">SUPER</span>
      <span className="text-primary">HÉROES</span>
</div>
        <ul className="flex space-x-8">
          <li><Link to="/" className="text-primary hover:text-white">INICIO</Link></li>
          <li>|</li>
          <li><Link to="/heroes" className="text-primary hover:text-white">HÉROES</Link></li>
          <li>|</li>
          <li><Link to="/createhero" className="text-primary hover:text-white">CREAR HÉROE</Link></li>
         
        </ul>
      </div>
    </nav>
    <div className="bg-red-500 h-1"></div>
  </div>
);
}
 

export default Navbar;
