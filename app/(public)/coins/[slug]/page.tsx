import { CoinTitlePrice } from "@/components/coins";
import { CoinIntroduce } from "@/components/coins/single";
import {
  generateBreadcrumbSchema,
  generateCoinSchema,
  generateMeta,
  toIsoDate,
} from "@/core/utils";
import { getCoinsList } from "@/models/coins";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug;

  const coin = await getCoinsList({
    params: {
      filters: {
        key: slug,
      },
    },
  });

  const [coinDetail] = coin?.result?.markets ?? [];

  return generateMeta({
    title: `قیمت ${coinDetail?.faBaseAsset}`,
    description: `قیمت ${coinDetail?.faBaseAsset}`,
    keywords: [
      `قیمت ${coinDetail?.faBaseAsset}`,
      `قیمت ${coinDetail?.enBaseAsset}`,
      `قیمت ${coinDetail?.baseAsset}`,
    ],
    slug: `coins/${coinDetail?.baseAsset?.toLowerCase()}`,
    publishedTime: toIsoDate(Date.now()), // there is no date in this api, so i use Date.now()
    modifiedTime: toIsoDate(Date.now()), // there is no date in this api, so i use Date.now()
    type: "article",
    tags: [
      coinDetail?.faBaseAsset,
      coinDetail?.enBaseAsset,
      coinDetail?.baseAsset,
    ],
  });
}

export default async function SingleCoinPage({ params }: Props) {
  const slug = (await params).slug;

  const coin = await getCoinsList({
    params: {
      filters: {
        key: slug,
      },
    },
    onError: () => {
      notFound();
    },
  });

  const [coinDetail] = coin?.result?.markets ?? [];

  // these schemas could be more accurate, since some necessary fields for the API are missing.
  const coinSchema = generateCoinSchema({
    currentPrice: Number(coinDetail?.quotes?.USDT?.price),
    description: `قیمت ${coinDetail?.faBaseAsset}`,
    image: "",
    name: `قیمت ${coinDetail?.faBaseAsset}`,
    priceCurrency: "USD",
    slug: slug,
    symbol: coinDetail?.baseAsset,
    updatedAt: new Date(),
  });

  // these schemas could be more accurate, since some necessary fields for the API are missing.
  const breadCrumbSchema = generateBreadcrumbSchema({
    parentSlug: "coins",
    slug: slug,
    parentSlugName: "رمزارز ها",
    title: `قیمت ${coinDetail?.faBaseAsset}`,
  });

  return (
    <div className="max-w-4xl mx-auto mt-10 space-y-5">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(coinSchema) }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadCrumbSchema) }}
      />

      <CoinTitlePrice
        baseAsset={coinDetail?.baseAsset}
        faBaseAsset={coinDetail?.faBaseAsset}
        price={{
          usdt: coinDetail?.quotes?.USDT?.price,
          toman: coinDetail?.quotes?.TMN?.price,
        }}
        changePercent24h={Number(coinDetail?.quotes?.USDT?.change24h)}
      />

      <CoinIntroduce
        title={`${coinDetail?.faBaseAsset} چیست ?`}
        text="بیت کوین اولین ارز دیجیتال است که به جهان معرفی شد و انقلابی را در اقتصاد و امور مالی جهان آغاز کرد. زمانی که بیت کوین کار خود را آغاز کرد، هیچ‌کسی فکرش را هم نمی‌کرد که این نوآوری باعث ایجاد چه تحولاتی خواهد شد. خیلی‌ها در این سال‌ها مرگ زودهنگام بیت کوین را پیش‌بینی کردند، اما آنچه اتفاق افتاد این بود که پادشاه ارزهای دیجیتال آمده بود که بماند.
در این مقاله، تلاش کرده‌ایم تا آموزش بیت کوین را به زبان ساده و به‌اختصار توضیح دهیم. اگر شما هم درباره پادشاه ارزهای دیجیتال کنجکاو هستید و می‌خواهید بدانید بیت کوین چه ویژگی‌هایی دارد، چگونه ذخیره می‌شود و چه کسی آن را کنترل می‌کند، ویدئو زیر را ببینید و تا انتهای این مقاله با ما همراه باشید تا به پاسخ پرسش‌های خود برسید."
      />
    </div>
  );
}
