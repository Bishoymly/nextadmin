"use client";
import inferColumns from "@/lib/types/infer-columns";
import { DataTable } from "./ui/data-table";
import getGridColumns from "@/lib/types/get-grid-columns";

export default function SimpleGrid({ type, data }) {
  let columns = [];
  if (type) {
    columns = getGridColumns(type);
  } else {
    columns = inferColumns(data);
  }

  return <DataTable data={data} columns={columns} />;
}
