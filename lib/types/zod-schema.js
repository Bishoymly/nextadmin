import { z } from "zod";

export default function zodSchema(type) {
  let obj = {
    id: z.string().optional(),
  };

  if (type.properties) {
    Object.entries(type.properties).forEach(([name, p]) => {
      if (p.type === "string") {
        if (p.format === "date-time" || p.format === "date") {
          obj[name] = z.date();
        } else {
          obj[name] = z.string();
        }
      }

      if (obj[name] && type.required?.indexOf(name) < 0) {
        obj[name] = obj[name].optional();
      }
    });
  }
  return z.object(obj);
}
