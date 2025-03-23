import { NewCoin } from "@/components/coins";
import { generateMeta } from "@/core/utils";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return generateMeta({
    title: "افزودن رمزارز جدید",
    description: "افزودن رمزارز جدید",
  });
}

export default async function NewCoinPage() {
  return (
    <div className="space-y-4">
      <NewCoin />
    </div>
  );
}
