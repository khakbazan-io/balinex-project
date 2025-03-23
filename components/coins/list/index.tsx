"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import type { CoinsListCmProps } from "./types";
import { formatPrice } from "@/core/utils";
import { Button, Pagination } from "@/core/common";
import { useCallback, useMemo, useState } from "react";
import { Tabs, Tab } from "@heroui/tabs";
import { QuotesEnum, QuotesPersianLabel, type Quotes } from "@/types/coins";
import { ChangePercentLabel } from "@/common";
import { useGetCoinsList } from "@/models/coins";
import { usePagination } from "@/core/hooks";
import { TableAction, TableEmpty, TableLoading } from "@/core/components";
import { useSortTable } from "@/hooks";
import { TbPlus } from "react-icons/tb";
import Link from "next/link";
import { coinsListActions } from "./constants";
import { useRouter } from "next/navigation";
import { CoinName } from "../coin-name";

export const CoinsList: React.FC<CoinsListCmProps> = ({ coins }) => {
  const router = useRouter();

  const [currency, setCurrency] = useState<Quotes>(QuotesEnum.USDT);

  const { currentPage, pageSize, onPageSelect } = usePagination({
    id: "coinsList",
    isZeroBase: false,
    limit: 10,
  });

  const { sortDescriptor, onSortChange } = useSortTable();

  const { data, isFetching } = useGetCoinsList({
    params: {
      pagination: {
        page: currentPage,
        per_page: pageSize,
      },
    },
    initialData: () => {
      if (currentPage !== 1) {
        return undefined;
      }

      return coins;
    },
  });

  const coinsData = useMemo(() => {
    if (!data || !data?.result?.markets?.length) {
      return [];
    }

    const result = data.result.markets.map((item) => ({
      ...item,
      quotes: item.quotes?.[currency],
    }));

    if (!sortDescriptor) {
      return result;
    }

    return [...result].sort((a, b) => {
      const valueA = Number(a.quotes?.percentChange24h) || 0;
      const valueB = Number(b.quotes?.percentChange24h) || 0;

      return sortDescriptor.direction === "ascending"
        ? valueA - valueB
        : valueB - valueA;
    });
  }, [currency, data, sortDescriptor]);

  const handleViewCoin = useCallback(
    (href: string) => {
      router.push(href);
    },
    [router]
  );

  return (
    <div>
      <div className="flex items-center justify-between gap-2">
        <Tabs
          color="primary"
          selectedKey={currency}
          onSelectionChange={(value) => setCurrency(value as Quotes)}
        >
          <Tab key={QuotesEnum.USDT} title={QuotesPersianLabel.USDT} />
          <Tab key={QuotesEnum.TMN} title={QuotesPersianLabel.TMN} />
        </Tabs>

        <Link href="/new-coin">
          <Button size="sm" startContent={<TbPlus size={17} />} color="primary">
            رمزارز جدید
          </Button>
        </Link>
      </div>

      <Table
        shadow="none"
        border={1}
        className="pt-3"
        selectionMode="single"
        classNames={{
          emptyWrapper: "h-[550px]",
          loadingWrapper: "h-[550px]",
        }}
        bottomContent={
          <Pagination
            total={data?.result_info?.total_count ?? 0}
            page={currentPage}
            onChange={(page) => onPageSelect(page)}
          />
        }
        sortDescriptor={sortDescriptor}
        onSortChange={onSortChange}
      >
        <TableHeader>
          <TableColumn>ارز</TableColumn>

          <TableColumn>قیمت</TableColumn>

          <TableColumn key="change" allowsSorting>
            تغییر 24H
          </TableColumn>

          <TableColumn>بیشترین قیمت 24H</TableColumn>

          <TableColumn>کمترین قیمت 24H</TableColumn>

          <TableColumn width={50}>خرید</TableColumn>
        </TableHeader>

        <TableBody
          isLoading={isFetching}
          loadingContent={<TableLoading />}
          emptyContent={<TableEmpty />}
        >
          {coinsData?.map((item) => {
            const singleCoinPageHref = `/coins/${item?.baseAsset.toLowerCase()}`;

            return (
              <TableRow
                className="cursor-pointer"
                href={singleCoinPageHref}
                key={item?.enBaseAsset}
              >
                <TableCell>
                  <CoinName
                    baseAsset={item?.baseAsset}
                    faBaseAsset={item?.faBaseAsset}
                  />
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-x-1">
                    <p>{formatPrice(item?.quotes?.price)}</p>

                    <p className="text-xs font-medium text-foreground/60">
                      {QuotesPersianLabel[currency]}
                    </p>
                  </div>
                </TableCell>

                <TableCell>
                  <ChangePercentLabel
                    percent={Number(item?.quotes?.percentChange24h)}
                  />
                </TableCell>

                <TableCell>
                  {formatPrice(item?.quotes?.dailyHighPrice)}
                </TableCell>

                <TableCell>
                  {formatPrice(item?.quotes?.dailyLowPrice)}
                </TableCell>

                <TableCell>
                  <TableAction
                    items={coinsListActions}
                    onAction={{
                      view: () => handleViewCoin(singleCoinPageHref),
                    }}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
