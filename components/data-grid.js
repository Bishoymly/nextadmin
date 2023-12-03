import db from "@/lib/db/db";
import SimpleGrid from "./simple-grid";
import toFilterString from "./data-table/columns/to-filter-string";

export default async function DataGrid({ searchParams, typeName, type }) {
  const { page, per_page, sort } = searchParams;

  // Fallback page for invalid page numbers
  const pageAsNumber = Number(page);
  const fallbackPage =
    isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber;
  // Number of items per page
  const perPageAsNumber = Number(per_page);
  const limit = isNaN(perPageAsNumber) ? 10 : perPageAsNumber;
  // Number of items to skip
  const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0;

  // Query database
  const { rows, totalRowsCount } = await db.queryWithFiltersAndPaging(
    typeName,
    "*",
    toFilterString(type, searchParams),
    sort?.replace(".", " "),
    fallbackPage,
    limit
  );

  const pageCount = Math.ceil(totalRowsCount / limit);

  return (
    <SimpleGrid
      type={type}
      typeName={typeName}
      data={rows}
      pageCount={pageCount}
      totalRowsCount={totalRowsCount}
    />
  );
}
