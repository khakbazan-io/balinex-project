"use client";
import { TbMoodPuzzled } from "react-icons/tb";

export const TableEmpty: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-2">
      <TbMoodPuzzled size={50} />
      <p className="font-medium">داده ای یافت نشد!</p>
    </div>
  );
};
