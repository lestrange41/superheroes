import express from 'express'
import fs from 'fs'

const app = express()

const readHeroes = () => {
    try {
        const data = fs.readFileSync('./db.json')
        return JSON.parse(data)
    } catch (error) {
        console.log(error);
    }
}

const writeHeroes = (data) => {
    try {
        fs.writeFileSync('./db.json', JSON.stringify(data))
    } catch (error) {
        console.log(error);
    }
}

app.get('/', (req, res) => {
    res.send('El servidor está conectado')
})

app.get('/superheroes', (req, res) => {
    const data = readHeroes()
    res.json(data.superheroes)
})

app.listen(3000, () => {
    console.log('El servidor está funcionando en el puerto 3000')
})