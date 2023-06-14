import { ApplicationError } from '../../protocols';

export function incompleteCredentialsError(): ApplicationError {
    return {
        name: 'incompleteCredentialsError',
        message: 'Preencha todos os campos!',
      };
}

export function invalidCredentials(): ApplicationError {
  return {
      name: 'invalidCredentials',
      message: 'Preencha com credenciais válidas!',
    };
}

export function userNotFoundError(): ApplicationError {
  return {
    name: 'userNotFoundError',
    message: 'Preencha com credenciais válidas!'
  }
}

export function notFoundError(): ApplicationError {
  return {
    name: 'notFoundError',
    message: 'Preencha com credenciais válidas!',
  }
}