import fs from 'fs'

const readHeroes = () => {
    try {
        const data = fs.readFileSync('./db.json')
        return JSON.parse(data)
    } catch (error) {
        console.error(error)
        throw new Error('Error reading superhero data')
    }
}

const writeHeroes = (data) => {
    try {
        fs.writeFileSync('./db.json', JSON.stringify(data))
    } catch (error) {
        console.error(error)
        throw new Error('Error writing superhero data')
    }
}

export const getHeroes = (req, res) => {
    try {
        const data = readHeroes()
        res.status(200).json(data.superheroes)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const getHeroById = (req, res) => {
    try {
        const data = readHeroes()
        const id = parseInt(req.params.id)
        const hero = data.superheroes.find((hero) => hero.id === id)
        if (!hero) {
            return res.status(404).json({ message: 'Superhero not found' })
        }
        res.status(200).json(hero);
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const createHero = (req, res) => {
    try {
        const data = readHeroes()
        const body = req.body
        const maxId = data.superheroes.reduce((max, hero) => Math.max(max, hero.id), 0)

        const newHero = {
            id: maxId + 1,
            ...body,
        };

        data.superheroes.push(newHero)
        writeHeroes(data)
        res.status(201).json(newHero)
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const updateHero = (req, res) => {
    try {
        const data = readHeroes()
        const body = req.body
        const id = parseInt(req.params.id)
        const heroIndex = data.superheroes.findIndex((hero) => hero.id === id)
        if (heroIndex === -1) {
            return res.status(404).json({ message: 'Superhero not found' })
        }
        data.superheroes[heroIndex] = {
            ...data.superheroes[heroIndex],
            ...body,
        };
        writeHeroes(data)
        res.status(200).json({ message: 'The superhero has been updated successfully' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export const deleteHero = (req, res) => {
    try {
        const data = readHeroes()
        const id = parseInt(req.params.id);
        const heroIndex = data.superheroes.findIndex((hero) => hero.id === id)
        if (heroIndex === -1) {
            return res.status(404).json({ message: 'Superhero not found' })
        }
        data.superheroes.splice(heroIndex, 1)
        writeHeroes(data);
        res.status(200).json({ message: 'The hero has been deleted' })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}
