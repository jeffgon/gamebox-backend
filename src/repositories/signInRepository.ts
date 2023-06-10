import { prisma } from '../config/database.js';

async function verify({ username }) {
    return await prisma.users.findFirst({
        where: {
            username: username,
        },
        select: {
            user_id: true,
            username: true,
            password: true,
        },
    });
}

async function getUserById(userId) {
    return await prisma.users.findUnique({
        where: { user_id: userId },
    })
}

const signInRepository = {
    verify,
    getUserById,
}

export default signInRepository;