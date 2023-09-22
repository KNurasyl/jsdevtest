import db from './db.mjs';
import express from 'express';
import path from 'path';
import { permit } from './middleware/permit.mjs';

// Express Server
const app = express();
const PORT = 3000;
const __dirname = path.join(...process.argv[1].split(/\/|\\/).slice(0, -1));

app.use(express.static(path.join(__dirname, '../client')));

app.listen(PORT, () => {
  console.log(`Express server listening on ${PORT}`);
});

// Routes

// Create
app.post('/create', permit(db), async (req, res) => {
  await performAction('create', req, res);
});

// Read
app.post('/read', permit(db), async (req, res) => {
  await performAction('read', req, res);
});

// Update
app.post('/update', permit(db), async (req, res) => {
  await performAction('update', req, res);
});

// Delete
app.post('/delete', permit(db), async (req, res) => {
  await performAction('delete', req, res);
});

async function performAction(action, req, res) {
  const {userId, collectionId, documentId, content} = req.query;
  try {
    const result = await db[action]({collectionId, documentId, content});
    res.json(result);
  } catch (e) {
    console.error(e);
    res.json(e);
  }

}

