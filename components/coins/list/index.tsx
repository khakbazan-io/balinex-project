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
import Image from "next/image";
import { formatPrice, shimmerPlaceholder } from "@/core/utils";
import { Button, Pagination } from "@/core/common";
import { useMemo, useState } from "react";
import { Tabs, Tab } from "@heroui/tabs";
import { QuotesEnum, QuotesPersianLabel, type Quotes } from "@/types/coins";
import { ChangePercentLabel } from "@/common";
import { useGetCoinsList } from "@/models/coins";
import { usePagination } from "@/core/hooks";

export const CoinsList: React.FC<CoinsListCmProps> = ({ coins }) => {
  const [currency, setCurrency] = useState<Quotes>(QuotesEnum.USDT);

  const { currentPage, pageSize, onPageSelect } = usePagination({
    id: "coinsList",
    isZeroBase: false,
    limit: 10,
  });

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

    return data?.result?.markets?.map((item) => ({
      ...item,
      quotes: {
        ...item?.quotes?.[currency],
      },
    }));
  }, [currency, data]);

  return (
    <div>
      <Tabs
        color="primary"
        selectedKey={currency}
        onSelectionChange={(value) => setCurrency(value as Quotes)}
      >
        <Tab key={QuotesEnum.USDT} title={QuotesPersianLabel.USDT} />
        <Tab key={QuotesEnum.TMN} title={QuotesPersianLabel.TMN} />
      </Tabs>

      <Table
        shadow="none"
        border={1}
        className="pt-3"
        bottomContent={
          <Pagination
            total={data?.result_info?.total_count ?? 0}
            page={currentPage}
            onChange={(page) => onPageSelect(page)}
          />
        }
      >
        <TableHeader>
          <TableColumn>ارز</TableColumn>
          <TableColumn>قیمت</TableColumn>
          <TableColumn>تغییر 24H</TableColumn>
          <TableColumn>بیشترین قیمت 24H</TableColumn>
          <TableColumn>کمترین قیمت 24H</TableColumn>
          <TableColumn width={90}>خرید</TableColumn>
        </TableHeader>

        <TableBody>
          {coinsData?.map((item) => {
            return (
              <TableRow key={item?.enBaseAsset}>
                <TableCell>
                  <div className="flex items-center gap-x-3">
                    <Image
                      src={`https://api.wallex.ir/coins/${item?.baseAsset}.png?w=64&q=75`}
                      className="max-w-full rounded-full object-cover"
                      alt={`${item?.baseAsset} logo`}
                      width={40}
                      height={40}
                      placeholder={shimmerPlaceholder(40, 40)}
                    />

                    <p>{item?.faBaseAsset}</p>

                    <p className="text-foreground/60">{item?.baseAsset}</p>
                  </div>
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
                  <Button
                    color="primary"
                    variant="ghost"
                    size="sm"
                    className="border-1 font-semibold"
                  >
                    خرید/فروش
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
