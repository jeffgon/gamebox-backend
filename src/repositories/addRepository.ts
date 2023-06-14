import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface GameInput {
  title: string;
  genre?: string;
  platform?: string;
  cover_photo?: string;
}

async function addGame(game: GameInput) {
    const result = await prisma.games.create({
        data: game,
    });

    return result !== null;
}
  

const addRepository = {
  addGame,
};

export default addRepository;
