const config = {
    endpoint: process.env["Cosmos:Endpoint"],
    key: process.env["Cosmos:Key"],
    databaseId: process.env["Cosmos:Database"],
    containerId: process.env["Cosmos:Container"],
    partitionKey: {
        kind: process.env["Cosmos:PartitionKey:Kind"],
        paths: [process.env["Cosmos:PartitionKey:Paths"]]
    }
};

module.exports = config;