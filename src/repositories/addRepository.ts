import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
interface GameInput {
  title: string;
  genre?: string;
  platform?: string;
  cover_photo?: string;
  user_id?: number;
  review?: number;
}

async function addGame(game: GameInput) {
  const { review, ...gameData } = game; 

  const result = await prisma.games.create({
    data: gameData, 
  });

  return result !== null;
}
  

const addRepository = {
  addGame,
};

export default addRepository;
