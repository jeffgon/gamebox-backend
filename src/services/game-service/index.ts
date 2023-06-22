import gameRepository from '../../repositories/gameRepository.js';
import { badRequestError, incompleteCredentialsError } from './errors.js';


async function addGame({ title, genre, platform, cover_photo, user_id, review, comment }) {
    if (!title || !genre || !platform || !cover_photo || !review) throw incompleteCredentialsError();

    const result = await gameRepository.addGame({ title, genre, platform, cover_photo, user_id, review, comment })

    if (result) {
        return 'Game registrado com sucesso!';
    } else {
        throw badRequestError();
    }
}

async function getAllGames({ user }) {
    const result = await gameRepository.getAllGames({ user });

    return result;
}

async function getGameById({ id }) {
    const result = await gameRepository.getGameById({ id });
  
    return result;
}
  

const gameService = {
    addGame,
    getAllGames,
    getGameById,
}

export default gameService;