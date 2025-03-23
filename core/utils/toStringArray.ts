export function toStringArray(values: unknown[]): string[] {
  return (
    values?.filter(Boolean)?.flatMap((item) => {
      if (Array.isArray(item)) {
        return toStringArray(item);
      }

      if (typeof item === "object" && item !== null) {
        return Object.entries(item).map(([key, value]) => `${key}:${value}`);
      }

      return String(item);
    }) ?? []
  );
}
