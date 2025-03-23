"use client";
import { Card, CardBody, CardHeader } from "@/core/common";
import type { BoxCmProps } from "./types";
import clsx from "clsx";

export const Box: React.FC<BoxCmProps> = ({
  title,
  hint,
  isBordered,
  className,
  titleAddon,
  children,
}) => {
  return (
    <div className={clsx("bg-content1 p-4 rounded-lg space-y-5", className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h3 className="font-bold">{title}</h3>

          {hint ? <p className="text-xs">{hint}</p> : null}
        </div>

        {titleAddon && titleAddon}
      </div>

      <div>{children}</div>
    </div>
  );
};
