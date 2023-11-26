import display from "./display";

export default function inferColumns(data) {
  let columns = [];
  if (data && data.length > 0) {
    for (const element in data[0]) {
      if (!element.startsWith("_")) {
        // ignore elements that starts with _
        columns.push({
          accessorKey: element,
          header: display(element),
        });
      }
    }
  }
  return columns;
}
