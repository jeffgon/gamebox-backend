import { Router } from 'express';
import { addGame, getAllGames, getGameById } from '../controllers/gameController.js';

const gameRouter = Router();

gameRouter
    .post('/add', addGame)
    .get('/', getAllGames)
    .get('/:id', getGameById);

export default gameRouter;