"use client";
import CopticDate from "@/components/shared/CopticDate";
import GregorianDate from "@/components/shared/GregorianDate";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TLanguages } from "@/interfaces/types";
import { cn } from "@/lib/utils";
import {
  copticToGregorianConvert,
  gregorianToCopticDate,
} from "@/services/date-services";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { useState } from "react";
import GregorianCalendarViewContent from "./GregorianCalendarViewContent";
import { eachDayOfInterval, endOfMonth, startOfMonth } from "date-fns";

interface ISynaxarCalendarProps {
  currentDate: Date;
  language: TLanguages;
  calendarType: "coptic" | "gregorian";
  setCalendarType: (value: "coptic" | "gregorian") => void;
  isRTL: boolean;
  t: (key: string, options?: any) => string | object;
  onAddCalendarEvent: () => void;
}

const SynaxarCalendar = ({
  currentDate,
  language,
  calendarType,
  setCalendarType,
  isRTL,
  t,
  onAddCalendarEvent,
}: ISynaxarCalendarProps) => {
  const [displayedDate, setDisplayedDate] = useState<Date>(currentDate);
  const gregorianDate = displayedDate;
  const copticDate = gregorianToCopticDate(
    gregorianDate,
    language,
    "long"
  ).copticDate;
  const getCalendarTitle = () => {
    if (calendarType === "coptic") {
      return (
        <CopticDate
          currentDate={displayedDate}
          language={language}
          size="short"
        />
      );
    }

    return (
      <GregorianDate
        currentDate={displayedDate}
        language={language}
        size="small"
      />
    );
  };

  const nextMonthHandler = () => {
    if (calendarType === "gregorian") {
      setDisplayedDate(
        new Date(gregorianDate.getFullYear(), gregorianDate.getMonth() + 1, 1)
      );
    } else if (calendarType === "coptic") {
      // Coptic calendar
      let newCopticMonth = copticDate.month + 1;
      let newCopticYear = copticDate.year;

      if (newCopticMonth > 13) {
        newCopticMonth = 1;
        newCopticYear++;
      }

      setDisplayedDate(
        copticToGregorianConvert({
          copticDay: 1,
          copticMonth: newCopticMonth,
          copticYear: newCopticYear,
        })
      );
    }
  };

  const previousMonthHandler = () => {
    if (calendarType === "gregorian") {
      setDisplayedDate(
        new Date(gregorianDate.getFullYear(), gregorianDate.getMonth() - 1, 1)
      );
    } else if (calendarType === "coptic") {
      // Coptic calendar
      let newCopticMonth = copticDate.month - 1;
      let newCopticYear = copticDate.year;

      if (newCopticMonth < 1) {
        newCopticMonth = 13;
        newCopticYear--;
      }

      setDisplayedDate(
        copticToGregorianConvert({
          copticDay: 1,
          copticMonth: newCopticMonth,
          copticYear: newCopticYear,
        })
      );
    }
  };
  // --- Gregorian month days ---
  const gregorianMonthStart = startOfMonth(displayedDate);
  const gregorianMonthEnd = endOfMonth(displayedDate);
  const gregorianDays = eachDayOfInterval({
    start: gregorianMonthStart,
    end: gregorianMonthEnd,
  });

  return (
    <div className="space-y-2 overflow-hidden w-full h-full flex flex-col items-center flex-1 pb-10">
      {/* header */}
      <div className="w-full flex items-center justify-between h-16">
        {/* gregorian date */}
        <GregorianDate
          currentDate={currentDate}
          language={language}
          size="long"
        />
        {/* synaxar saints and events */}
        <div className="flex items-center justify-between border-1 px-5  w-full max-w-7xl overflow-x-auto h-full">
          <div className="text-3xl">{getCalendarTitle()}</div>
          <div className="flex items-center gap-2">
            <Select
              value={calendarType}
              onValueChange={(value) =>
                setCalendarType(value as "coptic" | "gregorian")
              }
              dir={isRTL ? "rtl" : "ltr"}
            >
              <SelectTrigger className="w-60">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="coptic">{String(t("coptic"))}</SelectItem>
                <SelectItem value="gregorian">
                  {String(t("gregorian"))}
                </SelectItem>
              </SelectContent>
            </Select>
            <Button
              className="liturgical-gradient text-white cursor-pointer"
              size="sm"
              onClick={onAddCalendarEvent}
            >
              <Plus className={cn("w-4 h-4", isRTL ? "ml-1" : "mr-1")} />
              {String(t("addEvent"))}
            </Button>
            <div className="flex gap-1 items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={previousMonthHandler}
                className="cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextMonthHandler}
                className="cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        {/* coptic date */}
        <CopticDate currentDate={currentDate} language={language} size="long" />
      </div>
      {/* body & image */}
      <div className="w-full flex-1 mx-10 h-full max-h-3/4 rounded-2xl gap-2 overflow-x-hidden overflow-y-auto">
        {calendarType === "gregorian" ? (
          <GregorianCalendarViewContent
            currentDate={currentDate}
            language={language}
            days={gregorianDays}
          />
        ) : (
          <>coptic</>
        )}
      </div>
    </div>
  );
};

export default SynaxarCalendar;
