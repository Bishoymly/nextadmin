import db from "../db/db";

export default async function preloadType(type) {
  for (let prop in type.properties) {
    if (type.properties[prop].hasOwnProperty("source")) {
      const sourceWords = type.properties[prop].source.split(".");
      const sourceTypeName = sourceWords[0];
      let sourceProperty = "id";
      if (sourceWords.length > 1) {
        sourceProperty = sourceWords[1];
      }

      const items = await db.getItemsByType(sourceTypeName);
      type.properties[prop].enum = items.map((item) => item[sourceProperty]);
      delete type.properties[prop].source;
    }
  }
}
