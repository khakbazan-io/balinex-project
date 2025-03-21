import clsx from "clsx";
import type { ChangePercentLabelCmProps } from "./types";

export const ChangePercentLabel: React.FC<ChangePercentLabelCmProps> = ({
  percent,
}) => {
  if (isNaN(percent)) {
    return <span className="ltr inline-block">-</span>;
  }

  return (
    <span
      className={clsx(
        "ltr inline-block",
        percent > 0 ? "text-success" : "text-danger"
      )}
    >{`${percent > 0 ? "+" : ""}${percent}%`}</span>
  );
};
