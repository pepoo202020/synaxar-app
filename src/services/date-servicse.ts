import CopticMonths from "../data/coptic-months.json";

function isGregorianLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function gregorianToCopticDate(
  gregorianDate: Date,
  language: "co" | "ar" | "en",
  size: "long" | "short"
) {
  const gregorianYear = gregorianDate.getFullYear();

  // Determine the Coptic Year and the effective start date of the Coptic New Year
  let copticYear = gregorianYear - 284;
  const startDay = isGregorianLeapYear(gregorianYear) ? 12 : 11;
  const copticNewYearGregorianDate = new Date(gregorianYear, 8, startDay);

  if (gregorianDate < copticNewYearGregorianDate) {
    copticYear--;
  }

  // Calculate days passed since the Coptic New Year
  const diffInMs =
    gregorianDate.getTime() - new Date(gregorianYear, 8, startDay).getTime();
  const msInDay = 1000 * 60 * 60 * 24;
  let daysPassed = Math.floor(diffInMs / msInDay);

  // If the date is before the Coptic New Year, adjust the days
  if (daysPassed < 0) {
    daysPassed += isGregorianLeapYear(gregorianYear - 1) ? 366 : 365;
  }

  // Determine if the Coptic Year is a leap year for month calculation
  const isCopticLeapYear = copticYear % 4 === 3;
  const daysInMonths = [
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    30,
    isCopticLeapYear ? 6 : 5,
  ];

  let copticMonthIndex = 0;
  let copticDay = 0;

  for (let i = 0; i < daysInMonths.length; i++) {
    const daysInCurrentMonth = daysInMonths[i];
    if (daysPassed < daysInCurrentMonth) {
      copticMonthIndex = i;
      copticDay = daysPassed + 1;
      break;
    }
    daysPassed -= daysInCurrentMonth;
  }

  const copticMonth = copticMonthIndex + 1;
  const monthData = CopticMonths.find((m) => m.id === copticMonth);

  const formattedDate: string = `${copticDay} ${
    monthData![language as keyof typeof monthData]
  } ${copticYear}`;

  const copticDate = {
    day: copticDay,
    month: copticMonth,
    year: copticYear,
    monthName: monthData,
  };

  return {
    formattedDate,
    copticDate,
  };
}

export function copticToGregorianConvert(copticDate: {
  copticYear: number;
  copticMonth: number;
  copticDay: number;
}) {
  const gregorianYear = copticDate.copticYear + 283;
  const copticNewYear = new Date(
    gregorianYear,
    8,
    isGregorianLeapYear(gregorianYear) ? 12 : 11
  );
  const daysOffset = copticDate.copticMonth * 30 + (copticDate.copticDay - 1);
  return new Date(copticNewYear.getTime() + daysOffset * 24 * 60 * 60 * 1000);
}

export function getCopticMonthDays(copticYear: number, copticMonth: number) {
  const days: Date[] = [];
  const daysInMonth =
    copticMonth === 12 ? (isGregorianLeapYear(copticYear) ? 5 : 6) : 30;
  for (let d = 1; d <= daysInMonth; d++) {
    days.push(
      copticToGregorianConvert({ copticYear, copticMonth, copticDay: d })
    );
  }
  return days;
}
