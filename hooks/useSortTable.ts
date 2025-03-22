import type { SortDescriptor } from "@heroui/table";
import { useCallback, useState } from "react";

export function useSortTable() {
  const [sortDescriptor, setSortDescriptor] = useState<
    SortDescriptor | undefined
  >(undefined);

  const onSortChange = useCallback((sort: SortDescriptor) => {
    setSortDescriptor(sort);
  }, []);

  return {
    sortDescriptor,
    onSortChange,
  };
}
