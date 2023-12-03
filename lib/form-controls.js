import FormArray from "@/components/form-array";
import FormObject from "@/components/form-object";
import SimpleGrid from "@/components/simple-grid";
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
