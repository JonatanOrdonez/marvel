import IMarvelCharacter from '../types/IMarvelCharacter';
import IMarvelComic from '../types/IMarvelComic';
import getCharactersByComic from './getCharactersByComic';

/**
 * Returns an array of unique characters from the given array of characters.
 * @param characters - The array of characters.
 * @returns An array of unique characters.
 */
const getUniqueCharacters = (characters: IMarvelCharacter[]) => {
  const uniqueCharacters: IMarvelCharacter[] = [];

  for (const character of characters) {
    const isDuplicate = uniqueCharacters.some(c => c.id === character.id);
    if (!isDuplicate) {
      uniqueCharacters.push(character);
    }
  }

  return uniqueCharacters;
};

/**
 * Retrieves characters by comics.
 * @param comics - An array of comics.
 * @returns A promise that resolves to an array of characters.
 */
const getCharactersByComics = async (
  comics: IMarvelComic[]
): Promise<IMarvelCharacter[]> => {
  const promises: Promise<IMarvelCharacter[]>[] = [];

  for (const comic of comics) {
    const request = getCharactersByComic(comic);
    promises.push(request);
  }

  const result = await Promise.all(promises);

  const characters = result.reduce<IMarvelCharacter[]>(
    (acc, data) => [...acc, ...data],
    []
  );

  return getUniqueCharacters(characters);
};

export default getCharactersByComics;
