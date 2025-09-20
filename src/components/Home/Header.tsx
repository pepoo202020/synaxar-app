"use client";

import { useLanguage } from "@/providers/Language-Provider/language-provider";
import Image from "next/image";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { IoSearch } from "react-icons/io5";
import { GrActions } from "react-icons/gr";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTheme } from "next-themes";

const Header = () => {
  const { t, language, setLanguage } = useLanguage();
  const [searchValue, setSearchValue] = useState<string>("");
  const { theme, setTheme } = useTheme();

  const dropdownMenuItems = [
    {
      id: 1,
      title:
        theme === "dark" || theme === "system"
          ? String(t("lightTheme"))
          : String(t("darkTheme")),
      action: () => setTheme(theme === "dark" ? "light" : "dark"),
    },
    {
      id: 2,
      title: String(t("arabicLanguage")),
      action: () => setLanguage("ar"),
    },
    {
      id: 3,
      title: String(t("englishLanguage")),
      action: () => setLanguage("en"),
    },
    {
      id: 4,
      title: String(t("copticLanguage")),
      action: () => setLanguage("co"),
    },
  ];

  const filteredMenuItems = () => {
    if (language === "ar") {
      return dropdownMenuItems.filter(
        (item) => item.title !== String(t("arabicLanguage"))
      );
    } else if (language === "en") {
      return dropdownMenuItems.filter(
        (item) => item.title !== String(t("englishLanguage"))
      );
    } else {
      return dropdownMenuItems.filter(
        (item) => item.title !== String(t("copticLanguage"))
      );
    }
  };

  const splitLogo = (title: string) => {
    const words = title.split(" ");
    if (words.length <= 2) {
      return <span>{title}</span>;
    }
    const midPoint = Math.ceil(words.length / 2);
    const firstLine = words.slice(0, midPoint).join(" ");
    const secondLine = words.slice(midPoint).join(" ");
    return (
      <div className="flex flex-col">
        <span>{firstLine}</span>
        <span>{secondLine}</span>
      </div>
    );
  };
  return (
    <div className="h-20  w-full overflow-hidden px-10 flex items-center justify-between">
      {/* logo */}
      <div className="flex items-center gap-2">
        <Image src="/images/logo.png" alt="Logo" width={50} height={50} />
        <div className="font-bold">{splitLogo(String(t("logoTitle")))}</div>
      </div>

      {/* search */}
      <div className="max-w-5xl w-full relative">
        <Input
          placeholder={String(t("searchPlaceholder"))}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full h-10"
        />
        <Button
          className="absolute end-1 cursor-pointer hover:text-yellow-600 transition-all duration-500"
          variant={"link"}
        >
          <IoSearch />
        </Button>
      </div>

      {/* actions */}
      <DropdownMenu>
        <DropdownMenuTrigger className="border dark:border-white border-blue-950 hover:text-yellow-600 p-2 rounded-2xl transition-all duration-500">
          <GrActions size={25} />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="max-w-5xl" align="start">
          {filteredMenuItems().map((menuItem) => (
            <DropdownMenuItem onClick={menuItem.action} key={menuItem.id}>
              {menuItem.title}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Header;
