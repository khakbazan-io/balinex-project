"use client";
import type { CoinIntroduceCmProps } from "./types";

export const CoinIntroduce: React.FC<CoinIntroduceCmProps> = ({
  text,
  title,
}) => {
  return (
    <div>
      <h2 className="font-semibold text-base mb-1.5">{title}</h2>

      <p className="text-foreground/85 text-sm leading-6">{text}</p>
    </div>
  );
};
