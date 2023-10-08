import { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import {
  formatDateToCustomFormat,
  getRange,
  groupConsecutiveDates,
  shiftDate,
} from "./utils";

const today = new Date();
const RANG = 150;

const initValues = getRange(RANG).map((index) => {
  return {
    date: shiftDate(today, index - (RANG / 2 - 1)),
    isChosen: false,
  };
});

export default function App() {
  const [values, setValues] = useState(initValues);
  const [currentDate, setCurrentDate] = useState<Date>(today);
  const [outPut, setOutPut] = useState("");

  useEffect(() => {
    const filteredCell = values
      .filter((prev) => prev.isChosen === true)
      .map((item) => item.date);

    setOutPut(groupConsecutiveDates(filteredCell));

    console.log(outPut);
  }, [values, outPut]);

  const cellHandler = (value: { date: Date; isChosen: boolean }) => {
    const index = values.findIndex((prev) => value.date === prev.date);

    const newValues = [...values];

    newValues[index] = {
      ...newValues[index],
      isChosen: !newValues[index].isChosen,
    };

    setValues(newValues);
  };

  console.log(currentDate);

  return (
    <div className="calendar">
      <div className="current-date">
        {formatDateToCustomFormat(currentDate)}
      </div>
      <div className="calendar-control">
        <CalendarHeatmap
          startDate={shiftDate(today, -RANG / 2)}
          endDate={shiftDate(today, RANG / 2)}
          values={values}
          classForValue={(value) => {
            if (value.date.getTime() === today.getTime()) {
              let className = "today-cell";
              if (value.isChosen) {
                className = "full-cell";
              }
              return className;
            }
            if (!value.isChosen) {
              return "empty-cell";
            }
            return `full-cell`;
          }}
          showWeekdayLabels={true}
          onClick={cellHandler}
          onMouseOver={(event, value) => setCurrentDate(value.date)}
        />
      </div>
      <div className="output">{outPut}</div>
    </div>
  );
}
