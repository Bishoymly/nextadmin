import fs from "fs";
import path from "path";
import preloadType from "./preload-type";

export async function getType(typeName) {
  const filePath = path.join(process.cwd(), "models", `${typeName}.json`);
  const data = fs.readFileSync(filePath, "utf-8");
  let type = JSON.parse(data);
  await preloadType(type);
  return type;
}

export async function getAllTypes() {
  const modelsPath = path.join(process.cwd(), "models");
  const files = fs.readdirSync(modelsPath);
  const types = files.map((file) => file.replace(".json", ""));
  return types;
}
