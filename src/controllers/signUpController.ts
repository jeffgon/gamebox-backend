import { Response, Request } from 'express';
import signUpService from '../services/signup-service/index.js';
import userSchema from '../schemas/userSchema.js';

export async function signUp(req: Request, res: Response) {
    const { email, username, password, confirmPassword } = req.body;

    const { error } = userSchema.validate({ username, email, password, confirmPassword }, { abortEarly: false });

    if (error){
        const errorMessages = error.details.map(err => err.message);
        return res.status(422).send(errorMessages);
    }

    try {
        const result = await signUpService.signUp(
            {   
                email, 
                username, 
                password, 
                confirmPassword,
            })
        return res.status(201).send(result);
    } catch (error) {
        if (error.name === 'incompleteCredentialsError') {
            return res.status(400).send(error.message);
          } else if (error.name === 'differentPasswords') {
                return res.status(404).send(error.message);
          } else if (error.name === 'emailAlreadyRegistered') {
                return res.status(401).send(error.message);
          } else if (error.name === 'usernameAlreadyRegistered') {
                return res.status(404).send(error.message);
          } else if (error.name === 'badRequestError') {
                return res.status(400).send(error.message);
          } else if (error.name === 'passwordLengthError') {
                return res.status(400).send(error.message);
          } else {
                return res.status(500).send('Algo deu errado no servidor.');
          }
    }
};

