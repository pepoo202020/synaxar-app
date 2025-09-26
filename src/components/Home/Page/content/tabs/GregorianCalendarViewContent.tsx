import GregorianCalendarDays from "@/data/gregorian-days.json";
import { TLanguages } from "@/interfaces/types";
import { cn } from "@/lib/utils";
import {
  EachDayOfIntervalResult,
  format,
  isSameMonth,
  isToday,
} from "date-fns";

interface IGregorianCalendarViewContentProps {
  language: TLanguages;
  days: EachDayOfIntervalResult<
    {
      start: Date;
      end: Date;
    },
    undefined
  >;
  currentDate: Date;
}

const GregorianCalendarViewContent = ({
  language,
  days,
  currentDate,
}: IGregorianCalendarViewContentProps) => {
  const gregorianCalendarDays = GregorianCalendarDays;
  return (
    <div className="space-y-4 w-full h-full">
      <div className="grid grid-cols-7 gap-2 mb-4 w-full">
        {gregorianCalendarDays.map((day) => (
          <div
            key={day.en}
            className="p-2 text-center text-sm font-medium text-muted-foreground"
          >
            {day[language]}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 w-full h-full">
        {days.map((day) => (
          <div
            key={day.toISOString()}
            className={cn(
              "p-2 border rounded-lg cursor-pointer transition-all h-40",
              "hover:bg-accent/50",
              !isSameMonth(day, currentDate) &&
                "text-muted-foreground bg-muted/30",
              isToday(day) && "bg-blue-700/10 border-white"
            )}
          >
            <div className="flex flex-col h-full">
              <span
                className={cn(
                  "text-sm font-medium mb-2",
                  isToday(day) && "text-white font-bold"
                )}
              >
                {format(day, "d")}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GregorianCalendarViewContent;
