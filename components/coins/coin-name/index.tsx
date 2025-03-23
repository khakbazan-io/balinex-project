"use client";
import { shimmerPlaceholder } from "@/core/utils";
import Image from "next/image";
import type { CoinNameCmProps } from "./types";

export const CoinName: React.FC<CoinNameCmProps> = ({
  baseAsset,
  faBaseAsset,
}) => {
  return (
    <div className="flex items-center gap-x-3">
      <Image
        src={`https://api.wallex.ir/coins/${baseAsset}.png?w=64&q=75`}
        className="max-w-full rounded-full object-cover"
        alt={`${baseAsset} logo`}
        width={40}
        height={40}
        placeholder={shimmerPlaceholder(40, 40)}
      />

      <p>{faBaseAsset}</p>

      <p className="text-foreground/60">{baseAsset}</p>
    </div>
  );
};
