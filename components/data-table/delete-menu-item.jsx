import { deleteAction } from "@/lib/actions";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { X } from "lucide-react";

export default function DeleteMenuItem({ typeName, id }) {
  const formDeleteAction = deleteAction.bind(null, typeName, id);
  return (
    <form action={formDeleteAction}>
      <DropdownMenuItem>
        <button className="w-full text-left cursor-default flex flex-row">
          <X className="h-4 w-4 mr-2" /> Delete
        </button>
      </DropdownMenuItem>
    </form>
  );
}
