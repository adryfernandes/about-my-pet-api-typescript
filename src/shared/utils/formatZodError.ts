import type { ZodError } from 'zod';

import { isEmpty } from './functions';

export const formatZodError = (error: ZodError): string => {
  return error.issues
    .map((issue) => {
      const field = isEmpty(issue.path) ? 'campo' : issue.path.join('.');

      switch (issue.code) {
        case 'invalid_type':
          return `${field}: valor obrigatório não informado.`;

        case 'too_small':
          return `${field}: valor abaixo do mínimo permitido.`;

        case 'too_big':
          return `${field}: valor acima do máximo permitido.`;

        case 'invalid_format':
          return `${field}: formato inválido.`;

        case 'invalid_value':
          return `${field}: valor inválido.`;

        default:
          return `${field}: ${issue.message}`;
      }
    })
    .join('\n');
};
