import express from 'express'
import fs from 'fs'
import bodyParser from "body-parser"

const app = express()
app.use(bodyParser.json())


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
//get tots els herois
app.get('/superheroes', (req, res) => {
    const data = readHeroes()
    res.json(data.superheroes)
})
//get x id
app.get('/superheroes/:id', (req, res) => {
    const data = readHeroes()
    const id = parseInt(req.params.id)
    const heroe = data.superheroes.find((heroe) => heroe.id === id)
    res.json(heroe)
})

//crear superheroi
app.post('/superheroes', (req,res) => {
    const data = readHeroes()
    const body = req.body
    const newHeroe = {
        id: data.superheroes.length + 1,
        ...body,
    }
    data.superheroes.push(newHeroe)
    writeHeroes(data)
    res.json(newHeroe)
})

app.put('/superheroes/:id', (req, res) => {
    const data = readHeroes()
    const body = req.body
    const id = parseInt(req.params.id)
    const heroeIndex = data.superheroes.findIndex((heroe) => heroe.id === id)
    data.superheroes[heroeIndex] = {
        ...data.superheroes[heroeIndex],
        ...body,
    }
    writeHeroes(data)
    res.json({message: 'El Superheroe ha sido actualizado correctamente'})
})

app.delete('/superheroes/:id', (req, res) => {
    const data = readHeroes()
    const id = parseInt(req.params.id)
    const heroeIndex = data.superheroes.findIndex((heroe) => heroe.id === id)
    data.superheroes.splice(heroeIndex,1)
    writeHeroes(data)
    res.json({message: 'El heroe ha sido eliminado.'})
})


app.listen(3000, () => {
    console.log('El servidor está funcionando en el puerto 3000')
})