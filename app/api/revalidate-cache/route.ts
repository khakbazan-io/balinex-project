import { finalizeError } from "@/core/config";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.tags) {
      for (const tag of body.tags) {
        revalidateTag(tag);
      }
    } else {
      NextResponse.json(
        { message: "تگ تازه سازی کش یافت نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "کش باموفقیت تازه سازی شد" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: finalizeError(error)?.message },
      { status: finalizeError(error)?.status ?? 500 }
    );
  }
}
