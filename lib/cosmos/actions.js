import cosmos from "./cosmos";

export const createItem = async (typeName, item) => {
  item.type = typeName;

  await cosmos.initialize();
  const container = cosmos.getContainer();
  const { resource: newItem } = await container.items.create(item);
  return newItem;
};

export const updateItem = async (typeName, item) => {
  item.type = typeName;

  await cosmos.initialize();
  const container = cosmos.getContainer();
  const { resource: replaced } = await container
    .item(item.id, [typeName])
    .replace(item);

  return replaced;
};

export const deleteItem = async (typeName, id) => {
  await cosmos.initialize();
  const container = cosmos.getContainer();
  await container.item(id, [typeName]).delete();
};
