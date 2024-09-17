const mongo = require('mongodb').MongoClient;
const collectionName = 'documents';
require('dotenv').config();

const database = {
    getDb: async function getDb() {
        const dbUser = process.env.DB_USER || 'teophilsimao';
        const dbPassword = process.env.DB_PASSWORD || '<db_password>';
        const dbName = process.env.DB_NAME || 'documents';
        const clusterName = process.env.CLUSTER_NAME || 'cluster0.mhxdv';
        
        let dsn = `mongodb+srv://${dbUser}:${dbPassword}@${clusterName}.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

        if (process.env.NODE_ENV === 'test') {
            dsn = `mongodb://localhost:27017/test`;
        }

        const client = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = await client.db();
        const collection = await db.collection(collectionName);

        return {
            db: db,
            collection: collection,
            client: client,
        };
    }
}

module.exports = database;