import * as crypto from 'crypto';

export const md5 = (input: string): string => {
  if (input === '') return '';

  return crypto.createHash('md5').update(input).digest('hex');
};
