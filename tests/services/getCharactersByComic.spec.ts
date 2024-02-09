import getCharactersByComic from '../../src/services/getCharactersByComic';
import IMarvelComic from '../../src/types/IMarvelComic';
import IMarvelResponse from '../../src/types/IMarvelResponse';
import {axiosInstance} from '../../src/utils/axios';

jest.mock('../../src/utils/axios');

const mockedAxiosInstanceGet = axiosInstance.get as jest.Mock;

describe('getCharactersByComic', () => {
  afterEach(() => {
    mockedAxiosInstanceGet.mockClear();
  });

  it('should return an empty array if no characters are found', async () => {
    const comic: IMarvelComic = {
      id: 1,
      title: 'Comic 1',
      description: 'Description 1',
    };

    const mockResponse: IMarvelResponse<IMarvelComic> = {
      code: 200,
      status: 'Ok',
      data: {
        limit: 5,
        offset: 0,
        total: 0,
        results: [],
      },
    };

    mockedAxiosInstanceGet.mockResolvedValueOnce({data: mockResponse});
    const characters = await getCharactersByComic(comic);

    expect(characters).toEqual([]);
  });

  it('should return an array of characters if characters are found', async () => {
    const comic: IMarvelComic = {
      id: 1,
      title: 'Comic 1',
      description: 'Description 1',
    };

    const mockResponse: IMarvelResponse<IMarvelComic> = {
      code: 200,
      status: 'Ok',
      data: {
        limit: 5,
        offset: 0,
        total: 2,
        results: [
          {id: 1, title: 'Character 1', description: 'Description 1'},
          {id: 2, title: 'Character 2', description: 'Description 2'},
        ],
      },
    };

    mockedAxiosInstanceGet.mockResolvedValueOnce({data: mockResponse});
    const characters = await getCharactersByComic(comic);

    expect(characters).toEqual([
      {id: 1, title: 'Character 1', description: 'Description 1'},
      {id: 2, title: 'Character 2', description: 'Description 2'},
    ]);
  });

  it('should return an array of characters if characters are found with multiple requests', async () => {
    const comic: IMarvelComic = {
      id: 1,
      title: 'Comic 1',
      description: 'Description 1',
    };

    const mockResponse1: IMarvelResponse<IMarvelComic> = {
      code: 200,
      status: 'Ok',
      data: {
        limit: 100,
        offset: 0,
        total: 200,
        results: [
          {id: 1, title: 'Character 1', description: 'Description 1'},
          {id: 2, title: 'Character 2', description: 'Description 2'},
        ],
      },
    };

    const mockResponse2: IMarvelResponse<IMarvelComic> = {
      code: 200,
      status: 'Ok',
      data: {
        limit: 100,
        offset: 200,
        total: 200,
        results: [
          {id: 1, title: 'Character 3', description: 'Description 3'},
          {id: 2, title: 'Character 4', description: 'Description 4'},
        ],
      },
    };

    mockedAxiosInstanceGet.mockResolvedValueOnce({data: mockResponse1});
    mockedAxiosInstanceGet.mockResolvedValueOnce({data: mockResponse2});

    const characters = await getCharactersByComic(comic);

    expect(characters).toEqual([
      {id: 1, title: 'Character 1', description: 'Description 1'},
      {id: 2, title: 'Character 2', description: 'Description 2'},
      {id: 1, title: 'Character 3', description: 'Description 3'},
      {id: 2, title: 'Character 4', description: 'Description 4'},
    ]);

    expect(mockedAxiosInstanceGet).toHaveBeenCalledWith(
      '/comics/1/characters?limit=100&offset=0'
    );
    expect(mockedAxiosInstanceGet).toHaveBeenCalledWith(
      '/comics/1/characters?limit=100&offset=100'
    );
  });

  it('should throw an error if the response code is not 200', async () => {
    const comic: IMarvelComic = {id: 123, title: 'Comic 123', description: ''};

    mockedAxiosInstanceGet.mockResolvedValueOnce({
      data: {
        code: 500,
        status: 'Internal Server Error',
      },
    });

    await expect(getCharactersByComic(comic)).rejects.toThrow(
      'Internal Server Error'
    );
  });
});
