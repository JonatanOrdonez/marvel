import getCharacterComics from './services/getCharacterComics';
import getCharactersByComics from './services/getCharactersByComics';
import getSpectrumCharacter from './services/getSpectrumCharacter';
import storeCharactersInMongo from './services/storeCharactersInMongo';

export default async () => {
  try {
    console.log('Start of script');
    const spectrum = await getSpectrumCharacter();
    const comics = await getCharacterComics(spectrum);
    const characters = await getCharactersByComics(comics);
    await storeCharactersInMongo(characters);
    console.log('Characters stored in mongo');
  } catch (error) {
    console.error(error);
  } finally {
    console.log('End of script');
  }
};
