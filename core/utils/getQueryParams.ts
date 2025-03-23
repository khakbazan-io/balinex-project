/**
 * Extracts a list of query parameter values from a given `URLSearchParams` instance.
 *
 * Useful when you want to retrieve multiple query values from a URL (e.g. from `searchParams` in Next.js).
 * If a query key does not exist, its value will be `undefined`.
 *
 * @example
 * const searchParams = new URLSearchParams("?page=2&sort=asc");
 * const [page, sort] = getQueryParams(searchParams, ["page", "sort"]);
 * // page = "2", sort = "asc"
 *
 * @param searchParams - The `URLSearchParams` object (e.g., from `useSearchParams()` in Next.js).
 * @param queries - An array of query parameter names to retrieve.
 * @returns An array of values corresponding to the provided keys (in the same order).
 */
export function getQueryParams(
  searchParams: URLSearchParams,
  queries: Array<string>
): Array<string | undefined> {
  const results: Array<string | undefined> = [];

  for (const query of queries) {
    // Use `get` to fetch the value, fallback to undefined if not found
    results.push(searchParams.get(query) ?? undefined);
  }

  return results;
}
