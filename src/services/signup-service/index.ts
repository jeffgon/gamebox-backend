import signUpRepository from "../../repositories/signUpRepository.js";
import { 
    badRequestError, 
    differentPasswords, 
    emailAlreadyRegistered, 
    incompleteCredentialsError, 
    passwordLengthError, 
    usernameAlreadyRegistered 
} from './errors.js';
import bcrypt from 'bcrypt';

async function signUp({email, username, password, confirmPassword}) {
    if (!username || !email || !password || !confirmPassword) throw incompleteCredentialsError();
    
    if (password !== confirmPassword) throw differentPasswords();

    if (password.length < 8) throw passwordLengthError();

    const hashedPassword = await bcrypt.hash(password, 10);

    const verifyUserEmail = await signUpRepository.verifyEmail({ email })
    if (verifyUserEmail) throw emailAlreadyRegistered();

    const verifyUsername = await signUpRepository.verifyUsername({ username })
    if (verifyUsername) throw usernameAlreadyRegistered();

    const result = await signUpRepository.signUp({email, username, password: hashedPassword, confirmPassword})

    if (result) {
        return 'Usuário registrado com sucesso';
    } else {
        throw badRequestError();
    }
};

const signUpService = {
    signUp,
};

export default signUpService;