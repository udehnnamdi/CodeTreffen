import { MongoClient } from 'mongodb';


async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect(
        'mongodb+srv://udehnnamdi:We0ZPRksScfRAMjD@cluster0.wlpvc.mongodb.net/codeTreffen?retryWrites=true&w=majority'
    );
    const db = client.db();

    const treffenCollection = db.collection('codeTreffen');

    const result = await treffenCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: 'Treffen inserted!' });
  }
}

export default handler;