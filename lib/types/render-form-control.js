import SimpleGrid from "@/components/simple-grid";
import { DatePicker } from "@/components/ui/date-picker";
import DropDown from "@/components/ui/drop-down";
import File from "@/components/ui/file";
import { Input } from "@/components/ui/input";
import Number from "@/components/ui/number";
import React from "react";

export default function renderFormControl(property, field, item) {
  if (property.enum) {
    field.items = property.enum;
  }

  if (property.type == "array") {
    if (!item[field.name]) {
      item[field.name] = [];
    }

    if (!field.value) field.value = item[field.name];
    field.data = item[field.name];
  }

  const components = formControls.filter(
    (c) =>
      c.type == property.type &&
      c.format == property.format &&
      (!c.has || property[c.has])
  );
  if (components.length == 0) {
    console.log(
      `Can't find a suitable component to render (${
        field.name
      } ${JSON.stringify(property)}), using default input`
    );

    components.push({ component: Input });
  }

  return React.createElement(components[0].component, {
    field,
    ...field,
  });
}

export const formControls = [
  { type: "array", component: SimpleGrid },
  { type: "string", has: "enum", component: DropDown },
  { type: "string", format: "uri", component: File },
  { type: "string", format: "date-time", component: DatePicker },
  { type: "number", component: Number },
  { type: "string", component: Input },
];
