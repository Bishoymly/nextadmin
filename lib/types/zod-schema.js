import { z } from "zod";

export default function zodSchema(type) {
  let obj = {
    id: z.string().optional(),
  };

  if (type.properties) {
    Object.entries(type.properties).forEach(([name, p]) => {
      if (p.type === "string") {
        if (p.format === "date-time" || p.format === "date") {
          obj[name] = z.coerce.date();
        } else {
          obj[name] = z.string();
        }
      } else if (p.type === "number") {
        obj[name] = z
          .string()
          .refine((val) => !Number.isNaN(parseInt(val, 10)), {
            message: "Expected number, received a string",
          });
      } else if (p.type === "integer") {
        obj[name] = z.coerce.number().int();
      } else if (p.type === "boolean") {
        obj[name] = z.boolean();
      } else if (p.type === "array") {
        if (p.items.type === "string") {
          obj[name] = z.array(z.string());
        } else if (p.items.type === "number") {
          obj[name] = z.array(z.coerce.number());
        } else if (p.items.type === "integer") {
          obj[name] = z.array(z.number().int());
        } else if (p.items.type === "boolean") {
          obj[name] = z.array(z.boolean());
        } else {
          obj[name] = z.array(zodSchema(p.items));
        }
      } else if (p.type === "object") {
        obj[name] = zodSchema(p);
      }

      if (obj[name] && type.required?.indexOf(name) < 0) {
        obj[name] = obj[name].optional();
      }
    });
  }
  return z.object(obj);
}
