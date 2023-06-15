import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
interface GameInput {
  title: string;
  genre?: string;
  platform?: string;
  cover_photo?: string;
  user_id?: number;
}

async function addGame(game: GameInput) {
  const result = await prisma.games.create({
    data: {
      title: game.title,
      genre: game.genre,
      platform: game.platform,
      cover_photo: game.cover_photo,
      user_id: game.user_id,
    }
  })

  return result !== null
}
  

const addRepository = {
  addGame,
};

export default addRepository;
