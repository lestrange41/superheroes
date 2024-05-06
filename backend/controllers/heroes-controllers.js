import fs from 'fs';

const readHeroes = () => {
    try {
        const data = fs.readFileSync('./db.json')
        return JSON.parse(data)
    } catch (error) {
        console.error(error)
        throw new Error('Error al leer los datos de los superhéroes')
    }
};

const writeHeroes = (data) => {
    try {
        fs.writeFileSync('./db.json', JSON.stringify(data))
    } catch (error) {
        console.error(error)
        throw new Error('Error al escribir los datos de los superhéroes')
    }
};

export const getHeroes = (req, res) => {
    try {
        const data = readHeroes()
        res.json(data.superheroes)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error interno del servidor' })
    }
};

export const getHeroById = (req, res) => {
    try {
        const data = readHeroes()
        const id = parseInt(req.params.id)
        const heroe = data.superheroes.find((heroe) => heroe.id === id)
        if (!heroe) {
            return res.status(404).json({ message: 'Superhéroe no encontrado' })
        }
        res.json(heroe);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error interno del servidor' })
    }
};

export const createHero = (req, res) => {
    try {
        const data = readHeroes()
        const body = req.body
        const maxId = data.superheroes.reduce((max, heroe) => Math.max(max, heroe.id), 0)

        const newHeroe = {
            id: maxId + 1,
            ...body,
        };

        data.superheroes.push(newHeroe)
        writeHeroes(data)
        res.status(201).json(newHeroe)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error interno del servidor' })
    }
};

export const updateHero = (req, res) => {
    try {
        const data = readHeroes()
        const body = req.body
        const id = parseInt(req.params.id)
        const heroeIndex = data.superheroes.findIndex((heroe) => heroe.id === id)
        if (heroeIndex === -1) {
            return res.status(404).json({ message: 'Superhéroe no encontrado' })
        }
        data.superheroes[heroeIndex] = {
            ...data.superheroes[heroeIndex],
            ...body,
        };
        writeHeroes(data)
        res.json({ message: 'El Superhéroe ha sido actualizado correctamente' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error interno del servidor' })
    }
};

export const deleteHero = (req, res) => {
    try {
        const data = readHeroes()
        const id = parseInt(req.params.id);
        const heroeIndex = data.superheroes.findIndex((heroe) => heroe.id === id)
        if (heroeIndex === -1) {
            return res.status(404).json({ message: 'Superhéroe no encontrado' })
        }
        data.superheroes.splice(heroeIndex, 1)
        writeHeroes(data);
        res.status(200).json({ message: 'El héroe ha sido eliminado.' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Error interno del servidor' })
    }
};
