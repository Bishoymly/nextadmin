"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getType } from "./types/utils";
import zodSchema from "./types/zod-schema";
import db from "./db/db";

export async function createAction(typeName, formData) {
  const type = await getType(typeName);
  const schema = zodSchema(type);
  let item = schema.parse(formData);
  item.type = typeName;

  await db.create(item);

  revalidatePath(`/admin/${typeName}`);
  redirect(`/admin/${typeName}`);
}

export async function updateAction(typeName, formData) {
  const type = await getType(typeName);
  const schema = zodSchema(type);
  let item = schema.parse(formData);
  item.type = typeName;

  await db.update(item);

  revalidatePath(`/admin/${typeName}`);
  redirect(`/admin/${typeName}`);
}

export async function deleteAction(typeName, id) {
  await db.delete(typeName, id);

  revalidatePath(`/admin/${typeName}`);
  redirect(`/admin/${typeName}`);
}
