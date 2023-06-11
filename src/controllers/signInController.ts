import { Request, Response } from 'express';
import signInService from '../services/signin-service/index.js';

export async function signIn(req: Request, res: Response) {
    const { username, password } = req.body;
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).send('Login não autorizado');
    const parts = authorization.split(" ");
    if (parts.length !== 2) return res.status(401).send('Login não autorizado');

    try {
        const result = await signInService.signIn({ username, password });
        return res.send(result)
    } catch (error) {
        if (error.name === 'incompleteCredentialsError') return res.status(400).send(error.message);
        if (error.name === 'notFoundError') return res.status(404).send(error.message); 
        if (error.name === 'invalidCredentials') return res.status(401).send(error.message);
        if (error.name === 'userNotFoundError') return res.status(404).send(error.message);
    }
}