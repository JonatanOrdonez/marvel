import {SPECTRUM_NAME} from '../config/constants';
import IMarvelCharacter from '../types/IMarvelCharacter';
import IMarvelResponse from '../types/IMarvelResponse';
import {axiosInstance} from '../utils/axios';

/**
 * Retrieves the Spectrum character from the Marvel API.
 * @returns {Promise<IMarvelCharacter>} The Spectrum character object.
 * @throws {Error} If the API response code is not 200 or if the character is not found.
 */
const getSpectrumCharacter = async () => {
  const {data} = await axiosInstance.get<IMarvelResponse<IMarvelCharacter>>(
    '/characters',
    {
      params: {
        name: SPECTRUM_NAME,
      },
    }
  );

  if (data.code !== 200) {
    throw new Error(data.status);
  }

  if (data.data.results.length === 0) {
    throw new Error('Character not found');
  }

  return data.data.results[0];
};

export default getSpectrumCharacter;
