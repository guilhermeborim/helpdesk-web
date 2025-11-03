export function CapitalizeFirstLetter(str: string) {
  if (!str) return null;

  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
