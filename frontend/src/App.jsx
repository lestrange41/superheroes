import { BrowserRouter, Routes, Route } from "react-router-dom"

//PAGES
import Home from './pages/Home'
import Error404 from './pages/Error404'
import Heroes from './pages/Heroes'
import CreateHeroe from "./pages/CreateHeroe"
import EditarHeroe from "./pages/EditarHeroe"

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/heroes' element={<Heroes />} />
          <Route path='/crearheroe' element={<CreateHeroe />} />
          <Route path='/editarheroe/:id' element={<EditarHeroe />} />
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Error404 />} />




        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
