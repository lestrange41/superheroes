import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import heroesRouter from './routes/heroes.js'; // Ensure the correct file extension

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/superheroes', heroesRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
