"use client";
import inferColumns from "@/lib/types/infer-columns";
import { DataTable } from "./data-table/data-table";
import React from "react";
import getFilterableColumns from "./data-table/columns/get-filterable-columns";
import getGridColumns from "./data-table/columns/get-grid-columns";
import getSearchableColumns from "./data-table/columns/get-searchable-columns";

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

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
      advancedFilter={false}
      filterableColumns={getFilterableColumns(type)}
      searchableColumns={getSearchableColumns(type)}
      floatingBar={false}
      totalRowsCount={totalRowsCount}
    />
  );
}
