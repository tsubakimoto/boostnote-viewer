// https://docs.microsoft.com/ja-jp/azure/cosmos-db/sql-api-nodejs-get-started
const config = require("../config");
const CosmosClient = require("@azure/cosmos").CosmosClient;
const dbContext = require("../databaseContext");

module.exports = async function (context, req) {
    context.log('Notes function processed a request.');

    const { endpoint, key, databaseId, containerId } = config;
    const client = new CosmosClient({ endpoint, key });
    const database = client.database(databaseId);
    const container = database.container(containerId);

    await dbContext.create(client, databaseId, containerId);

    // query to return all items
    const querySpec = {
        query: "SELECT * from c"
    };

    // read all items in the Items container
    const { resources: items } = await container.items
        .query(querySpec)
        .fetchAll();

    context.res = {
        headers: {
            "Content-Type": "application/json"
        },
        body: items
    };
}