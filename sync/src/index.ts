import * as express from 'express';
import * as cors from 'cors';
import { getCollectionClosure } from './db';

const getCollection = getCollectionClosure(process.env.DB_URL, 'bible-tracker', 'activities');

const app = express();

app.use(cors());

app.get( "/", ( req, res ) => {
  res.send( "🔄 sync server is active!" );
});

app.post("/", (req, res) => {
  res.send("SAVED\n");
});

const port = process.env.PORT || 3000;
app.listen( port, () => {
  console.log( `🔄 server running on http://localhost:${ port }` );
});