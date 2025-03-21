import { CoinsList } from "@/components/coins";
import { getCoinsList } from "@/models/coins";
import { Fragment } from "react";

export default async function HomePage() {
  const coinsList = await getCoinsList();

  return (
    <Fragment>
      <CoinsList coins={coinsList?.result?.markets} />
    </Fragment>
  );
}
