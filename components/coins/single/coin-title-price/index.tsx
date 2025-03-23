"use client";
import Image from "next/image";
import type { CoinTitlePriceCmProps } from "./types";
import { formatPrice, shimmerPlaceholder } from "@/core/utils";
import { ChangePercentLabel } from "@/common";

export const CoinTitlePrice: React.FC<CoinTitlePriceCmProps> = ({
  baseAsset,
  faBaseAsset,
  price,
  changePercent24h,
}) => {
  return (
    <div>
      <div className="flex items-center gap-x-3">
        <Image
          src={`https://api.wallex.ir/coins/${baseAsset}.png?w=64&q=75`}
          className="max-w-full rounded-full object-cover"
          alt={`${baseAsset} logo`}
          width={55}
          height={55}
          placeholder={shimmerPlaceholder(55, 55)}
        />

        <h1 className="text-xl font-bold">{`قیمت ${faBaseAsset}`}</h1>

        <p className="text-foreground/60 font-medium mt-2">{baseAsset}</p>
      </div>

      <div className="bg-content1 p-5 rounded-lg mt-5">
        <div className="flex items-center justify-between">
          <p className="text-foreground/70 text-sm">آخرین قیمت {faBaseAsset}</p>

          <ChangePercentLabel percent={changePercent24h} />
        </div>

        <div className="mt-4">
          <p className="text-2xl font-medium mt-2">
            {formatPrice(price?.toman)}
            <span className="text-sm text-foreground/70 px-1.5">تومان</span>
          </p>

          <p className="text-xl font-medium mt-2">
            {formatPrice(price?.usdt)}
            <span className="text-sm text-foreground/70 px-1.5">تتر</span>
          </p>
        </div>
      </div>
    </div>
  );
};
