import display from "@/lib/types/display";

export default function getSearchableColumns(type) {
  return Object.entries(type.properties ?? {})
    .filter(([name, p]) => p.type === "string" && !p.format && !p.enum)
    .map(([name, p]) => {
      return {
        id: name,
        title: display(name),
      };
    });
}
