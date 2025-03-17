"use client";
import { Card, CardBody, CardHeader } from "@/core/common";
import type { BoxCmProps } from "./types";

export const Box: React.FC<BoxCmProps> = ({
  title,
  hint,
  isBordered,
  className,
  titleAddon,
  children,
}) => {
  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h3 className="font-bold">{title}</h3>

          {hint ? <p className="text-xs">{hint}</p> : null}
        </div>

        {titleAddon && titleAddon}
      </CardHeader>

      <CardBody>{children}</CardBody>
    </Card>
  );
};
