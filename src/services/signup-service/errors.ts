import { ApplicationError } from '../../protocols';

export function incompleteCredentialsError(): ApplicationError {
    return {
        name: 'incompleteCredentialsError',
        message: 'Preencha todos os campos!',
      };
}

export function differentPasswords(): ApplicationError {
  return {
      name: 'differentPasswords',
      message: 'A senha precisa ser a mesma!',
    };
}

export function emailAlreadyRegistered(): ApplicationError {
  return {
      name: 'emailAlreadyRegistered',
      message: 'E-mail já registrado!',
    };
}

export function usernameAlreadyRegistered(): ApplicationError {
  return {
      name: 'usernameAlreadyRegistered',
      message: 'Username já registrado!',
    };
}

export function badRequestError(): ApplicationError {
  return {
      name: 'badRequestError',
      message: 'Algo deu errado na requisição do servidor!',
    };
}

export function passwordLengthError(): ApplicationError {
  return {
      name: 'passwordLengthError',
      message: 'A senha deve ter no mínimo 8 caracteres!',
    };
}
