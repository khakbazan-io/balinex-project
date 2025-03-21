import type { Nullable } from "@/core/types";

export type Quotes = "USDT" | "TMN";

export enum QuotesEnum {
  USDT = "USDT",
  TMN = "TMN",
}

export enum QuotesLabel {
  USDT = "USDT",
  TMN = "IRT",
}

export enum QuotesPersianLabel {
  USDT = "تتر",
  TMN = "تومان",
}

export type CoinQuotes = Record<
  Quotes,
  {
    price: string;
    change24h: string;
    quoteVolume24h: string;
    quotePrecision: number;
    marketCap: string;
    isFavorite: string;
    quoteVolume7d: string;
    quoteVolume30d: string;
    percentChange1h: string;
    percentChange24h: string;
    percentChange7d: string;
    percentChange30d: string;
    ath: string;
    atl: string;
    dailyHighPrice: string;
    dailyLowPrice: string;
    flags: unknown[];
  }
>;

export type CoinCategory = {
  id: number;
  name_fa: string;
  name_en: string;
  priority: number;
};

export type Coin = {
  networkFees: Nullable<string>;
  baseAsset: string;
  enBaseAsset: string;
  faBaseAsset: string;
  isNew: boolean;
  categories: unknown;
  buyCategories: unknown[];
  isInMarket: boolean;
  spotIsNew: boolean;
  otcIsNew: boolean;
  isSpot: boolean;
  isOtc: boolean;
  isMargin: boolean;
  maxLeverage: number;
  leverageStep: number;
  isTmnBased: boolean;
  isUsdtBased: boolean;
  isZeroFee: boolean;
  cratedAt: Nullable<string>;
  buyStatus: "ENABLE" | "DISABLE";
  sellStatus: "ENABLE" | "DISABLE";
  exchangeStatus: "ENABLE" | "DISABLE";
  precision: number;
  isIndex: boolean;
  circulatingSupply: string;
  maxSupply: string;
  totalSupply: string;
  rank: number;
  dominance: number;
  hasAnalysisPage: boolean;
  hasPricePage: boolean;
  isPreLaunch: boolean;
  quotes: CoinQuotes;
};
