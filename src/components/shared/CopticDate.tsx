import { TLanguages } from "@/interfaces/types";
import { gregorianToCopticDate } from "@/services/date-services";

interface ICopticDateProps {
  currentDate: Date;
  language: TLanguages;
  size: "long" | "short";
}

const CopticDate = ({ currentDate, language, size }: ICopticDateProps) => {
  const formattedCopticCurrentDate = gregorianToCopticDate(
    currentDate,
    language,
    size
  );
  return <div>{formattedCopticCurrentDate.formattedDate}</div>;
};

export default CopticDate;
