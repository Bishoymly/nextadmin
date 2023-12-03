import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PenSquare, X } from "lucide-react";
import DeleteMenuItem from "@/components/data-table/delete-menu-item";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import display from "@/lib/types/display";
import displayForId from "@/lib/types/display-for-id";

export default function getGridColumns(
  type,
  typeName,
  data,
  setSelectedRowIds
) {
  let columns = [];
  columns = Object.entries(type.properties ?? {}).map(([name, p]) => {
    if (p.type == "string" || p.type == "number") {
      return {
        accessorKey: name,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={display(name)} />
        ),
        enableSorting: true,
        enableHiding: true,
      };
    } else {
      return {
        accessorKey: name,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={display(name)} />
        ),
        cell: ({ row }) => "-",
        enableSorting: false,
        enableHiding: true,
      };
    }
  });

  //Make the first column as link
  if (columns.length > 0) {
    const name = columns[0].accessorKey;
    columns[0] = {
      ...columns[0],
      cell: ({ row }) => (
        <Link
          className="hover:underline"
          href={`/admin/${typeName}/edit/${row.original.id}`}
        >
          {Array.isArray(row.original[name])
            ? `[${row.original[name].length}]`
            : row.original[name]}
        </Link>
      ),
      enableHiding: false,
    };
  } else {
    columns = [
      {
        accessorKey: "id",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title={"Id"} />
        ),
        cell: ({ row }) => (
          <Link
            className="hover:underline"
            href={`/admin/${typeName}/edit/${row.original.id}`}
          >
            {displayForId(row.getValue("id"))}
          </Link>
        ),
        enableHiding: false,
      },
    ];
  }

  columns = [
    // Select checkboxes
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => {
            table.toggleAllPageRowsSelected(!!value);
            setSelectedRowIds((prev) =>
              prev.length === data.length ? [] : data.map((row) => row.id)
            );
          }}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            row.toggleSelected(!!value);
            setSelectedRowIds((prev) =>
              value
                ? [...prev, row.original.id]
                : prev.filter((id) => id !== row.original.id)
            );
          }}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...columns,
    // actions at the end
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
              <Link href={`/admin/${typeName}/edit/${row.original.id}`}>
                <DropdownMenuItem>
                  <PenSquare className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
              </Link>
              <DeleteMenuItem typeName={typeName} id={row.original.id} />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
}
