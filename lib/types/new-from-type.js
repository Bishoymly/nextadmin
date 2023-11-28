export default function newFromType(type) {
  switch (type) {
    case "string":
      return "";
    case "number":
      return 0;
    case "object":
      return {};
    case "array":
      return [];
  }
}
