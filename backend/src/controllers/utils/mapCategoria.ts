
export function mapCategoria(types: string[]): number {
  if (!types) return 2;
  if (types.includes("museum") || types.includes("tourist_attraction")) return 1;
  if (types.includes("park") || types.includes("amusement_park")) return 2;
  if (types.includes("restaurant") || types.includes("cafe") || types.includes("bar")) return 3;
  if (types.includes("lodging")) return 4;
  if (types.includes("natural_feature")) return 5;
  if (types.includes("shopping_mall")) return 6;
  if (types.includes("stadium") || types.includes("gym")) return 7;
  return 2;
}