const mongo = require('mongodb').MongoClient;
const collectionName = 'document';
require('dotenv').config();

const database = {
    getDb: async function getDb() {       
        let dsn = `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@documents.xaxzx.mongodb.net/documents?retryWrites=true&w=majority&appName=Documents`

        if (process.env.NODE_ENV === 'test') {
            dsn = `mongodb://localhost:27017/test`;
        }

        const client = await mongo.connect(dsn);
        const db = await client.db();
        const collection = await db.collection(collectionName);

        return {
            db: db,
            collection: collection,
            client: client,
        };
    }
}

// , {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }

module.exports = database;