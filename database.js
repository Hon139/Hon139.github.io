const { MongoClient } = require('mongodb');

async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://SirBrandolf:8fCT2SReCdrQNaS9@cluster0.lftggle.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    /**
     * The Mongo Client you will use to interact with your database
     * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
     * In case: '[MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated...'
     * pass option { useUnifiedTopology: true } to the MongoClient constructor.
     * const client =  new MongoClient(uri, {useUnifiedTopology: true})
     */
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        // await listDatabases(client);

        // Makes a User
        /*
        await createUser(client,
            {
                username: "John Doe",
                gender: "male",
                race: "hispanic",
                heritage: "christian",
                age: 18,
                email: "johndoe2005@aol.com",
                password: "123password"
            }
        );
        */

        // Makes a Listing
        /*
        await createListing(client,
            {
                monetaryAmount: 2000,
                sponsorName: "Your mom",
                targetAge: 18,
                targetRace: "any",
                targetGender: "any",
                targetHeritage: "any"
            }
        );
        */

    } catch (e) {
        console.error(e);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

/**
 * Print the names of all available databases
 * @param {MongoClient} client A MongoClient that is connected to a cluster
 */
async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

// creates a new user
async function createUser(client, newUser){
    const result = await client.db("breadBankData").collection("userData").insertOne(newUser);
    console.log(`New user created with the following id: ${result.insertedId}`);
}

// creates a new listing
async function createListing(client, newListing){
    const result = await client.db("breadBankData").collection("scholarshipData").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

// filters listing


