import { Response, Request } from 'express';
import signUpService from '../services/signup-service/index.js';

export async function signUp(req: Request, res: Response) {
    const { email, username, password, confirmPassword } = req.body;

    try {
        const result = await signUpService.signUp(
            { email, 
                username, 
                password, 
                confirmPassword,
            })
        return res.status(200).send(result);
    } catch (error) {
        if (error.name === 'incompleteCredentialsError') return res.status(400).send(error.message)
        if (error.name === 'differentPasswords') return res.status(400).send(error.message);
        if (error.name === 'emailAlreadyRegistered') return res.status(400).send(error.message);
        if (error.name === 'usernameAlreadyRegistered') return res.status(400).send(error.message);
        
    }
};

