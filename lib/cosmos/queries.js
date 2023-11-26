import cosmos from "./cosmos";
import { cache } from "react";

export const getItemsByType = cache(async (typeName) => {
  await cosmos.initialize();
  const container = cosmos.getContainer();
  let query = `SELECT * FROM root r WHERE r.type='${typeName}'`;
  const { resources } = await container.items.query(query).fetchAll();
  return resources;
});

export const getItemById = cache(async (itemId, type) => {
  await cosmos.initialize();
  const container = cosmos.getContainer();
  const { resource } = await container.item(itemId, [type]).read();
  return resource;
});
