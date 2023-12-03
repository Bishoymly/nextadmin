"use client";
import inferColumns from "@/lib/types/infer-columns";
import { DataTable } from "./data-table/data-table";
import React from "react";
import db from "@/lib/db/db";
import getFilterableColumns from "./data-table/columns/get-filterable-columns";
import getGridColumns from "./data-table/columns/get-grid-columns";
import getSearchableColumns from "./data-table/columns/get-searchable-columns";
import { toast } from "sonner";
import { catchError } from "@/lib/utils";

export default function SimpleGrid({
  typeName,
  type,
  data,
  pageCount,
  totalRowsCount,
}) {
  const [isPending, startTransition] = React.useTransition();
  const [selectedRowIds, setSelectedRowIds] = React.useState([]);

  const columns = React.useMemo(
    () =>
      type
        ? getGridColumns(type, typeName, data, setSelectedRowIds)
        : inferColumns(data),
    [type, typeName, data, setSelectedRowIds]
  );

  function deleteSelectedRows() {
    toast.promise(
      Promise.all(selectedRowIds.map((id) => db.delete(typeName, id))),
      {
        loading: "Deleting...",
        success: () => {
          setSelectedRowIds([]);
          return "Items deleted successfully.";
        },
        error: (err) => {
          setSelectedRowIds([]);
          return catchError(err);
        },
      }
    );
  }

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
      advancedFilter={false}
      filterableColumns={getFilterableColumns(type)}
      searchableColumns={getSearchableColumns(type)}
      floatingBar={false}
      deleteRowsAction={deleteSelectedRows}
      totalRowsCount={totalRowsCount}
    />
  );
}
