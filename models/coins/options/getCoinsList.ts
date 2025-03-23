import { api, site, ssrQueryOptions } from "@/core/config";
import type { GetCoinsListType } from "../types/getCoinsList";
import { queryOptions } from "@tanstack/react-query";
import { toStringArray, urlWithParams } from "@/core/utils";

export function getCoinsListOptions(options?: GetCoinsListType["options"]) {
  const { onError, onSuccess, params, ...restOptions } = options ?? {};

  return ssrQueryOptions({
    url: urlWithParams("/coins/list", {
      ...params?.pagination,
      ...params?.filters,
    }),
    method: "GET",

    next: {
      tags: toStringArray(["coinsList", params?.pagination, params?.filters]),
      revalidate: 84000,
    },
    isInternalRequest: true,
    ...restOptions,
  });
}

export function getCoinsListQueryOptions(
  options?: GetCoinsListType["queryOptions"]
) {
  const { params, ...restOptions } = options ?? {};

  return queryOptions<GetCoinsListType["response"]>({
    queryKey: ["coinsList", params?.pagination, params?.filters],
    queryFn: async () => {
      const url = urlWithParams("/coins/list", {
        ...params?.pagination,
        ...params?.filters,
      });

      const response = await api.get(url, {
        baseURL: site.apiUrl.local,
      });

      return response?.data;
    },
    ...restOptions,
  });
}
