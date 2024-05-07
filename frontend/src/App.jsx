import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"

// PAGES
import Home from './pages/Home'
import Error404 from './pages/Error404'
import Heroes from './pages/Heroes'
import CreateHero from "./pages/CreateHero"
import EditHero from "./pages/EditHero"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/heroes' element={<Heroes />} />
        <Route path='/createhero' element={<CreateHero />} />
        <Route path='/edithero/:id' element={<EditHero />} />
        <Route path='/' element={<Home />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
