import { Response, Request } from 'express';
import addGameService from '../services/add-service/index.js';
import gameSchema from '../schemas/gameSchema.js';
import jwt, { JwtPayload } from 'jsonwebtoken';
import signInRepository from '../repositories/signInRepository.js';
import { userNotFoundError } from '../services/signin-service/errors.js';

export async function addGame(req: Request, res: Response) {
    const { title, genre, platform, cover_photo } = req.body;
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) return res.status(401).send('Seu token não foi fornecido.');

    const { error } = gameSchema.validate({ title, genre, platform, cover_photo }, { abortEarly: false });
    if (error){
        const errorMessages = error.details.map(err => err.message);
        return res.status(422).send(errorMessages);
    }
    
    try {
    const decodedToken = jwt.verify(token, process.env.SECRET_JWT) as JwtPayload;
    const userId = decodedToken.id;

    const getUser = await signInRepository.getUserById(userId);
    if (!getUser) throw userNotFoundError();

    const result = await addGameService.addGame({ title, genre, platform, cover_photo, user_id: userId });

    return res.send(result);
    } catch (error) {
        if (error.name === 'JsonWebTokenError') return res.status(401).send('Token inválido.');
        if (error.name === 'userNotFoundError') return res.status(404).send(error.message);
        if (error.name === 'incompleteCredentialsError') return res.status(400).send(error.message);
        if (error.name === 'badRequestError') return res.status(400).send(error.message);
    }
}