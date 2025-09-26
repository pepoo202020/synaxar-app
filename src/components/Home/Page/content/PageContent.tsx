"use client";

import { useLanguage } from "@/providers/Language-Provider/language-provider";
import { useState } from "react";
import PageTabs from "./PageTabs";
import SynaxarDayDetails from "./tabs/SynaxarDayDetails";
import SynaxarDayPost from "./tabs/SynaxarDayPost";
import SynaxarCalendar from "./tabs/SynaxarCalendar";
import data from "@/data/synaxar-data.json";

export interface ITab {
  id: number;
  title: string;
  content: React.ReactNode;
}

const PageContent = () => {
  const { t, language, isRTL } = useLanguage();
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [synaxarData, setSynaxarData] = useState(data);
  const [dataIndex, setDataIndex] = useState<string>(
    data.find((dt) => dt.isMain === true)?.name_en!
  );
  const [calendarType, setCalendarType] = useState<"coptic" | "gregorian">(
    "gregorian"
  );

  const synaxarDataChangeHandler = (name: string) => {
    setDataIndex(name);
  };

  const addEventCalendar = () => {};

  const tabs: ITab[] = [
    {
      id: 1,
      title: String(t("synaxarDayDetails")),
      content: (
        <SynaxarDayDetails
          currentDate={currentDate}
          language={language}
          synaxarData={synaxarData}
          dataIndex={dataIndex}
          onSynaxarChange={synaxarDataChangeHandler}
        />
      ),
    },
    {
      id: 2,
      title: String(t("synaxarDayPost")),
      content: <SynaxarDayPost />,
    },
    {
      id: 3,
      title: String(t("synaxarCalendar")),
      content: (
        <SynaxarCalendar
          currentDate={currentDate}
          language={language}
          calendarType={calendarType}
          setCalendarType={setCalendarType}
          isRTL={isRTL}
          onAddCalendarEvent={addEventCalendar}
          t={t}
        />
      ),
    },
  ];
  const [tabIndex, setTabIndex] = useState<number>(0);

  const tabClickHandler = (index: number) => {
    setTabIndex(index);
  };

  return (
    <div className="w-full space-y-3 h-full">
      {/* tabs */}
      <PageTabs tabIndex={tabIndex} tabs={tabs} onTabClick={tabClickHandler} />
      {/* content */}
      {tabs[tabIndex].content}
    </div>
  );
};

export default PageContent;
