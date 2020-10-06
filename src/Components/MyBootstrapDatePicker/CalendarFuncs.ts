function daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
}

const GetMatrixDays = (pDate) => {
  const Month = pDate.getMonth() + 1;
  const Year = pDate.getYear() + 1900;
  const FirstMonthDay = new Date(Year, Month - 1, 1, 0, 0, 0, 0);
  let FirstweekDay = FirstMonthDay.getDay();
  if (FirstweekDay == 0) FirstweekDay = 7;
  const DaysinMonth = daysInMonth(Month, Year);
  let weeks = [];
  //console.log(pDate,Month,Year,FirstMonthDay,FirstweekDay,DaysinMonth);
  let Day = 1;
  let MatrixCell = 1;
  for (let j = 0; Day <= DaysinMonth; j++) {
    let weekdays = [];
    for (let i = 0; i < 7; i++) {
      if (MatrixCell >= FirstweekDay && Day <= DaysinMonth) {
        weekdays[i] = Day;
        Day++;
      } else weekdays[i] = undefined;
      MatrixCell++;
    }
    weeks[j] = weekdays;
  }
  return weeks;
};

export { GetMatrixDays };
