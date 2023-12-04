# Customize Models

## 1. Understand the JSON Schema

Go to the /models folder you will see files like:

- Contact.json
- Post.json
- Task.json

These are files that describe the admin models in [JSON Schema](https://json-schema.org/).

This is an example of one of the files:

```Json
{
  "title": "Task",
  "type": "object",
  "properties": {
    "title": {
      "type": "string",
      "description": "The title of the task."
    },
    "description": {
      "type": "string",
      "description": "The description of the task."
    },
    "status": {
      "type": "string",
      "enum": ["Pending", "In Progress", "Completed"],
      "description": "The status of the task."
    },
    "dueDate": {
      "type": "string",
      "format": "date-time",
      "description": "The due date of the task."
    },
    "assignee": {
      "type": "string",
      "description": "The assignee of the task."
    }
  },
  "required": ["id", "title", "status"]
}
```

Notice in that schema we specify object properties which will be grid columns or form fields.

We specify their [types](https://json-schema.org/draft/2019-09/json-schema-validation#rfc.section.6.1) in javascript like string, number, object, array. A date time is a string with a "date-time" format. Lookup other [formats here](https://json-schema.org/draft/2019-09/json-schema-validation#rfc.section.7.3). Some fields like status is a string but with a specific list to choose from.

We can also specify validations, like which fields are required, and some other [validations](https://json-schema.org/draft/2019-09/json-schema-validation#string) are supported.

## 2. Create a new model

Create a .json file with any name and using Copilot or ChatGPT ask it to generate a json schema for something. Save the file and refresh your browser and you will see that model pages automatically generated in runtime.

## 3. Create your own custom components

Similar to creating new model types by adding new json files in the models folder. We can also create custom components that are rendered for specific field types or formats.

So as you can see generic components from shadcn/ui library are used to handle standard field types. You can see the list of all components used in the file: `/lib/form-controls.js`

```javascript
// /lib/form-controls.js
import FormArray from "@/components/form-array";
import FormObject from "@/components/form-object";
import { DatePicker } from "@/components/ui/date-picker";
import DropDown from "@/components/ui/drop-down";
import File from "@/components/ui/file";
import { Input } from "@/components/ui/input";
import Number from "@/components/ui/number";
import { Textarea } from "@/components/ui/textarea";

export const formControls = [
  { type: "array", component: FormArray },
  { type: "object", component: FormObject },
  { type: "string", has: "enum", component: DropDown },
  { type: "string", format: "uri", component: File },
  { type: "string", format: "date", component: DatePicker },
  { type: "string", format: "date-time", component: DatePicker },
  { type: "string", contentMediaType: "text/html", component: Textarea },
  { type: "number", component: Number },
  { type: "integer", component: Number },
  { type: "string", component: Input },
];
```

In this file you can add your custom components to replace existing field types or formats. Or you can add your own format in your json schema and handle it by a new component (you don't have to stick to only starndard formats as long as you will add it to this list).
