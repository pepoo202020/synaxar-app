import { TLanguages } from "@/interfaces/types";
import { gregorianFormatterDate } from "@/services/date-services";

interface IGregorianDateProps {
  currentDate: Date;
  language: TLanguages;
  size: "long" | "small";
}

const GregorianDate = ({
  currentDate,
  language,
  size,
}: IGregorianDateProps) => {
  const formattedGregorianCurrentDate = gregorianFormatterDate(
    currentDate,
    language,
    size
  );
  return <div>{formattedGregorianCurrentDate}</div>;
};

export default GregorianDate;
