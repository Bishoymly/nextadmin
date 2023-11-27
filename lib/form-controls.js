import SimpleGrid from "@/components/simple-grid";
import { DatePicker } from "@/components/ui/date-picker";
import DropDown from "@/components/ui/drop-down";
import File from "@/components/ui/file";
import { Input } from "@/components/ui/input";
import Number from "@/components/ui/number";

export const formControls = [
  { type: "array", component: SimpleGrid },
  { type: "string", has: "enum", component: DropDown },
  { type: "string", format: "uri", component: File },
  { type: "string", format: "date-time", component: DatePicker },
  { type: "number", component: Number },
  { type: "string", component: Input },
];
