import {startConnection, closeConnection} from './src/mongo/startConnection';
import script from './src/script';

(async () => {
  try {
    await startConnection();
    await script();
  } catch (error) {
    console.error(error);
  } finally {
    await closeConnection();
  }
})();
