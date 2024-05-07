import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import CreateHero from '../pages/CreateHero'; // Asegúrate de que la ruta del componente sea correcta

// Mockear axios para simular solicitudes HTTP
jest.mock('axios');

describe('CreateHero Component', () => {
  it('should create a superhero when form is submitted with valid data', async () => {
    // Configurar datos de prueba
    const superheroData = {
      name: 'Superman',
      realName: 'Clark Kent',
      type: 'Hero',
      powers: 'Super strength, flight',
      age: '35',
      race: 'Kryptonian',
      gender: 'Male',
    };

    // Mockear la respuesta exitosa de axios
    axios.post.mockResolvedValueOnce();

    // Renderizar el componente
    const { getByLabelText, getByText } = render(<CreateHero />);

    // Simular la entrada de datos en el formulario
    fireEvent.change(getByLabelText('Nombre:'), { target: { value: superheroData.name } });
    fireEvent.change(getByLabelText('Nombre Real:'), { target: { value: superheroData.realName } });
    fireEvent.change(getByLabelText('Tipo:'), { target: { value: superheroData.type } });
    fireEvent.change(getByLabelText('Poderes:'), { target: { value: superheroData.powers } });
    fireEvent.change(getByLabelText('Edad:'), { target: { value: superheroData.age } });
    fireEvent.change(getByLabelText('Raza:'), { target: { value: superheroData.race } });
    fireEvent.change(getByLabelText('Género:'), { target: { value: superheroData.gender } });

    // Simular el envío del formulario
    fireEvent.submit(getByText('Crear el Superhéroe'));

    // Esperar a que se complete la solicitud de axios
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    // Verificar que se haya llamado a axios con los datos correctos
    expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/superheroes', {
      name: superheroData.name,
      realName: superheroData.realName,
      type: superheroData.type,
      powers: superheroData.powers,
      age: parseInt(superheroData.age),
      race: superheroData.race,
      gender: superheroData.gender,
    });
  });

  it('should not create a superhero when form is submitted with incomplete data', async () => {
    // Renderizar el componente
    const { getByText } = render(<CreateHero />);

    // Simular el envío del formulario sin completar todos los campos
    fireEvent.submit(getByText('Crear el Superhéroe'));

    // Verificar que axios no haya sido llamado
    expect(axios.post).not.toHaveBeenCalled();
  });
});
