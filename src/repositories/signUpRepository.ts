import { prisma } from '../config/database.js';

async function signUp({email, username, password, confirmPassword}) {
    return await prisma.users.create({
        data: {
            username,
            password,
            email,
        },
    }); 
}

async function verifyEmail({email}) {
    const user =  await prisma.users.findFirst({
        where: {
            email: email,
        },
    });

    return user !== null;
}

async function verifyUsername ({username}) {
    const user =  await prisma.users.findFirst({
        where: {
            username: username,
        },
    });

    return user !== null;
}

const signUpRepository = {
    signUp,
    verifyEmail,
    verifyUsername,
};

export default signUpRepository;