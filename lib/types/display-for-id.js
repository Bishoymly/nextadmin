export default function displayForId(id) {
  const words = id.split("-");
  return words[words.length - 1];
}
