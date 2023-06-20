import { ApplicationError } from '../../protocols';

export function incompleteCredentialsError(): ApplicationError {
    return {
        name: 'incompleteCredentialsError',
        message: 'Preencha todos os campos corretamente!',
      };
}

export function badRequestError(): ApplicationError {
  return {
      name: 'badRequestError',
      message: 'Algo deu errado na requisição do servidor!',
    };
}

export function userNotFoundError(): ApplicationError {
  return {
    name: 'userNotFoundError',
    message: 'Preencha com credenciais válidas!'
  }
}