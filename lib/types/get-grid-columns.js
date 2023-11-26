import Link from "next/link";
import displayForId from "./display-for-id";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import DeleteMenuItem from "@/components/delete-menu-item";
import display from "./display";

export default function getGridColumns(type) {
  let columns = [];
  columns = Object.entries(type.jsonSchema?.properties ?? {}).map(
    ([name, p]) => {
      if (p.type == "string" || p.type == "number") {
        return { accessorKey: name, header: display(name) };
      } else {
        return {
          accessorKey: name,
          header: display(name),
          cell: ({ row }) => "-",
        };
      }
    }
  );

  if (columns.length > 0) {
    columns[0] = {
      ...columns[0],
      cell: ({ row }) => (
        <Link
          className="hover:underline"
          href={`/admin/${type.name}/edit/${row.original.id}`}
        >
          {Array.isArray(row.original[columns[0].accessorKey])
            ? `[${row.original[columns[0].accessorKey].length}]`
            : row.original[columns[0].accessorKey]}
        </Link>
      ),
    };
  } else {
    columns = [
      {
        accessorKey: "id",
        header: "Id",
        cell: ({ row }) => (
          <Link
            className="hover:underline"
            href={`/admin/${type.name}/edit/${row.original.id}`}
          >
            {displayForId(row.getValue("id"))}
          </Link>
        ),
      },
    ];
  }

  columns = [
    ...columns,
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={`/admin/${type.name}/edit/${row.original.id}`}>
                <DropdownMenuItem>Edit</DropdownMenuItem>
              </Link>
              <DeleteMenuItem typeName={type.name} id={row.original.id} />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
}
