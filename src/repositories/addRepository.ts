import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface GameInput {
  title: string;
  genre?: string;
  platform?: string;
  cover_photo?: string;
  user_id?: number;
  review?: number;
  comment?: string | null;
}


async function addGame(game: GameInput) {
  const { title, genre, platform, cover_photo, user_id, review, comment } = game;
  const reviewValue = Number(review);

  const result = await prisma.games.create({
    data: {
      title,
      genre,
      platform,
      cover_photo,
      user_id,
      review: reviewValue,
      comment: comment || undefined,

    } as Prisma.gamesCreateInput,
  });

  return result !== null;
}




const addRepository = {
  addGame,
};

export default addRepository;
