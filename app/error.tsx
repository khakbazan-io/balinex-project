"use client";
import { Button } from "@/core/common";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-w-2xl mx-auto gap-y-4">
      <h2 className="text-lg font-semibold">مشکلی پیش آمده</h2>

      <Button onPress={() => reset()} color="primary">
        تلاش مجدد
      </Button>
    </div>
  );
}
