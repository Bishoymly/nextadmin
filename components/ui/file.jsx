import { Input } from "./input";

export default function File({ field, ...props }) {
  return <Input type="file" field={field} {...props} />;
}
