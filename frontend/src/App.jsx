import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";

// PAGES
import Home from './pages/Home';
import Error404 from './pages/Error404';
import Heroes from './pages/Heroes';
import CreateHeroe from "./pages/CreateHeroe";
import EditarHeroe from "./pages/EditarHeroe";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
        {loading ? (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-secundary bg-opacity-50 z-50">
            <PacmanLoader color={'#d63636'} loading={loading} size={50} />
          </div>
        ) : (
          <BrowserRouter>
    
          <Routes>
            <Route path='/heroes' element={<Heroes />} />
            <Route path='/crearheroe' element={<CreateHeroe />} />
            <Route path='/editarheroe/:id' element={<EditarHeroe />} />
            <Route path='/' element={<Home />} />
            <Route path='*' element={<Error404 />} />
          </Routes>
       
      </BrowserRouter>
        )}
      
    </>
  );
}

export default App;
