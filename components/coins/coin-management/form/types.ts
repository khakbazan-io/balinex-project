import type { z } from "zod";
import type { coinManagementFormSchema } from "./schema";

export type CoinManagementFormType = z.infer<typeof coinManagementFormSchema>;

export type CoinManagementFormCmProps = {
  onSubmitAction: (values: CoinManagementFormType) => void;
  initialValues?: Partial<CoinManagementFormType>;
  isPending?: boolean;
  initializerPromise?: Promise<CoinManagementFormType>;
  isInitialized?: boolean;
};

export enum CoinManagementFormFields {
  CoinName = "coinName",
  CoinSymbol = "coinSymbol",
  CoinDescription = "coinDescription",
  CoinWebsite = "coinWebsite",
  InitialPrice = "initialPrice",
  BlockchainPlatform = "blockchainPlatform",
  IsActive = "isActive",
}
