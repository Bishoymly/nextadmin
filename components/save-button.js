import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export default function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending}>
      Save
    </Button>
  );
}
