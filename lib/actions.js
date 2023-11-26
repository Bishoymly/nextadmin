"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createItem, deleteItem, updateItem } from "./cosmos/actions";
import { getType } from "./types/utils";
import zodSchema from "./types/zod-schema";

export async function createAction(typeName, formData) {
  const type = await getType(typeName);
  const schema = zodSchema(type);
  let item = schema.parse(formData);
  item.type = typeName;

  await createItem(typeName, item);

  revalidatePath(`/admin/${typeName}`);
  redirect(`/admin/${typeName}`);
}

export async function updateAction(typeName, formData) {
  const type = await getType(typeName);
  const schema = zodSchema(type);
  let item = schema.parse(formData);
  item.type = typeName;

  await updateItem(typeName, item);

  revalidatePath(`/admin/${typeName}`);
  redirect(`/admin/${typeName}`);
}

export async function deleteAction(typeName, id) {
  await deleteItem(typeName, id);

  revalidatePath(`/admin/${typeName}`);
  redirect(`/admin/${typeName}`);
}
