import getCharactersByComics from '../../src/services/getCharactersByComics';
import getCharactersByComic from '../../src/services/getCharactersByComic';
import IMarvelCharacter from '../../src/types/IMarvelCharacter';
import IMarvelComic from '../../src/types/IMarvelComic';

jest.mock('../../src/services/getCharactersByComic');

describe('getCharactersByComics', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should retrieve characters by comics', async () => {
    const comics: IMarvelComic[] = [
      {id: 1, title: 'Comic 1', description: 'Description 1'},
      {id: 2, title: 'Comic 2', description: 'Description 2'},
    ];

    const characters1: IMarvelCharacter[] = [
      {
        id: 1,
        name: 'Character 1',
        description: 'Description 1',
        thumbnail: {path: 'path', extension: 'jpg'},
        comics: {available: 1, collectionURI: 'URI'},
      },
      {
        id: 2,
        name: 'Character 2',
        description: 'Description 2',
        thumbnail: {path: 'path', extension: 'jpg'},
        comics: {available: 1, collectionURI: 'URI'},
      },
    ];

    const characters2: IMarvelCharacter[] = [
      {
        id: 3,
        name: 'Character 3',
        description: 'Description 3',
        thumbnail: {path: 'path', extension: 'jpg'},
        comics: {available: 1, collectionURI: 'URI'},
      },
      {
        id: 4,
        name: 'Character 4',
        description: 'Description 4',
        thumbnail: {path: 'path', extension: 'jpg'},
        comics: {available: 1, collectionURI: 'URI'},
      },
    ];

    (getCharactersByComic as jest.Mock).mockResolvedValueOnce(characters1);
    (getCharactersByComic as jest.Mock).mockResolvedValueOnce(characters2);

    const result = await getCharactersByComics(comics);

    expect(getCharactersByComic).toHaveBeenCalledTimes(2);
    expect(getCharactersByComic).toHaveBeenCalledWith(comics[0]);
    expect(getCharactersByComic).toHaveBeenCalledWith(comics[1]);
    expect(result).toEqual([
      {
        id: 1,
        name: 'Character 1',
        description: 'Description 1',
        thumbnail: {path: 'path', extension: 'jpg'},
        comics: {available: 1, collectionURI: 'URI'},
      },
      {
        id: 2,
        name: 'Character 2',
        description: 'Description 2',
        thumbnail: {path: 'path', extension: 'jpg'},
        comics: {available: 1, collectionURI: 'URI'},
      },
      {
        id: 3,
        name: 'Character 3',
        description: 'Description 3',
        thumbnail: {path: 'path', extension: 'jpg'},
        comics: {available: 1, collectionURI: 'URI'},
      },
      {
        id: 4,
        name: 'Character 4',
        description: 'Description 4',
        thumbnail: {path: 'path', extension: 'jpg'},
        comics: {available: 1, collectionURI: 'URI'},
      },
    ]);
  });

  it('should return an empty array if no comics are provided', async () => {
    const comics: IMarvelComic[] = [];

    const result = await getCharactersByComics(comics);

    expect(getCharactersByComic).not.toHaveBeenCalled();
    expect(result).toEqual([]);
  });
});
