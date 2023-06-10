import { Router } from 'express';
import { signUp } from '../controllers/signUpController.js';

const signUpRoute = Router();

signUpRoute.post('/', signUp);

export default signUpRoute;