import { CPF, CNPJ } from 'cpf_cnpj';

import { onlyNumbers } from './';

export const validateEmail = (email: string): boolean => {
  const regex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi;

  return regex.test(email);
};

export const validateDocument = (document: string): boolean => {
  document = onlyNumbers(document);

  if (document.length === 11) {
    return CPF.isValid(document);
  }

  return CNPJ.isValid(document);
};

/**
 * A senha deve conter:
 * - Ao menos uma letra minúscula.
 * - Ao menos uma letra maiúscula
 * - Ao menos um caractere especial
 * - Ao menos um número
 */
export const validatePassword = (password: string): boolean => {
  const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

  return regex.test(password);
};

export const validateCellphone = (cellphone: string): boolean => {
  const regex = /^([14689][0-9]|2[12478]|3([1-5]|[7-8])|5([13-5])|7[193-7])[0-9]{9}$/;

  cellphone = onlyNumbers(cellphone);
  return regex.test(cellphone);
};

export const validateTellphone = (tellphone: string): boolean => {
  const regex = /^([14689][0-9]|2[12478]|3([1-5]|[7-8])|5([13-5])|7[193-7])[0-9]{8}$/;

  tellphone = onlyNumbers(tellphone);
  return regex.test(tellphone);
};

export const validateBase64 = (base64: string) => {
  const regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
  return regex.test(base64);
};
