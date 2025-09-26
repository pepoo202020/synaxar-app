import { TLanguages } from "@/interfaces/types";
import {
  gregorianFormatterDate,
  gregorianToCopticDate,
} from "@/services/date-services";
import { cn } from "@/lib/utils";
import GregorianDate from "@/components/shared/GregorianDate";
import CopticDate from "@/components/shared/CopticDate";
interface ISynaxarDayDetailsProps {
  currentDate: Date;
  language: TLanguages;
  synaxarData: any[];
  dataIndex: string;
  onSynaxarChange: (name: string) => void;
}

const SynaxarDayDetails: React.FC<ISynaxarDayDetailsProps> = ({
  currentDate,
  language,
  synaxarData,
  dataIndex,
  onSynaxarChange,
}) => {
  const synaxarDataNames = synaxarData.map((synaxar) => {
    return {
      ar: synaxar.name_ar,
      en: synaxar.name_en,
      co: synaxar.name_co,
      main: synaxar.isMain ? true : false,
    };
  });

  return (
    <div className="space-y-2 overflow-hidden w-full h-full flex flex-col items-center">
      {/* header */}
      <div className="w-full flex items-center justify-between h-16">
        {/* gregorian date */}
        <GregorianDate
          currentDate={currentDate}
          language={language}
          size="long"
        />
        {/* synaxar saints and events */}
        <div className="flex items-center justify-center  w-full max-w-7xl overflow-x-auto h-full">
          {synaxarDataNames.map((dt) => (
            <div
              key={dt.en}
              className={cn(
                "px-5 border w-full h-full flex items-center cursor-pointer",
                dataIndex === dt.en && "bg-yellow-600"
              )}
              onClick={() => onSynaxarChange(dt.en)}
            >
              {dt[language]}
            </div>
          ))}
        </div>
        {/* coptic date */}
        <CopticDate currentDate={currentDate} language={language} size="long" />
      </div>
      {/* body & image */}
      <div className="w-full flex-1 max-w-7xl rounded-2xl flex items-start justify-start gap-2 overflow-hidden">
        <div className="w-full  h-full max-h-3/4 p-3 overflow-x-hidden overflow-y-auto text-3xl flex flex-col items-center justify-start text-center">
          {
            synaxarData.find((sy) => sy.name_en === dataIndex)?.[
              `description_${language}`
            ]
          }
        </div>
        <div className="w-2/5 border-1 h-full max-h-3/4 overflow-hidden rounded-2xl">
          <img
            src={synaxarData.find((sy) => sy.name_en === dataIndex).image}
            alt={`Image of ${
              synaxarData.find((sy) => sy.name_en === dataIndex).name_en
            }`}
            className="bg-cover h-full w-full scale-105"
          />
        </div>
      </div>
    </div>
  );
};

export default SynaxarDayDetails;
