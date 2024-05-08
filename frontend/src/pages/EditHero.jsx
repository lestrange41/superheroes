import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import EditAndSave from '../components/EditAndSave'
import backgroundImg from '../img/laboratorio.jpeg'
import SuccessMessage from '../components/SuccessMessage'

const EditHero = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const [hero, setHero] = useState({
        name: '',
        realName: '',
        type: '',
        powers: '',
        age: 0,
        race: '',
        gender: ''
    })

    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)
    const [showSuccessMessage, setShowSuccessMessage] = useState(false)

    useEffect(() => {
        const fetchHero = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/superheroes/${id}`)
                setHero(response.data)
            } catch (error) {
                console.error('Error fetching hero:', error)
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
            setShowConfirmationDialog(false)
            setShowSuccessMessage(true)
            setTimeout(() => {
                setShowSuccessMessage(false)
                navigate('/heroes')
            }, 3000)
        } catch (error) {
            console.error('Error updating hero:', error)
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
                            <label className='block mb-2 text-white'>Nombre:</label>
                            <input type='text' name='name' value={hero.name.toUpperCase()} onChange={handleChange} className='w-full bg-gray-900 border border-red-800 rounded-md p-2 text-white' />
                        </div>
                        <div className='col-span-2'>
                            <label className='block mb-2'>Nombre Real:</label>
                            <input type='text' name='realName' value={hero.realName} onChange={handleChange} className='w-full bg-gray-900 border border-red-800 rounded-md p-2 text-white' />
                        </div>
                        <div className='col-span-2'>
                            <label className='block mb-2'>Tipo:</label>
                            <select name='type' value={hero.type} onChange={handleChange} className='w-full bg-gray-900 border border-red-800 rounded-md p-2 text-white'>
                                <option value="">Selecciona el tipo</option>   
                                <option value='Héroe'>Héroe</option>
                                <option value='Villano'>Villano</option>
                            </select>
                        </div>
                        <div className='col-span-2'>
                            <label className='block mb-2'>Poderes:</label>
                            <textarea name='powers' value={hero.powers} onChange={handleChange} className='w-full bg-gray-900 border border-red-800 rounded-md p-2 text-white'></textarea>
                        </div>
                        <div className='col-span-1'>
                            <label className='block mb-2'>Edad:</label>
                            <input type='number' name='age' value={hero.age} onChange={handleChange} className='w-full bg-gray-900 border border-red-800 rounded-md p-2 text-white' />
                        </div>
                        <div className='col-span-1'>
                            <label className='block mb-2'>Raza:</label>
                            <input type='text' name='race' value={hero.race} onChange={handleChange} className='w-full bg-gray-900 border border-red-800 rounded-md p-2 text-white' />
                        </div>
                        <div className='col-span-2'>
                            <label className='block mb-2'>Género:</label>
                            <select name='gender' value={hero.gender} onChange={handleChange} className='w-full bg-gray-900 border border-red-800 rounded-md p-2 text-white'>
                                <option value=''>Selecciona el género</option>  
                                <option value='Hombre'>Hombre</option>
                                <option value='Mujer'>Mujer</option>
                                <option value='No identificado'>No identificado</option>
                            </select>
                        </div>
                        <div className='col-span-2 flex justify-center'>
                            <button type='submit' className='bg-red-800 text-white py-2 px-4 rounded-lg text-lg hover:bg-red-900 transition duration-300'>Guardar</button>
                        </div>
                    </div>
                </form>
                <EditAndSave
                    isOpen={showConfirmationDialog}
                    message="Estas seguro que quieres guardar los cambios?"
                    onCancel={handleCancelSubmit}
                    onConfirm={handleConfirmSubmit}
                />
                <SuccessMessage
                    isOpen={showSuccessMessage}
                    message="El superhéroe ha sido editado correctamente."
                />
            </div>
        </div>
    )
}

export default EditHero
