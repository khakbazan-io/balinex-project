"use client";
import { useCallback, useState } from "react";
import type { HighlightableTextCmProps } from "./types";
import { Input } from "@/core/common";

export const HighlightableText: React.FC<HighlightableTextCmProps> = ({
  text,
  title,
}) => {
  const [keyword, setKeyword] = useState("");

  const getHighlightedText = useCallback(
    (highlight: string) => {
      if (!highlight) {
        return text;
      }

      const escapedRegex = highlight.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const regex = new RegExp(`(${escapedRegex})`, "gi");
      const parts = text.split(regex);

      return parts.map((part, i) =>
        regex.test(part) ? (
          <mark
            aria-label={`Matched: ${part}`}
            key={i}
            className="bg-primary text-white rounded px-1"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      );
    },
    [text]
  );

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-medium">{title}</h2>

      <Input
        variant="bordered"
        size="sm"
        label="جستجو..."
        value={keyword}
        className="max-w-96"
        onChange={(e) => setKeyword(e.target.value)}
        aria-labelledby="highlight-title"
        aria-label="جستجوی کلمه در متن"
      />

      <p
        className="text-sm font-normal"
        role="region"
        aria-live="polite"
        aria-label="نتیجه جستجو"
      >
        {getHighlightedText(keyword)}
      </p>
    </div>
  );
};
