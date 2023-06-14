import { Response, Request } from 'express';
import addGameService from '../services/add-service/index.js';
import gameSchema from '../schemas/gameSchema.js';

export async function addGame(req: Request, res: Response) {
    const { title, genre, platform, cover_photo } = req.body;

    const { error } = gameSchema.validate({ title, genre, platform, cover_photo }, { abortEarly: false });

    if (error){
        const errorMessages = error.details.map(err => err.message);
        return res.status(422).send(errorMessages);
    }

    try {
        const result = await addGameService.addGame({ title, genre, platform, cover_photo });
        return res.send(result);
    } catch (error) {
        if (error.name === 'incompleteCredentialsError') return res.status(400).send(error.message)
    }
}