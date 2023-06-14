import { Router } from 'express';
import { addGame } from '../controllers/addController.js';

const addRouter = Router();

addRouter.post('/game', addGame)

export default addRouter;