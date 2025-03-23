import { finalizeError, makeError } from "@/core/config";
import { getQueryParams } from "@/core/utils";
import type { GetCoinsListResponse } from "@/models/coins";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    const [per_page, page, key] = getQueryParams(url.searchParams, [
      "per_page",
      "page",
      "key",
    ]);

    const result = await axios.get<GetCoinsListResponse>(
      "https://api.wallex.ir/v1/coin-price-list",
      {
        params: {
          per_page: per_page,
          page: page,
          keys: key,
        },
      }
    );

    if (!result?.data?.result?.markets?.length) {
      throw makeError({
        status: 404,
        message: "داده ای یافت نشد",
        name: "داده ای یافت نشد",
      });
    }

    return NextResponse.json({ ...result?.data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: finalizeError(error)?.message },
      { status: finalizeError(error)?.status ?? 500 }
    );
  }
}
