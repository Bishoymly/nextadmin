import { deleteAction } from "@/lib/actions";
import { DropdownMenuItem } from "./ui/dropdown-menu";

export default async function DeleteMenuItem({ typeName, id }) {
  const formDeleteAction = deleteAction.bind(null, typeName, id);
  return (
    <form action={formDeleteAction}>
      <DropdownMenuItem>
        <button>Delete</button>
      </DropdownMenuItem>
    </form>
  );
}
