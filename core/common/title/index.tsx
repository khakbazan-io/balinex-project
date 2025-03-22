import type { TitleCmProps } from "./types";

export const Title: React.FC<TitleCmProps> = ({ title }) => {
  return (
    <div className="flex items-center gap-x-1 mb-3">
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
  );
};
