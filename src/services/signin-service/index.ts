import signInRepository from '../../repositories/signInRepository.js';
import { incompleteCredentialsError, invalidCredentials, notFoundError, userNotFoundError } from './errors.js';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload, verify } from 'jsonwebtoken';

async function signIn({username, password}) {
    if (!username || !password) throw incompleteCredentialsError();

    const user = await signInRepository.verify({ username });
    if (!user) throw notFoundError();
  
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw invalidCredentials();
  
    const token = jwt.sign({ id: user.user_id }, process.env.SECRET_JWT);

    const decoded = verify(token, process.env.SECRET_JWT) as JwtPayload;

    const userId = decoded.id;

    const getUser = await signInRepository.getUserById(userId);

    if (!getUser) throw userNotFoundError();

    return token;
}

const signInService = {
    signIn,
};

export default signInService;