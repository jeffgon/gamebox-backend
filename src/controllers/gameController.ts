import { Response, Request } from 'express';
import gameService from '../services/game-service/index.js';
import gameSchema from '../schemas/gameSchema.js';
import jwt, { JwtPayload } from 'jsonwebtoken';
import signInRepository from '../repositories/signInRepository.js';
import { userNotFoundError } from '../services/signin-service/errors.js';

export async function addGame(req: Request, res: Response) {
    const { title, genre, platform, cover_photo, review, comment } = req.body;
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) return res.status(401).send('Seu token não foi fornecido.');

    const { error } = gameSchema.validate({ title, genre, platform, cover_photo, review, comment }, { abortEarly: false });
    
    if (error){
        const errorMessages = error.details.map(err => err.message);
        return res.status(422).send(errorMessages);
    }
    
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_JWT) as JwtPayload;
        const userId = decodedToken.id;

        const getUser = await signInRepository.getUserById(userId);
        if (!getUser) throw userNotFoundError();

        const result = await gameService.addGame(
            { 
                title, 
                genre, 
                platform, 
                cover_photo, 
                user_id: userId, 
                review,
                comment
            });

        return res.send(result);
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).send('Token inválido.');
          } else if (error.name === 'userNotFoundError') {
                return res.status(404).send(error.message);
          } else if (error.name === 'incompleteCredentialsError') {
                return res.status(400).send(error.message);
          } else if (error.name === 'badRequestError') {
                return res.status(400).send(error.message);
          } else {
                return res.status(500).send('Algo deu errado no servidor.');
          }
    }
}

export async function getAllGames(req: Request, res: Response) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) return res.status(401).send('Seu token não foi fornecido.');

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_JWT) as JwtPayload;
        const userId = decodedToken.id;

        const getUser = await signInRepository.getUserById(userId);
        if (!getUser) throw userNotFoundError();

        const user: number = getUser.user_id;

        const games = await gameService.getAllGames({ user });

        if (!games) return res.status(404).send('Nenhum jogo encontrado.');

        return res.send(games);
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).send('Token inválido.');
        } else if (error.name === 'userNotFoundError') {
            return res.status(404).send(error.message);
        } else if (error.name === 'badRequestError') {
            return res.status(500).send(error.message)
        } else {
            return res.status(500).send('Algo deu errado no servidor.');
        }
    }
}

export async function getGameById(req: Request, res: Response) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const { id } = req.params;
  
    if (!token) return res.status(401).send('Seu token não foi fornecido.');
  
    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_JWT) as JwtPayload;
      const userId = decodedToken.id;
  
      const getUser = await signInRepository.getUserById(userId);
      if (!getUser) throw userNotFoundError();
  
      const game = await gameService.getGameById({ id });
  
      if (!game) return res.status(404).send('Jogo não encontrado.');
  
      return res.send(game);
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).send('Token inválido.');
      } else if (error.name === 'userNotFoundError') {
        return res.status(404).send(error.message);
      } else if (error.name === 'badRequestError') {
        return res.status(500).send(error.message);
      } else {
        return res.status(500).send('Algo deu errado no servidor.');
      }
    }
}