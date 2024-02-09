import CharacterModel from '../models/Character.model';
import ICharacter from '../types/ICharacter';
import IMarvelCharacter from '../types/IMarvelCharacter';

/**
 * Stores an array of characters in MongoDB.
 * @param characters - The array of characters to be stored.
 * @returns A Promise that resolves to void.
 */
const storeCharactersInMongo = async (
  characters: IMarvelCharacter[]
): Promise<void> => {
  const newCharacters: ICharacter[] = characters.map(character => ({
    id: character.id,
    name: character.name,
    description: character.description,
    thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
  }));

  await CharacterModel.insertMany(newCharacters, {ordered: false});
};

export default storeCharactersInMongo;
