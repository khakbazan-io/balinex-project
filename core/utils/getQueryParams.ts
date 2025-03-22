export function getQueryParams(
  searchParams: URLSearchParams,
  queries: Array<string>
) {
  const results = [];

  for (const query of queries) {
    results.push(searchParams.get(String(query)) ?? undefined);
  }

  return results;
}
