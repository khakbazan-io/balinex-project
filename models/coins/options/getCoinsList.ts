import { ssrQueryOptions } from "@/core/config";
import type { GetCoinsListType } from "../types/getCoinsList";

export function getCoinsListOptions(options?: GetCoinsListType["options"]) {
  const { onError, onSuccess, ...restOptions } = options ?? {};

  return ssrQueryOptions({
    url: "/coins/list",
    method: "GET",
    next: {
      tags: ["coinsList"],
      revalidate: 84000,
    },
    isInternalRequest: true,
    ...restOptions,
  });
}
