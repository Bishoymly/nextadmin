import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import display from "@/lib/types/display";
import displayForId from "@/lib/types/display-for-id";
import EditButton from "../edit-button";
import DeleteButton from "../delete-button";

export default function getGridColumns(
  type,
  typeName,
  data,
  setSelectedRowIds,
  options = {
    selectColumn: false,
    actionsColumn: true,
    makeFirstColumnClickable: true,
  }
) {
  let columns = [];
  columns = Object.entries(type.properties ?? {}).map(([name, p]) => {
    if (p.type == "string" || p.type == "number") {
      if (p.format == "uri") {
        return {
          accessorKey: name,
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={display(name)} />
          ),
          cell: ({ row }) => (
            <img src={row.original[name]} className="max-h-10 w-auto" />
          ),
          enableSorting: false,
          enableHiding: true,
        };
      } else if (p.format == "date-time" || p.format == "date") {
        return {
          accessorKey: name,
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={display(name)} />
          ),
          cell: ({ row }) => new Date(row.original[name]).toLocaleDateString(),
          enableSorting: true,
          enableHiding: true,
        };
      } else {
        return {
          accessorKey: name,
          header: ({ column }) => (
            <DataTableColumnHeader column={column} title={display(name)} />
          ),
          enableSorting: true,
          enableHiding: true,
        };
      }
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
  if (options.makeFirstColumnClickable) {
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
  }

  // Select checkboxes
  if (options.selectColumn) {
    columns = [
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
    ];
  }

  // actions at the end
  if (options.actionsColumn) {
    columns.push({
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex flex-row">
            <EditButton href={`/admin/${typeName}/edit/${row.original.id}`} />
            <DeleteButton typeName={typeName} id={row.original.id} />
          </div>
        );
      },
    });
  }

  return columns;
}
