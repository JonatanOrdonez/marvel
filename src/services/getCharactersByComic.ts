import {MARVEL_MAX_LIMIT} from '../config/env';
import IMarvelCharacter from '../types/IMarvelCharacter';
import IMarvelComic from '../types/IMarvelComic';
import IMarvelResponse from '../types/IMarvelResponse';
import {axiosInstance} from '../utils/axios';

/**
 * Retrieves characters by making a request to the specified URL.
 * @param url - The URL to make the request to.
 * @returns A promise that resolves to the response data containing characters.
 * @throws An error if the response code is not 200.
 */
const requestCharacters = async (
  url: string
): Promise<IMarvelResponse<IMarvelCharacter>> => {
  const {data} =
    await axiosInstance.get<IMarvelResponse<IMarvelCharacter>>(url);

  if (data.code !== 200) {
    throw new Error(data.status);
  }

  return data;
};

/**
 * Requests and retrieves characters associated with a comic from the Marvel API.
 * @param comic - The comic object.
 * @returns A promise that resolves to an array of characters.
 */
const getCharactersByComic = async (
  comic: IMarvelComic
): Promise<IMarvelCharacter[]> => {
  const initialRequest = requestCharacters(
    `/comics/${comic.id}/characters?limit=${MARVEL_MAX_LIMIT}&offset=0`
  );

  const {data} = await initialRequest;

  if (data.results.length === 0) {
    return [];
  }

  if (data.total <= MARVEL_MAX_LIMIT) {
    return data.results;
  }

  const totalRequests = Math.ceil(data.total / MARVEL_MAX_LIMIT);

  const promises: Promise<IMarvelResponse<IMarvelCharacter>>[] = [];

  for (let i = 1; i < totalRequests; i++) {
    const request = requestCharacters(
      `/comics/${comic.id}/characters?limit=${MARVEL_MAX_LIMIT}&offset=${
        i * MARVEL_MAX_LIMIT
      }`
    );

    promises.push(request);
  }

  const result = await Promise.all(promises);

  const characters = result.reduce<IMarvelCharacter[]>(
    (acc, {data}) => [...acc, ...data.results],
    data.results
  );

  return characters;
};

export default getCharactersByComic;
