import type { TableActionItem } from "@/core/components";
import { TbEye } from "react-icons/tb";

export const coinsListActions: TableActionItem<"view">[] = [
  {
    key: "view",
    title: "مشاهده",
    icon: <TbEye size={17} />,
  },
];
