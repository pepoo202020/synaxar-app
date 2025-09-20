"use client";

import { useLanguage } from "@/providers/Language-Provider/language-provider";
import { useState } from "react";
import PageTabs from "./PageTabs";

export interface ITab {
  id: number;
  title: string;
  content: React.ReactNode;
}

const PageContent = () => {
  const { t } = useLanguage();
  const tabs: ITab[] = [
    {
      id: 1,
      title: String(t("synaxarDayBody")),
      content: <div>synaxar day body</div>,
    },
    {
      id: 2,
      title: String(t("synaxarPost")),
      content: <div>synaxar post</div>,
    },
    { id: 3, title: String(t("calendar")), content: <div>calendar</div> },
  ];
  const [tabIndex, setTabIndex] = useState<number>(0);

  const tabClickHandler = (index: number) => {
    setTabIndex(index);
  };

  return (
    <div className="w-full space-y-3">
      {/* tabs */}
      <PageTabs tabIndex={tabIndex} tabs={tabs} onTabClick={tabClickHandler} />
      {/* content */}
      {tabs[tabIndex].content}
    </div>
  );
};

export default PageContent;
