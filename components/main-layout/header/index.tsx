"use client";
import Link from "next/link";
import { navItems } from "./constants";
import { Button } from "@/core/common";
import { ThemeSwitch } from "@/components/theme-switch";
import { FaBtc } from "react-icons/fa6";

export const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between w-full h-20">
      <div className="flex items-center gap-x-10">
        <Link href="/">
          <FaBtc size={30} />
        </Link>

        <nav>
          <ul className="flex items-center gap-x-5">
            {navItems?.map((item) => (
              <li key={`nav-item-${item?.href}`}>
                <Link className="font-medium" href={item?.href}>
                  {item?.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="flex items-center gap-x-2">
        <ThemeSwitch />

        <div className="flex items-center gap-x-2">
          <Button variant="light">ورود</Button>

          <Button color="primary">ثبت نام</Button>
        </div>
      </div>
    </header>
  );
};
