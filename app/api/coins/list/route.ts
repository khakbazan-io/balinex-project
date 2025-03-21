import { finalizeError } from "@/core/config";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const result = await axios.get(
      "https://api.wallex.ir/v1/coin-price-list?per_page=10&page=1"
    );

    return NextResponse.json({ ...result?.data }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: finalizeError(error)?.message },
      { status: finalizeError(error)?.status ?? 500 }
    );
  }
}
