import {md5} from '../../src/utils/hashAlgorithms';

describe('md5', () => {
  it('should return the correct hash for a given input', () => {
    const input = 'Hello, World!';
    const expectedHash = '65a8e27d8879283831b664bd8b7f0ad4';
    const result = md5(input);
    expect(result).toBe(expectedHash);
  });

  it('should return an empty string for an empty input', () => {
    const input = '';
    const expectedHash = '';
    const result = md5(input);
    expect(result).toBe(expectedHash);
  });

  it('should return the same hash for the same input', () => {
    const input = 'Hello, World!';
    const result1 = md5(input);
    const result2 = md5(input);
    expect(result1).toBe(result2);
  });
});
