import { api, site, ssrQueryOptions } from "@/core/config";
import type { GetCoinsListType } from "../types/getCoinsList";
import { queryOptions } from "@tanstack/react-query";
import { urlWithParams } from "@/core/utils";

export function getCoinsListOptions(options?: GetCoinsListType["options"]) {
  const { onError, onSuccess, params, ...restOptions } = options ?? {};

  return ssrQueryOptions({
    url: urlWithParams("/coins/list", {
      ...params?.pagination,
    }),
    method: "GET",
    next: {
      tags: ["coinsList"],
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

  console.log({ params });

  return queryOptions<GetCoinsListType["response"]>({
    queryKey: ["coinsList", params?.pagination],
    queryFn: async () => {
      const url = urlWithParams("/coins/list", {
        ...params?.pagination,
      });

      const response = await api.get(url, {
        baseURL: site.apiUrl.local,
      });

      return response?.data;
    },
    ...restOptions,
  });
}
