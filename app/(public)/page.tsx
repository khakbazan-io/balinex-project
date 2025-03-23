import { HighlightableText } from "@/common";
import { CoinsList } from "@/components/coins";
import { generateMeta } from "@/core/utils";
import { getCoinsList } from "@/models/coins";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generateMeta({
    title: "خانه",
    description: "خانه",
  });
}

export default async function HomePage() {
  const coinsList = await getCoinsList({
    params: {
      pagination: {
        page: 1,
        per_page: 10,
      },
    },
  });

  return (
    <div className="space-y-4">
      <CoinsList coins={coinsList} />

      <HighlightableText
        title="بیتکوین چیست ؟"
        text="بیت کوین اولین ارز دیجیتال است که به جهان معرفی شد و انقلابی را در اقتصاد و امور مالی جهان آغاز کرد. زمانی که بیت کوین کار خود را آغاز کرد، هیچ‌کسی فکرش را هم نمی‌کرد که این نوآوری باعث ایجاد چه تحولاتی خواهد شد. خیلی‌ها در این سال‌ها مرگ زودهنگام بیت کوین را پیش‌بینی کردند، اما آنچه اتفاق افتاد این بود که پادشاه ارزهای دیجیتال آمده بود که بماند.
در این مقاله، تلاش کرده‌ایم تا آموزش بیت کوین را به زبان ساده و به‌اختصار توضیح دهیم. اگر شما هم درباره پادشاه ارزهای دیجیتال کنجکاو هستید و می‌خواهید بدانید بیت کوین چه ویژگی‌هایی دارد، چگونه ذخیره می‌شود و چه کسی آن را کنترل می‌کند، ویدئو زیر را ببینید و تا انتهای این مقاله با ما همراه باشید تا به پاسخ پرسش‌های خود برسید."
      />
    </div>
  );
}
