"use client";
import {
  ControlledInput,
  ControlledNumberInput,
  ControlledSelect,
  ControlledTextarea,
  Form,
} from "@/core/components/form";
import { useForm } from "react-hook-form";
import {
  CoinManagementFormFields,
  type CoinManagementFormCmProps,
  type CoinManagementFormType,
} from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { coinManagementFormSchema } from "./schema";
import { Button } from "@/core/common";
import { blockchainsOptions } from "./constants";
import { Skeleton } from "@heroui/skeleton";
import Link from "next/link";

export const CoinManagementForm: React.FC<CoinManagementFormCmProps> = ({
  onSubmitAction,
  initialValues,
  initializerPromise,
  isInitialized = true,
  isPending,
}) => {
  const form = useForm<CoinManagementFormType>({
    resolver: zodResolver(coinManagementFormSchema),

    defaultValues: async () => {
      /**
       * Since React Hook Form doesn't allow directly setting async-derived values in `defaultValues`,
       * you must provide a `defaultValues` function that returns a Promise resolving to your initial data.
       *
       * You can either define this async function manually, or simplify the process by using
       * the `useDataPromise` hook — which generates a compatible promise function
       * based on your data.
       */
      if (initializerPromise) {
        return initializerPromise
          .then((res) => ({
            coinName: res?.coinName ?? "",
            coinSymbol: res?.coinSymbol ?? "",
            coinWebsite: res?.coinWebsite ?? "",
            initialPrice: res?.initialPrice ?? 1,
            blockchainPlatform: res?.blockchainPlatform ?? "",
            coinDescription: res?.coinDescription ?? "",
          }))
          .catch(() => ({
            coinName: initialValues?.coinName ?? "",
            coinSymbol: initialValues?.coinSymbol ?? "",
            coinWebsite: initialValues?.coinWebsite ?? "",
            initialPrice: initialValues?.initialPrice ?? 1,
            blockchainPlatform: initialValues?.blockchainPlatform ?? "",
            coinDescription: initialValues?.coinDescription ?? "",
          }));
      }

      return {
        coinName: initialValues?.coinName ?? "",
        coinSymbol: initialValues?.coinSymbol ?? "",
        coinWebsite: initialValues?.coinWebsite ?? "",
        initialPrice: initialValues?.initialPrice ?? 1,
        blockchainPlatform: initialValues?.blockchainPlatform ?? "",
        coinDescription: initialValues?.coinDescription ?? "",
      };
    },
  });

  return (
    <Form {...form} onSubmit={form.handleSubmit(onSubmitAction)}>
      <div className="space-y-4">
        <Skeleton isLoaded={isInitialized} className="rounded-lg">
          <ControlledInput
            name={CoinManagementFormFields.CoinName}
            label="نام رمزارز"
            variant="bordered"
            size="sm"
          />
        </Skeleton>

        <Skeleton isLoaded={isInitialized} className="rounded-lg">
          <ControlledInput
            name={CoinManagementFormFields.CoinSymbol}
            label="نماد رمزارز"
            variant="bordered"
            size="sm"
          />
        </Skeleton>

        <Skeleton isLoaded={isInitialized} className="rounded-lg">
          <ControlledInput
            name={CoinManagementFormFields.CoinWebsite}
            label="وبسایت رمزارز"
            variant="bordered"
            size="sm"
          />
        </Skeleton>

        <Skeleton isLoaded={isInitialized} className="rounded-lg">
          <ControlledNumberInput
            name={CoinManagementFormFields.InitialPrice}
            label="قیمت اولیه"
            variant="bordered"
            size="sm"
            min={0}
          />
        </Skeleton>

        <Skeleton isLoaded={isInitialized} className="rounded-lg">
          <ControlledSelect
            name={CoinManagementFormFields.BlockchainPlatform}
            label="بلاکچین"
            options={blockchainsOptions}
            size="sm"
            offlineSearch
          />
        </Skeleton>

        <Skeleton isLoaded={isInitialized} className="rounded-lg">
          <ControlledTextarea
            name={CoinManagementFormFields.CoinDescription}
            label="توضیحات"
            variant="bordered"
            size="sm"
          />
        </Skeleton>

        <div className="grid grid-cols-12 gap-3 pt-5">
          <div className="col-span-4">
            <Skeleton isLoaded={isInitialized} className="rounded-lg">
              <Link href="/" className="block w-full">
                <Button type="button" fullWidth>
                  انصراف
                </Button>
              </Link>
            </Skeleton>
          </div>

          <div className="col-span-8">
            <Skeleton isLoaded={isInitialized} className="rounded-lg">
              <Button
                isLoading={isPending}
                type="submit"
                color="primary"
                fullWidth
              >
                {initialValues || initializerPromise
                  ? "ویرایش رمزارز"
                  : "افزودن رمزارز"}
              </Button>
            </Skeleton>
          </div>
        </div>
      </div>
    </Form>
  );
};
