import { Switch } from "./switch";

export default function SwitchField({ field, ...props }) {
  return (
    <Switch checked={field.value} onCheckedChange={field.onChange} {...props} />
  );
}
