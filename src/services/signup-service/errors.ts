import { ApplicationError } from '../../protocols';

export function incompleteCredentialsError(): ApplicationError {
    return {
        name: 'incompleteCredentialsError',
        message: 'Preencha todos os campos',
      };
}

export function differentPasswords(): ApplicationError {
  return {
      name: 'differentPasswords',
      message: 'A senha precisa ser a mesma',
    };
}

export function emailAlreadyRegistered(): ApplicationError {
  return {
      name: 'emailAlreadyRegistered',
      message: 'E-mail já registrado',
    };
}

export function usernameAlreadyRegistered(): ApplicationError {
  return {
      name: 'usernameAlreadyRegistered',
      message: 'Username já registrado',
    };
}