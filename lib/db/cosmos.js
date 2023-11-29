import {
  CosmosClient,
  PartitionKeyDefinitionVersion,
  PartitionKeyKind,
} from "@azure/cosmos";

class CosmosSingleton {
  constructor() {
    this.database = null;
    this.container = null;
  }

  async initialize() {
    if (!this.database || !this.container) {
      const databaseName = process.env.COSMOSDB_DATABASE_NAME;
      const containerName = process.env.COSMOSDB_CONTAINER_NAME;
      const client = new CosmosClient(process.env.COSMOSDB_CONNECTION_STRING);
      const database = client.database(databaseName);
      const container = database.container(containerName);
      await client.databases.createIfNotExists({
        id: databaseName,
      });
      await database.containers.createIfNotExists({
        id: containerName,
        partitionKey: {
          paths: ["/type"],
          version: PartitionKeyDefinitionVersion.V2,
          kind: PartitionKeyKind.MultiHash,
        },
      });
      this.database = database;
      this.container = container;
    }
  }

  getDatabase() {
    return this.database;
  }

  getContainer() {
    return this.container;
  }

  create = async (item) => {
    await this.initialize();
    const container = this.getContainer();
    const { resource: newItem } = await container.items.create(item);
    return newItem;
  };

  update = async (item) => {
    await this.initialize();
    const container = this.getContainer();
    const { resource: replaced } = await container
      .item(item.id, [item.type])
      .replace(item);

    return replaced;
  };

  delete = async (typeName, id) => {
    await this.initialize();
    const container = this.getContainer();
    await container.item(id, [typeName]).delete();
  };

  query = async (query) => {
    await this.initialize();
    const container = this.getContainer();
    const { resources } = await container.items.query(query).fetchAll();
    return resources;
  };

  getItemsByType = async (typeName) => {
    await this.initialize();
    const container = this.getContainer();
    let query = `SELECT * FROM root r WHERE r.type='${typeName}'`;
    const { resources } = await container.items.query(query).fetchAll();
    return resources;
  };

  getItemById = async (typeName, id) => {
    await this.initialize();
    const container = this.getContainer();
    const { resource } = await container.item(id, [typeName]).read();
    return resource;
  };
}

const cosmosSingleton = new CosmosSingleton();
export default cosmosSingleton;
