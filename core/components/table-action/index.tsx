"use client";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import { TbDotsVertical } from "react-icons/tb";
import type { TableActionCmProps } from "./types";
import { useCallback } from "react";

export function TableAction<T extends string>({
  items,
  onAction,
  customTitles,
}: TableActionCmProps<T>) {
  const handleAction = useCallback(
    (key: string | number) => {
      const actionKey = key as T;
      const actionFn = onAction?.[actionKey];

      if (typeof actionFn === "function") {
        actionFn();
      }
    },
    [onAction]
  );

  return (
    <Dropdown
      shadow="sm"
      radius="sm"
      className="p-0.5 shadow-none border border-divider"
    >
      <DropdownTrigger>
        <Button isIconOnly size="sm" variant="light" aria-label="عملیات بیشتر">
          <TbDotsVertical size={22} className="text-foreground/60" />
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label="منوی عملیات"
        items={items}
        onAction={handleAction}
        emptyContent="موردی یافت نشد"
      >
        {(item) => {
          return (
            <DropdownItem
              key={item.key}
              startContent={item.icon}
              href={item.href}
            >
              {customTitles?.[item.key] ?? item.title}
            </DropdownItem>
          );
        }}
      </DropdownMenu>
    </Dropdown>
  );
}
