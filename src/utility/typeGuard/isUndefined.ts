export function isUndefined(targetValue: unknown): targetValue is undefined {
  return typeof targetValue === "undefined";
}
