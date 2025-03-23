"use client";
import { Fragment, useCallback } from "react";
import { CoinManagementForm } from "../form";
import { Box, SuccessModal } from "@/core/components";
import { useInvalidateQuery, useToggle } from "@/core/hooks";
import { getCoinsListOptions, getCoinsListQueryOptions } from "@/models/coins";
import type { CoinManagementFormType } from "../form/types";

export const NewCoin: React.FC = () => {
  const [isSuccess, toggleSuccess] = useToggle(false);

  const {
    invalidateQuery: refreshCoinsListCache,
    invalidateServerQuery: refreshCoinsListServerCache,
    isInvalidating,
  } = useInvalidateQuery();

  const handleSubmitNewCoin = useCallback(
    async (values: CoinManagementFormType) => {
      try {
        await refreshCoinsListCache(getCoinsListQueryOptions().queryKey);
        await refreshCoinsListServerCache(
          getCoinsListOptions().next?.tags ?? []
        );

        console.log(values);
      } catch (error) {
      } finally {
        toggleSuccess(true);
      }
    },
    [refreshCoinsListCache, refreshCoinsListServerCache]
  );

  return (
    <Fragment>
      <Box
        title="افزودن رمزارز جدید"
        hint="از طریق فرم زیر میتوانید رمزارز جدیدی را ثبت نمایید."
        className="max-w-2xl mx-auto"
      >
        <CoinManagementForm
          isPending={isInvalidating}
          onSubmitAction={handleSubmitNewCoin}
        />
      </Box>

      <SuccessModal
        isOpen={isSuccess}
        onCloseAction={() => toggleSuccess(false)}
        title="رمزارز جدید باموفقیت افزوده شد"
        onCloseRedirectUrl="/"
      />
    </Fragment>
  );
};
