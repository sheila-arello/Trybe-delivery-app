export default function convert(value) {
  const converted = parseFloat(value).toFixed(2).replace('.', ',');
  return converted;
}
