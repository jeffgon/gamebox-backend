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

async function getAllGames({ user }) {
  const result = await prisma.games.findMany({
      where: {
          user_id: user,
      },
      select: {
          title: true,
          genre: true,
          platform: true,
          cover_photo: true,
          review: true,
          comment: true,
      },
  });

  return result.length > 0 ? result : null;
};

async function getGameById({ id }) {
  const result = await prisma.games.findUnique({
    where: {
      game_id: Number(id),
    },
    include: {
      users: true,
    },
  });

  return result;
}

const gameRepository = {
  addGame,
  getAllGames,
  getGameById,
};

export default gameRepository;
