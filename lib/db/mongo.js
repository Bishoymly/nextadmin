import { MongoClient, ObjectId } from "mongodb";

class MongoSingleton {
  constructor() {
    this.client = null;
    this.db = null;
  }

  async initialize() {
    const uri = process.env.MONGODB_URI;
    const dbName = process.env.MONGODB_DB;

    this.client = new MongoClient(uri);
    await this.client.connect();
    this.db = this.client.db(dbName);
  }

  getDatabase() {
    return this.db;
  }

  getCollection(collectionName) {
    return this.db.collection(collectionName);
  }

  create = async (item) => {
    await this.initialize();
    const collection = this.getCollection(item.type);
    if (item.id) {
      item._id = new ObjectId(item.id);
      delete item.id;
    }
    const result = await collection.insertOne(item);
    return this.toItem(result);
  };

  update = async (item) => {
    await this.initialize();
    const collection = this.getCollection(item.type);
    if (item.id) {
      item._id = new ObjectId(item.id);
      delete item.id;
    }
    const result = await collection.updateOne(
      { _id: item._id },
      { $set: item }
    );
    return result.modifiedCount;
  };

  delete = async (typeName, id) => {
    await this.initialize();
    const collection = this.getCollection(typeName);
    if (id.length == 24) {
      id = new ObjectId(id);
    }
    const result = await collection.deleteOne({ _id: id });
    return result.deletedCount;
  };

  query = async (typeName, query) => {
    await this.initialize();
    const collection = this.getCollection(typeName);
    const result = await collection.find(query).toArray();
    return this.toItems(result);
  };

  getItemsByType = async (typeName) => {
    await this.initialize();
    const collection = this.getCollection(typeName);
    const result = await collection.find({}).toArray();
    return this.toItems(result);
  };

  getItemById = async (typeName, id) => {
    await this.initialize();
    const collection = this.getCollection(typeName);
    if (id.length == 24) {
      id = new ObjectId(id);
    }
    const result = await collection.findOne({ _id: id });
    return result ? this.toItem(result) : null;
  };

  queryWithFiltersAndPaging = async (
    typeName,
    select,
    filter,
    sort,
    page,
    pageSize
  ) => {
    await this.initialize();
    const collection = this.getCollection(typeName);

    // Build the query object
    let query = {};

    // Add filter conditions to the query
    if (filter) {
      query = { ...query, ...filter };
    }

    // Add sorting to the query
    const sortOptions = {};
    if (sort) {
      const sortWords = sort.split(" ");
      let sortDirection = 1;
      if (sortWords.length > 1) {
        sortDirection = sortWords[1] === "asc" ? 1 : -1;
      }
      sortOptions[sortWords[0]] = sortDirection;
    }

    // Calculate the offset and limit for paging
    const offset = (page - 1) * pageSize;
    const limit = parseInt(pageSize);

    // Execute the query and fetch the results
    const result = await collection
      .find(query)
      .sort(sortOptions)
      .skip(offset)
      .limit(limit)
      .toArray();

    // Get the total count of rows
    const totalCount = await collection.countDocuments(query);

    return {
      rows: this.toItems(result),
      totalRowsCount: totalCount,
    };
  };

  toFilterString = (type, searchParams) => {
    return searchParams;
  };

  toItems = (items) => {
    return items.map((item) => this.toItem(item));
  };

  toItem = (item) => {
    const { _id, ...rest } = item;
    return { id: _id.toString(), ...rest };
  };
}

const mongoSingleton = new MongoSingleton();
export default mongoSingleton;
