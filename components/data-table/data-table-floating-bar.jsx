"use client";

import {
  ArrowUpIcon,
  CheckCircledIcon,
  Cross2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { SelectTrigger } from "@radix-ui/react-select";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

export function DataTableFloatingBar({
  table,
  deleteRowsAction,
  className,
  ...props
}) {
  if (table.getFilteredSelectedRowModel().rows.length <= 0) return null;

  function updateTasksStatus(table, status) {
    const selectedRows = table.getFilteredSelectedRowModel().rows;

    selectedRows.map(async (row) => {
      await updateTaskStatus({
        id: row.original.id,
        status: status,
      });
    });
  }

  function updateTasksPriority(table, priority) {
    const selectedRows = table.getFilteredSelectedRowModel().rows;

    selectedRows.map(async (row) => {
      await updateTaskPriority({
        id: row.original.id,
        priority: priority,
      });
    });
  }

  return (
    <div
      className={cn(
        "mx-auto flex w-fit items-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-white",
        className
      )}
      {...props}
    >
      <Button
        aria-label="Clear selection"
        title="Clear"
        className="h-auto bg-transparent p-1 text-white hover:bg-zinc-700"
        onClick={() => table.toggleAllRowsSelected(false)}
      >
        <Cross2Icon className="h-4 w-4" aria-hidden="true" />
      </Button>
      {table.getFilteredSelectedRowModel().rows.length} row(s) selected
      <Button
        aria-label="Change status of selected rows"
        title="Delete"
        className="h-auto bg-transparent p-1 text-white hover:bg-zinc-700"
        onClick={(event) => {
          table.toggleAllPageRowsSelected(false);
          deleteRowsAction?.(event);
        }}
      >
        <TrashIcon className="h-4 w-4" aria-hidden="true" />
      </Button>
    </div>
  );
}
