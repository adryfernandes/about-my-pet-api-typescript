export const isEnumValue = <T extends Record<string, string>>(
  enumObj: T,
  value: string,
): value is T[keyof T] => Object.values(enumObj).includes(value);
