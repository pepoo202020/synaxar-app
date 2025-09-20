"use client";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/Language-Provider/language-provider";

const PageTitle = () => {
  const { t, language } = useLanguage();
  return (
    <div className="space-y-2">
      <h1
        className={cn(
          "text-2xl font-bold",
          language === "en" && "font-cinzel",
          language === "ar" && "font-kufam"
        )}
      >
        {String(t("applicationName"))}
      </h1>
      <p>{String(t("applicationDescription"))}</p>
    </div>
  );
};

export default PageTitle;
