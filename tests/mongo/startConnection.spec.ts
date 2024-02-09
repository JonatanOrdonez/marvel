import mongoose from 'mongoose';
import {startConnection} from '../../src/mongo/startConnection';

describe('startConnection', () => {
  let connectSpy: jest.SpyInstance;

  beforeAll(() => {
    connectSpy = jest.spyOn(mongoose, 'connect');
  });

  afterAll(() => {
    connectSpy.mockRestore();
  });

  it('should connect to the Mongo DB', async () => {
    await startConnection();
    expect(connectSpy).toHaveBeenCalledWith(
      expect.stringContaining('mongodb://'),
      {
        user: expect.any(String),
        pass: expect.any(String),
        dbName: expect.any(String),
      }
    );
  });
});

describe('closeConnection', () => {
  let closeSpy: jest.SpyInstance;

  beforeAll(() => {
    closeSpy = jest.spyOn(mongoose.connection, 'close');
  });

  afterAll(() => {
    closeSpy.mockRestore();
  });

  it('should close the connection to the Mongo DB', async () => {
    await startConnection();
    await mongoose.connection.close();
    expect(closeSpy).toHaveBeenCalled();
  });
});
