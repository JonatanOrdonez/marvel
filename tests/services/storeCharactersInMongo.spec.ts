import CharacterModel from '../../src/models/Character.model';
import storeCharactersInMongo from '../../src/services/storeCharactersInMongo';
import ICharacter from '../../src/types/ICharacter';
import IMarvelCharacter from '../../src/types/IMarvelCharacter';

jest.mock('../../src/models/Character.model');

describe('storeCharactersInMongo', () => {
  const characters: IMarvelCharacter[] = [
    {
      id: 1,
      name: 'Character 1',
      description: 'Description 1',
      thumbnail: {path: 'path', extension: 'jpg'},
      comics: {
        available: 1,
        collectionURI: 'URI',
      },
    },
    {
      id: 2,
      name: 'Character 2',
      description: 'Description 2',
      thumbnail: {path: 'path', extension: 'jpg'},
      comics: {
        available: 1,
        collectionURI: 'URI',
      },
    },
  ];

  const expectedCharacters: ICharacter[] = characters.map(character => ({
    id: character.id,
    name: character.name,
    description: character.description,
    thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
  }));

  it('should store characters in MongoDB', async () => {
    await storeCharactersInMongo(characters);

    expect(CharacterModel.insertMany).toHaveBeenCalledWith(expectedCharacters, {
      ordered: false,
    });
  });
});
