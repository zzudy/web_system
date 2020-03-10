const { MongoClient } = require("mongodb");
//const uri = "mongodb+srv://dbUser:Woo23IViADUOCm4J@cluster0-ekpvf.mongodb.net/apuz?retryWrites=true&w=majority";
//const uri = "mongodb://localhost:27017/apuz";
const uri="mongodb://apuzi:Efr8XD1mrojdlaMUKIFPbUZkoyPQteN157DwV9u0VUcLbMqH4W2DlXrIzpI24jfSdRrbEd6j18oV3oRLN1RELw%3D%3D@apuzi.documents.azure.com:10255/apuz?ssl=true";
const dbName = "apuz";


async function listCollections(){
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const collections=await client.db(dbName).listCollections(undefined,{nameOnly:true}).toArray();
        return collections;
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function listDatabases() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        databasesList = await client.db().admin().listDatabases();
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

};

async function createListing(collectionName, newListing) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        var result = await client.db(dbName).collection(collectionName).insertOne(newListing);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
        return result.insertedId;
    }
}

async function createMultipleListings(collectionName, newListings) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const result = await client.db(dbName).collection(collectionName).insertMany(newListings);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

}

async function findOneListing(collectionName, format) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        result = await client.db(dbName).collection(collectionName).findOne(format);
        if (result) {
            return result;
        } else {
            console.log(`No listings found`);
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function findMultipleListings(collectionName, format) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        result = await client.db(dbName).collection(collectionName).find(format).toArray();
        if (result.length !== 0) {
            return result;
        } else {
            console.log(`No listings found`);
            return [];
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function updateListing(collectionName, format, updatedListing) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        result = await client.db(dbName).collection(collectionName)
            .updateOne(format, { $set: updatedListing });
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}


async function upsertListing(collectionName, format, updatedListing) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();

        result = await client.db(dbName).collection(collectionName)
            .updateOne(format,
                { $set: updatedListing },
                { upsert: true });
        if (result.upsertedCount > 0) {
            console.log(`One document was inserted with the id ${result.upsertedId._id}`);
        } else {
            console.log(`${result.modifiedCount} document(s) was/were updated.`);
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function pushElementInListing(collectionName, format, element) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();

        result = await client.db(dbName).collection(collectionName)
            .updateOne(format,
                { $push: element },
                { upsert: true });
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function pullElementInListing(collectionName, format, element) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();

        result = await client.db(dbName).collection(collectionName)
            .updateOne(format,
                { $pull: element });
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function deleteListing(collectionName, format) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        result = await client.db(dbName).collection(collectionName).deleteOne(format);
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

}

module.exports = {
    uri,
    dbName,
    listDatabases,
    createListing,
    createMultipleListings,
    findOneListing,
    updateListing,
    upsertListing,
    deleteListing,
    pushElementInListing,
    pullElementInListing,
    findMultipleListings,
    listCollections
}
