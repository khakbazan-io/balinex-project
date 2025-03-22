import { useQuery } from "@tanstack/react-query";
import { getCoinsListQueryOptions } from "../options";
import type { GetCoinsListType } from "../types/getCoinsList";

export function useGetCoinsList(options?: GetCoinsListType["queryOptions"]) {
  return useQuery(getCoinsListQueryOptions(options));
}
