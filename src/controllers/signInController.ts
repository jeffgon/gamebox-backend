import { Request, Response } from 'express';
import signInService from '../services/signin-service/index.js';

export async function signIn(req: Request, res: Response) {
    const { username, password } = req.body;

    try {
        const result = await signInService.signIn({ username, password });
        return res.send(result)
    } catch (error) {
        if (error.name === 'incompleteCredentialsError') {
            return res.status(400).send(error.message);
          } else if (error.name === 'notFoundError') {
                return res.status(404).send(error.message);
          } else if (error.name === 'invalidCredentials') {
                return res.status(401).send(error.message);
          } else if (error.name === 'userNotFoundError') {
                return res.status(404).send(error.message);
          } else {
                  return res.status(500).send('Algo deu errado no servidor.');
          }
    }
}