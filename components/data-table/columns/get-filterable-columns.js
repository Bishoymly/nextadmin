import display from "@/lib/types/display";

export default function getFilterableColumns(type) {
  return Object.entries(type.properties ?? {})
    .filter(([name, p]) => p.enum)
    .map(([name, p]) => {
      return {
        id: name,
        title: display(name),
        options: p.enum.map((item) => ({
          label: display(item),
          value: item,
        })),
      };
    });
}
