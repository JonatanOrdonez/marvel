import {axiosInstance} from '../../src/utils/axios';
import getSpectrumCharacter from '../../src/services/getSpectrumCharacter';
import IMarvelCharacter from '../../src/types/IMarvelCharacter';
import IMarvelResponse from '../../src/types/IMarvelResponse';

jest.mock('../../src/utils/axios');

const mockedAxiosInstanceGet = axiosInstance.get as jest.Mock;

describe('getSpectrumCharacter', () => {
  afterEach(() => {
    mockedAxiosInstanceGet.mockClear();
  });

  it('should retrieve the Spectrum character from the Marvel API', async () => {
    const mockCharacter: IMarvelCharacter = {
      id: 123,
      name: 'Spectrum',
      description: 'A powerful superhero with energy manipulation abilities.',
      comics: {
        available: 1,
        collectionURI: 'URI',
      },
      thumbnail: {
        path: 'path',
        extension: 'jpg',
      },
    };

    const mockResponse: IMarvelResponse<IMarvelCharacter> = {
      code: 200,
      status: 'Ok',
      data: {
        limit: 1,
        offset: 0,
        total: 1,
        results: [mockCharacter],
      },
    };

    mockedAxiosInstanceGet.mockResolvedValueOnce({data: mockResponse});

    const result = await getSpectrumCharacter();

    expect(mockedAxiosInstanceGet).toHaveBeenCalledWith('/characters', {
      params: {
        name: 'Spectrum',
      },
    });

    expect(result).toEqual(mockCharacter);
  });

  it('should throw an error if the API response code is not 200', async () => {
    const mockResponse: IMarvelResponse<IMarvelCharacter> = {
      code: 500,
      status: 'Internal Server Error',
      data: {
        limit: 1,
        offset: 0,
        total: 0,
        results: [],
      },
    };

    mockedAxiosInstanceGet.mockResolvedValueOnce({data: mockResponse});

    await expect(getSpectrumCharacter()).rejects.toThrow(
      'Internal Server Error'
    );
  });

  it('should throw an error if no characters were found', async () => {
    const mockResponse: IMarvelResponse<IMarvelCharacter> = {
      code: 200,
      status: 'Characters not found',
      data: {
        limit: 1,
        offset: 0,
        total: 0,
        results: [],
      },
    };

    mockedAxiosInstanceGet.mockResolvedValueOnce({data: mockResponse});

    await expect(getSpectrumCharacter()).rejects.toThrow('Character not found');
  });
});
