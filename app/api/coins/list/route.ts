import { finalizeError } from "@/core/config";
import { getQueryParams } from "@/core/utils";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);

    const [per_page, page] = getQueryParams(url.searchParams, [
      "per_page",
      "page",
    ]);

    console.log({ per_page, page });

    const result = await axios.get("https://api.wallex.ir/v1/coin-price-list", {
      params: {
        per_page: per_page,
        page: page,
      },
    });

    return NextResponse.json({ ...result?.data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: finalizeError(error)?.message },
      { status: finalizeError(error)?.status ?? 500 }
    );
  }
}
