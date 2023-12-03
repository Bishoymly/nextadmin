export default function toFilterString(type, searchParams) {
  return Object.entries(type.properties ?? {})
    .filter(([name, p]) => p.type == "string" && searchParams[name])
    .map(([name, p]) => {
      if (p.enum) {
        const options = searchParams[name]
          .split(".")
          .map((p) => `'${p}'`)
          .join(", ");
        return `r.${name} IN (${options})`;
      } else {
        return `CONTAINS(LOWER(r.${name}), '${searchParams[
          name
        ].toLowerCase()}')`;
      }
    })
    .join(" AND ");
}
