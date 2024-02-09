import script from '../src/script';
import getCharacterComics from '../src/services/getCharacterComics';
import getCharactersByComics from '../src/services/getCharactersByComics';
import getSpectrumCharacter from '../src/services/getSpectrumCharacter';
import storeCharactersInMongo from '../src/services/storeCharactersInMongo';
import ICharacter from '../src/types/ICharacter';
import IMarvelCharacter from '../src/types/IMarvelCharacter';
import IMarvelComic from '../src/types/IMarvelComic';

jest.mock('../src/services/getCharacterComics');
jest.mock('../src/services/getCharactersByComics');
jest.mock('../src/services/getSpectrumCharacter');
jest.mock('../src/services/storeCharactersInMongo');

const getCharacterComicsMock = getCharacterComics as jest.Mock;
const getCharactersByComicsMock = getCharactersByComics as jest.Mock;
const getSpectrumCharacterMock = getSpectrumCharacter as jest.Mock;

describe('script', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call the necessary functions in the correct order', async () => {
    const spectrumCharacter: IMarvelCharacter = {
      id: 1,
      name: 'Spectrum',
      description: 'Description',
      thumbnail: {path: 'path', extension: 'jpg'},
      comics: {
        available: 1,
        collectionURI: 'URI',
      },
    };

    const comics: IMarvelComic[] = [
      {id: 1, title: 'Comic 1', description: 'Description 1'},
      {id: 2, title: 'Comic 2', description: 'Description 2'},
    ];

    const characters: ICharacter[] = [
      {
        id: 1,
        name: 'Character 1',
        description: 'Description 1',
        thumbnail: 'path1.jpg',
      },
      {
        id: 2,
        name: 'Character 2',
        description: 'Description 2',
        thumbnail: 'path2.jpg',
      },
    ];

    getCharacterComicsMock.mockResolvedValue(comics);
    getCharactersByComicsMock.mockResolvedValue(characters);
    getSpectrumCharacterMock.mockResolvedValue(spectrumCharacter);

    await script();

    expect(getSpectrumCharacter).toHaveBeenCalledTimes(1);
    expect(getCharacterComics).toHaveBeenCalledTimes(1);
    expect(getCharacterComics).toHaveBeenCalledWith(spectrumCharacter);
    expect(getCharactersByComics).toHaveBeenCalledTimes(1);
    expect(getCharactersByComics).toHaveBeenCalledWith(comics);
    expect(storeCharactersInMongo).toHaveBeenCalledTimes(1);
    expect(storeCharactersInMongo).toHaveBeenCalledWith(characters);
  });

  it('should log an error if any of the functions throw an error', async () => {
    const error = new Error('Something went wrong');

    getSpectrumCharacterMock.mockRejectedValue(error);

    console.error = jest.fn();

    await script();

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error).toHaveBeenCalledWith(error);
  });
});
