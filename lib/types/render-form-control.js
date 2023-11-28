import { Input } from "@/components/ui/input";
import React from "react";
import { formControls } from "../form-controls";

export default function renderFormControl(form, property, field, item) {
  field.form = form;

  if (property.enum) {
    field.items = property.enum;
  }

  if (property.type == "array") {
    if (!item[field.name]) {
      item[field.name] = [];
    }

    if (!field.value) field.value = item[field.name];
    field.data = item[field.name];
    field.items = item[field.name];
    field.type = property.items;
  }

  if (property.type == "object") {
    if (!item[field.name]) {
      item[field.name] = {};
    }

    if (!field.value) field.value = item[field.name];
    field.item = item[field.name];
    field.type = property;
    field.prefix = field.name ? field.name + "." : "";
  }

  const components = formControls.filter(
    (c) =>
      c.type == property.type &&
      c.format == property.format &&
      c.contentMediaType == property.contentMediaType &&
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
