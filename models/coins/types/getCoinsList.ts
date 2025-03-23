import type { SsrQueryOptionsWithCallbacks } from "@/core/config/ssrQuery";
import type { QueryOptionsParams } from "@/core/types";
import type { Coin, CoinCategory } from "@/types/coins";
import type { PaginationParams, PaginationResponse } from "@/types/pagination";

export type GetCoinsListResponse = {
  result: {
    markets: Coin[];
    categories: CoinCategory[];
  };
  message: string;
  success: boolean;
  result_info: PaginationResponse;
};

export type GetCoinsListParams = {
  params?: {
    pagination?: PaginationParams;
    filters?: {
      key?: string;
    };
  };
};

export type GetCoinsListType = {
  queryOptions: QueryOptionsParams<
    GetCoinsListType["response"],
    GetCoinsListParams
  >;
  options: Partial<
    SsrQueryOptionsWithCallbacks<GetCoinsListType["response"]> &
      GetCoinsListParams
  >;
  response: GetCoinsListResponse;
};
