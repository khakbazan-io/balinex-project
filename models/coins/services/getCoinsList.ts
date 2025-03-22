import { ssrQuery } from "@/core/config";
import { getCoinsListOptions } from "../options";
import type { GetCoinsListType } from "../types/getCoinsList";

export async function getCoinsList(options?: GetCoinsListType["options"]) {
  const { onError, onSuccess } = options ?? {};

  try {
    const response = await ssrQuery<GetCoinsListType["response"]>(
      getCoinsListOptions(options)
    );

    onSuccess?.(response);

    return response;
  } catch (error) {
    onError?.(error);

    return undefined;
  }
}
