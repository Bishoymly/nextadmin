import { z } from "zod";

export default function zodSchema(type) {
  let obj = {
    id: z.string().optional(),
  };

  if (type.jsonSchema?.properties) {
    Object.entries(type.jsonSchema?.properties).forEach(([name, p]) => {
      if (p.format === "date-time") {
        obj[name] = z.date();
      } else {
        obj[name] = z.string();
      }

      if (type.required?.indexOf(name) < 0) {
        obj[name] = obj[name].optional();
      }
    });
  }
  return z.object(obj);
}