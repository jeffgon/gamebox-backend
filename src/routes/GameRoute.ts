import { Router } from 'express';
import { addGame, getAllGames } from '../controllers/gameController.js';

const gameRouter = Router();

gameRouter
    .post('/add', addGame)
    .get('/', getAllGames)

export default gameRouter;