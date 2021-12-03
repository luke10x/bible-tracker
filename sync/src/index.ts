import * as express from 'express';
import * as cors from 'cors';
import * as assert from 'assert';
import { getCollectionClosure } from './db';
import { Collection, Document } from 'mongodb';
import { authenticated } from './auth';

assert(process.env.DB_URL, 'DB_URL missing');
console.log(`DB_URL=${process.env.DB_URL.replace(/(mongodb:\/\/)[^@]+(.*)/g, '$1***$2')}`)

assert(process.env.JWKS_URL, 'JWKS_URL missing');
console.log(`JWKS_URL=${process.env.JWKS_URL}`);

const getCollection = getCollectionClosure(process.env.DB_URL, 'bible-tracker', 'users');

const app = express();

app.use(cors());
app.use(express.json());

app.get( "/", authenticated, async ( req, res ) => {
  const userCollection: Collection<Document> = await getCollection();

  const user = await userCollection
    .findOne({ userId: req.params.userId });

  res.send( user?.activities || []);
});

app.post("/", authenticated, async (req, res) => {
  console.log("🆕 Posting new activity", req.body);
  const userCollection: Collection<Document> = await getCollection();
  await userCollection.updateOne(
    { userId: req.params.userId },
    { 
      $setOnInsert: { userId: req.params.userId },
      $push: { activities: req.body}
    },
    { upsert: true }
  );
  res.send("Activity added");
});

app.delete("/:uuid", authenticated, async (req, res) => {
  console.log("✂️ Deleting activity", req.params.uuid);
  const userCollection: Collection<Document> = await getCollection();
  const result = await userCollection.updateOne(
    { userId: req.params.userId },    
    { 
      $pull: { activities: { uuid: req.params.uuid } }
    }
  );
  console.log("✂️ Deleting activity", result);

  res.send("Activity removed");
});

const port = process.env.PORT || 3000;
app.listen( port, () => {
  console.log( `🔄 server running on http://localhost:${ port }` );
});