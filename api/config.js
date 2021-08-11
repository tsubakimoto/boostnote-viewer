const config = {
    endpoint: process.env["COSMOS_ENDPOINT"],
    key: process.env["COSMOS_KEY"],
    databaseId: process.env["COSMOS_DATABASE"],
    containerId: process.env["COSMOS_CONTAINER"],
    partitionKey: {
        kind: process.env["COSMOS_PARTITIONKEY_KIND"],
        paths: [process.env["COSMOS_PARTITIONKEY_PATHS"]]
    }
};

module.exports = config;