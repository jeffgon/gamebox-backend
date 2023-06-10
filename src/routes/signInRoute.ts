import { Router } from 'express';
import { signIn } from '../controllers/signInController.js';

const signInRoute = Router();

signInRoute.post('/', signIn);

export default signInRoute;