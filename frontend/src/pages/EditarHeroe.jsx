import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import EditAndSave from '../components/EditAndSave'
import backgroundImg from '../img/laboratorio.jpeg'
import SuccessMessage from '../components/SuccessMessage' 

const EditarHeroe = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [hero, setHero] = useState({
        nombre: '',
        nombreReal: '',
        tipo: '',
        poderes: '',
        edad: 0,
        raza: '',
        genero: ''
    })

    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false) 

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/superheroes/${id}`)
                setHero(response.data)
            } catch (error) {
                console.error('Error al obtener el héroe:', error)
            }
        }

        fetchHero()
    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target
        setHero({
            ...hero,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setShowConfirmationDialog(true)
    }

    const handleConfirmSubmit = async () => {
        try {
            await axios.put(`http://localhost:3000/superheroes/${id}`, hero)
            console.log('Héroe actualizado exitosamente')
            setShowConfirmationDialog(false)
            setShowSuccessMessage(true) 
            setTimeout(() => {
                setShowSuccessMessage(false)
                navigate('/heroes')
            }, 3000)
        } catch (error) {
            console.error('Error al actualizar el héroe:', error)
        }
    }

    const handleCancelSubmit = () => {
        setShowConfirmationDialog(false)
    }

    return (
        <div style={{ backgroundImage: `url(${backgroundImg})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
            <Navbar />
            <div className='container mx-auto py-8'>

                <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-black border border-red-800 rounded-lg shadow-lg px-8 py-6">
                    <h1 className="text-3xl font-bold text-center mb-8 text-white">Editar Héroe</h1>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='col-span-2'>
                            <label className='block mb-2 text-white'>Nombre</label>
                            <input type='text' name='nombre' value={hero.nombre.toUpperCase()} onChange={handleChange} className='w-full bg-gray-900 border border-red-800 rounded-md p-2 text-white' />
                        </div>
                        <div className='col-span-2'>
                            <label className='block mb-2'>Nombre Real</label>
                            <input type='text' name='nombreReal' value={hero.nombreReal} onChange={handleChange} className='w-full bg-gray-900 border border-red-800 rounded-md p-2 text-white' />
                        </div>
                        <div className='col-span-2'>
                            <label className='block mb-2'>Tipo:</label>
                            <select name='genero' value={hero.genero} onChange={handleChange} className='w-full bg-gray-900 border border-red-800 rounded-md p-2 text-white'>
                                <option value='Héroe'>Héroe</option>
                                <option value='Villano'>Villano</option>
                            </select>
                        </div>
                        <div className='col-span-2'>
                            <label className='block mb-2'>Poderes</label>
                            <textarea name='poderes' value={hero.poderes} onChange={handleChange} className='w-full bg-gray-900 border border-red-800 rounded-md p-2 text-white'></textarea>
                        </div>
                        <div className='col-span-1'>
                            <label className='block mb-2'>Edad</label>
                            <input type='number' name='edad' value={hero.edad} onChange={handleChange} className='w-full bg-gray-900 border border-red-800 rounded-md p-2 text-white' />
                        </div>
                        <div className='col-span-1'>
                            <label className='block mb-2'>Raza</label>
                            <input type='text' name='raza' value={hero.raza} onChange={handleChange} className='w-full bg-gray-900 border border-red-800 rounded-md p-2 text-white' />
                        </div>
                        <div className='col-span-2'>
                            <label className='block mb-2'>Género</label>
                            <select name='genero' value={hero.genero} onChange={handleChange} className='w-full bg-gray-900 border border-red-800 rounded-md p-2 text-white'>
                                <option value='Masculino'>Masculino</option>
                                <option value='Femenino'>Femenino</option>
                            </select>
                        </div>
                        <div className='col-span-2'>
                            <button type='submit' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Guardar</button>
                        </div>
                    </div>
                </form>
                <EditAndSave
                    isOpen={showConfirmationDialog}
                    message="¿Estás seguro de que deseas guardar los cambios?"
                    onCancel={handleCancelSubmit}
                    onConfirm={handleConfirmSubmit}
                />
                <SuccessMessage
                    isOpen={showSuccessMessage}
                    message="El superhéroe se ha editado con éxito."
                />
            </div>
        </div>
    )
}

export default EditarHeroe
