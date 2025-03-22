import { Button } from "@/core/common";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-w-2xl mx-auto gap-y-4">
      <h2 className="text-lg font-semibold">صفحه مدنظر یافت نشد!</h2>

      <Link href="/">
        <Button color="primary">صفحه اصلی</Button>
      </Link>
    </div>
  );
}
