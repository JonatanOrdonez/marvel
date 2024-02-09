import {MARVEL_MAX_LIMIT} from '../config/env';
import IMarvelCharacter from '../types/IMarvelCharacter';
import IMarvelComic from '../types/IMarvelComic';
import IMarvelResponse from '../types/IMarvelResponse';
import {axiosInstance} from '../utils/axios';

/**
 * Makes a request to retrieve the comics associated with a given character.
 *
 * @param url - The URL to make the request to.
 * @returns A promise that resolves to an object containing the comics data.
 * @throws An error if the request fails or the response code is not 200.
 */
const requestComics = async (
  url: string
): Promise<IMarvelResponse<IMarvelComic>> => {
  const {data} = await axiosInstance.get<IMarvelResponse<IMarvelComic>>(url);
  if (data.code !== 200) {
    throw new Error(data.status);
  }

  return data;
};

/**
 * Retrieves the comics associated with a given character.
 *
 * @param character - The character object.
 * @returns A promise that resolves to an array of comics.
 */
const getCharacterComics = async (character: IMarvelCharacter) => {
  const promises: Promise<IMarvelResponse<IMarvelComic>>[] = [];

  const totalRequests = Math.ceil(
    character.comics.available / MARVEL_MAX_LIMIT
  );

  for (let i = 0; i < totalRequests; i++) {
    const request = requestComics(
      `${character.comics.collectionURI}?limit=${MARVEL_MAX_LIMIT}&offset=${
        i * MARVEL_MAX_LIMIT
      }`
    );

    promises.push(request);
  }

  const result = await Promise.all(promises);

  const comics = result.reduce<IMarvelComic[]>(
    (acc, {data}) => [...acc, ...data.results],
    []
  );

  return comics;
};

export default getCharacterComics;
