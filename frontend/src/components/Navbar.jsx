import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'

const Navbar = () => {
  const [loading, setLoading] = useState(false)

  const handleLoadingChange = (value) => {
    setLoading(value)
  }

  return (
    <div>
      <Loader loading={loading} />
      <nav className="bg-secondary-900 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to='/'>
            <div className="text-4xl font-bold">
              <span className="text-white hover:text-primary">SUPER</span>
              <span className="text-primary hover:text-white">HÉROES</span>
            </div>
          </Link>
          <ul className="flex space-x-8">
            <li><Link to="/" className="text-primary hover:text-white">INICIO</Link></li>
            <li>|</li>
            <li><Link to="/heroes" className="text-primary hover:text-white" onClick={() => handleLoadingChange(true)}>HÉROES</Link></li>
            <li>|</li>
            <li><Link to="/createhero" className="text-primary hover:text-white" onClick={() => handleLoadingChange(true)}>CREAR HÉROE</Link></li>
          </ul>
        </div>
      </nav>
      <div className="bg-red-500 h-1"></div>
    </div>
  );
}

export default Navbar;
