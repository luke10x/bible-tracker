import * as express from 'express';
import * as cors from 'cors';
import { getCollectionClosure } from './db';
import { Collection, Document } from 'mongodb';

const hardcodedUserId = "luke10x";

const getCollection = getCollectionClosure(process.env.DB_URL, 'bible-tracker', 'users');

const app = express();

app.use(cors());
app.use(express.json());

app.get( "/", async ( req, res ) => {
  const userCollection: Collection<Document> = await getCollection();

  const user = await userCollection
    .findOne({ userId: hardcodedUserId });

  res.send( user?.activities || []);
});

app.post("/", async (req, res) => {
  console.log("🆕 Posting new activity", req.body);
  const userCollection: Collection<Document> = await getCollection();
  await userCollection.updateOne(
    { userId: hardcodedUserId },
    { 
      $setOnInsert: { userId: hardcodedUserId },
      $push: { activities: req.body}
    },
    { upsert: true }
  );
  res.send("Activity added");
});

app.delete("/:uuid", async (req, res) => {
  console.log("✂️ Deleting activity", req.params.uuid);
  const userCollection: Collection<Document> = await getCollection();
  const result = await userCollection.updateOne(
    { userId: hardcodedUserId },    
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