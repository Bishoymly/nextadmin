import { deleteAction } from "@/lib/actions";
import { DropdownMenuItem } from "./ui/dropdown-menu";

export default function DeleteMenuItem({ typeName, id }) {
  const formDeleteAction = deleteAction.bind(null, typeName, id);
  return (
    <form action={formDeleteAction}>
      <DropdownMenuItem>
        <button className="w-full text-left cursor-default">Delete</button>
      </DropdownMenuItem>
    </form>
  );
}
