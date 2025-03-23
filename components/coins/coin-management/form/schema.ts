import { z } from "zod";

export const coinManagementFormSchema = z.object({
  coinName: z
    .string()
    .min(2, "نام رمزارز کوچک تر از حد مجاز است")
    .max(50, "نام رمزارز بزرگتر از حد مجاز است"),
  coinSymbol: z
    .string()
    .min(3, "نماد رمزارز باید حداقل شامل سه حرف باشد")
    .max(5, "نماد رمزارز نباید بیش از 5 حرف باشد")
    .regex(/^[A-Z]+$/, "نماد را به حروف انگلیسی و بصورت Upper Case وارد کنید"),
  coinDescription: z
    .string()
    .max(500, "توضیحات نمیتواند بیش از 500 حرف باشد.")
    .optional(),
  coinWebsite: z
    .string()
    .min(1, "آدرس وبسایت رمزارز را وارد کنید")
    .url("آدرس وبسایت را به درستی و با https:// وارد کنید")
    .optional(),
  initialPrice: z
    .number({ message: "قیمت اولیه رمزارز را وارد کنید" })
    .positive("قیمت وارد شده اشتباه است"),
  blockchainPlatform: z.string().min(1, "بلاکچین رمزارز را انتخاب نمایید."),
});
