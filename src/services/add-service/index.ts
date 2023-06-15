import addRepository from '../../repositories/addRepository.js';
import { badRequestError, incompleteCredentialsError } from './errors.js';

async function addGame({ title, genre, platform, cover_photo, user_id }) {
    if (!title || !genre || !platform || !cover_photo) throw incompleteCredentialsError();

    const result = await addRepository.addGame({ title, genre, platform, cover_photo, user_id })

    if (result) {
        return 'Game registrado com sucesso!';
    } else {
        throw badRequestError();
    }
}

const addGameService = {
    addGame,
}

export default addGameService;