import {axiosInstance} from '../../src/utils/axios';
import getCharacterComics from '../../src/services/getCharacterComics';
import IMarvelCharacter from '../../src/types/IMarvelCharacter';
import IMarvelComic from '../../src/types/IMarvelComic';
import IMarvelResponse from '../../src/types/IMarvelResponse';
import {MARVEL_API_URL} from '../../src/config/env';

jest.mock('../../src/utils/axios');

const mockedAxiosInstanceGet = axiosInstance.get as jest.Mock;

describe('getCharacterComic', () => {
  afterEach(() => {
    mockedAxiosInstanceGet.mockClear();
  });

  it('should retrieve the comics associated with a character', async () => {
    const character: IMarvelCharacter = {
      id: 1,
      name: 'Character 1',
      description: 'Description 1',
      thumbnail: {path: 'path', extension: 'jpg'},
      comics: {
        available: 10,
        collectionURI: `${MARVEL_API_URL}/comics/1`,
      },
    };

    const mockResponse: IMarvelResponse<IMarvelComic> = {
      code: 200,
      status: 'Ok',
      data: {
        limit: 5,
        offset: 0,
        total: 2,
        results: [
          {id: 1, title: 'Comic 1', description: 'Description 1'},
          {id: 2, title: 'Comic 2', description: 'Description 2'},
        ],
      },
    };

    mockedAxiosInstanceGet.mockResolvedValueOnce({data: mockResponse});
    const comics = await getCharacterComics(character);

    expect(comics).toEqual([
      {id: 1, title: 'Comic 1', description: 'Description 1'},
      {id: 2, title: 'Comic 2', description: 'Description 2'},
    ]);
  });

  it('should throw an error if the request fails', async () => {
    const character: IMarvelCharacter = {
      id: 1,
      name: 'Character 1',
      description: 'Description 1',
      thumbnail: {path: 'path', extension: 'jpg'},
      comics: {
        available: 10,
        collectionURI: `${MARVEL_API_URL}/comics/1?limit=5&offset=0`,
      },
    };

    const mockErrorResponse: IMarvelResponse<IMarvelComic> = {
      code: 500,
      status: 'Internal Server Error',
      data: {
        limit: 5,
        offset: 0,
        total: 0,
        results: [],
      },
    };

    mockedAxiosInstanceGet.mockResolvedValueOnce({data: mockErrorResponse});

    await expect(getCharacterComics(character)).rejects.toThrow(
      'Internal Server Error'
    );
  });
});
