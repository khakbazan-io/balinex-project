import type { SsrQueryOptions } from "@/core/config";
import type { SsrQueryOptionsWithCallbacks } from "@/core/config/ssrQuery";
import type { Coin, CoinCategory } from "@/types/coins";
import type { PaginationResponse } from "@/types/pagination";

export type GetCoinsListType = {
  options: SsrQueryOptionsWithCallbacks<GetCoinsListType["response"]>;
  response: {
    result: {
      markets: Coin[];
      categories: CoinCategory[];
    };
    message: string;
    success: boolean;
    result_info: PaginationResponse;
  };
};
