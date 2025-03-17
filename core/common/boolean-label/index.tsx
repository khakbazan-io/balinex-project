import {
  TbAlertOctagonFilled,
  TbRosetteDiscountCheckFilled,
} from "react-icons/tb";
import type { BooleanLabelCmProps } from "./types";

export const BooleanLabel: React.FC<BooleanLabelCmProps> = ({
  value,
  text,
}) => {
  if (!value) {
    return (
      <div className="flex items-center gap-x-1">
        <TbAlertOctagonFilled className="text-warning-600" size={19} />

        <p className="text-warning-600 font-medium">{text}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-x-1">
      <TbRosetteDiscountCheckFilled className="text-success-600" size={19} />

      <p className="text-success-600 font-medium">{text}</p>
    </div>
  );
};
