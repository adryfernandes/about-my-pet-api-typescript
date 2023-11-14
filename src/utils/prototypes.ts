// Cria métodos nativos nos tipos primitivos
declare global {
  interface String {
    toTitleCase(): string;
    toCapitalizeCase(): string;
    isString(): boolean;
  }
}

// Deixa a primeira letra maiuscula e as outras minúsculas
String.prototype.toTitleCase = function (): string {
  if (!this) {
    return this;
  }

  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

// Deixa a primeira letra de todas as palavras de uma frase
String.prototype.toCapitalizeCase = function (): string {
  const text = this.toLowerCase().split(' ');

  for (let i = 0; i < text.length; i++) {
    text[i] = text[i][0].toUpperCase() + text[i].substr(1);
  }

  return text.join(' ');
};

// Diz se a variável é uma string
String.prototype.isString = function (): boolean {
  return typeof this === 'string';
};

export {};
