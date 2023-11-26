import { Input } from "./input";

export default function Number({ field, ...props }) {
  return <Input type="number" field={field} {...props} />;
}
