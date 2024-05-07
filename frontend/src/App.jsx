import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PacmanLoader from "react-spinners/PacmanLoader";

// PAGES
import Home from './pages/Home';
import Error404 from './pages/Error404';
import Heroes from './pages/Heroes';
import CreateHero from "./pages/CreateHero";
import EditHero from "./pages/EditHero";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
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
            <Route path='/createhero' element={<CreateHero />} />
            <Route path='/edithero/:id' element={<EditHero />} />
            <Route path='/' element={<Home />} />
            <Route path='*' element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
