import { Db, MongoClient } from 'mongodb';

let db = undefined;

const loadDb = async (dbUrl: string, dbName: string): Promise<Db> => {
  if (db !== undefined) {
    return db;
  }

  if (dbUrl === undefined) {
    console.error('DB_URL is undefined');
  }

  const mongoClientPromise = MongoClient.connect(dbUrl).catch(
    (e: Error) => {
      console.log('Cannot connect to database ' + dbUrl, e);
    },
  );
  const client = (await mongoClientPromise) as MongoClient;

  db = client.db(dbName);
  return db;
};

export const getCollectionClosure = (dbUrl: string, dbName: string, collection: string) => {
  return async () => {
    const db = await loadDb(dbUrl, dbName);
    return await db.collection(collection);
  }
}

// export const fetchUrls = async (): Promise<Array<any>> => {
//   const db = await loadDb();
//   return await db
//     .collection('urls')
//     .find({})
//     .sort({ code: -1 })
//     .toArray();
// };

// export const insertUrl = async (newEntry: any) => {
//   const db = await loadDb();
//   const urlCollection = db.collection('urls');
//   return urlCollection.insertOne(newEntry);
// };

// export const createUniqueIndex = async () => {
//   const db = await loadDb();
//   const urlCollection = db.collection('urls');
//   urlCollection.createIndex({ code: 1 }, { unique: true });
// };
