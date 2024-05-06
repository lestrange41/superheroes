import express from 'express';
import { getHeroes, getHeroById, createHero, updateHero, deleteHero } from '../controllers/heroes-controllers.js';

const router = express.Router();

router.get('/', getHeroes);
router.get('/:id', getHeroById);
router.post('/', createHero);
router.put('/:id', updateHero);
router.delete('/:id', deleteHero);

export default router;
