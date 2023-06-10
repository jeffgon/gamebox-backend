import signUpRepository from "../../repositories/signUpRepository.js";
import { differentPasswords, emailAlreadyRegistered, incompleteCredentialsError, usernameAlreadyRegistered } from "./errors.js";
import bcrypt from 'bcrypt';

async function signUp({email, username, password, confirmPassword}) {
    if (!email || !username || !password || !confirmPassword) throw incompleteCredentialsError();
    
    if (password !== confirmPassword) throw differentPasswords();

    const hashedPassword = await bcrypt.hash(password, 10);

    const verifyUserEmail = await signUpRepository.verifyEmail({email})
    if (verifyUserEmail) throw emailAlreadyRegistered();

    const verifyUsername = await signUpRepository.verifyUsername({username})
    if (verifyUsername) throw usernameAlreadyRegistered();

    signUpRepository.signUp({email, username, password: hashedPassword, confirmPassword})
    
    return 'Registro feito com sucesso!'
};

const signUpService = {
    signUp,
};

export default signUpService;