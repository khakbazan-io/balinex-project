import clsx from "clsx";
import { useMemo } from "react";
import type { ChangePercentLabelCmProps } from "./types";

export const ChangePercentLabel: React.FC<ChangePercentLabelCmProps> = ({
  percent,
}) => {
  const { isValid, formatted, isPositive, ariaLabel } = useMemo(() => {
    const valid = typeof percent === "number" && !isNaN(percent);

    if (!valid) {
      return {
        isValid: false,
        formatted: "-",
        isPositive: false,
        ariaLabel: "مقدار نامعتبر",
      };
    }

    const positive = percent > 0;
    const formattedValue = `${positive ? "+" : ""}${percent}%`;

    const label =
      percent === 0
        ? "بدون تغییر"
        : `${positive ? "مثبت" : "منفی"} ${Math.abs(percent)} درصد`;

    return {
      isValid: true,
      formatted: formattedValue,
      isPositive: positive,
      ariaLabel: label,
    };
  }, [percent]);

  return (
    <span
      dir="ltr"
      className={clsx(
        "inline-block",
        isValid && (isPositive ? "text-success" : "text-danger")
      )}
      aria-label={ariaLabel}
    >
      {formatted}
    </span>
  );
};
