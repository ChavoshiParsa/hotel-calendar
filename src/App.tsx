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
    number: index,
  };
});

type values = typeof initValues;
type value = (typeof initValues)[0];

export default function App() {
  const [values, setValues] = useState<values>(initValues);
  const [currentDate, setCurrentDate] = useState<Date>(today);
  const [outPut, setOutPut] = useState("");
  const [start, setStart] = useState<value | null>(null);
  const [end, setEnd] = useState<value | null>(null);
  const [isRang, setIsRang] = useState(false);

  useEffect(() => {
    const filteredCell = values
      .filter((prev) => prev.isChosen === true)
      .map((item) => item.date);
    setOutPut(groupConsecutiveDates(filteredCell));

    if (start && end) {
      let startR = start;
      let endR = end;
      if (start.number > end.number) {
        startR = end;
        endR = start;
      }

      let on = false;
      const newArray = values.map((item) => {
        if (item.number === startR.number) {
          on = true;
        }
        if (on) {
          if (item.number === endR.number) {
            on = false;
            return { date: item.date, isChosen: true, number: item.number };
          }
          return { date: item.date, isChosen: true, number: item.number };
        }
        return {
          date: item.date,
          isChosen: item.isChosen,
          number: item.number,
        };
      });

      setValues(newArray);

      setStart(null);
      setEnd(null);
      setIsRang(false);
    }
    console.log(start, end);
  }, [start, end, values]);

  const cellHandler = (value: value) => {
    const index = values.findIndex((prev) => value.date === prev.date);
    const newValues = [...values];
    newValues[index] = {
      ...newValues[index],
      isChosen: !newValues[index].isChosen,
    };
    setValues(newValues);

    if (isRang) {
      if (start === null) {
        setStart(value);
      } else if (end === null) {
        setEnd(value);
      }
    } else {
      const index = values.findIndex((prev) => value.date === prev.date);
      const newValues = [...values];
      newValues[index] = {
        ...newValues[index],
        isChosen: !newValues[index].isChosen,
      };
      setValues(newValues);
    }
  };

  return (
    <div className="calendar">
      <div className="current-date">
        {formatDateToCustomFormat(currentDate)}
      </div>
      <button
        onClick={() => setIsRang(true)}
        disabled={isRang}
        style={{ backgroundColor: isRang ? "gray" : "" }}
      >
        {isRang ? "Selecting..." : "Select Rang"}
      </button>

      <div className="calendar-control">
        <CalendarHeatmap
          startDate={shiftDate(today, -RANG / 2)}
          endDate={shiftDate(today, RANG / 2)}
          values={values}
          classForValue={(value: value) => {
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
          onMouseOver={(_e, value: value) => setCurrentDate(value.date)}
        />
      </div>
      <div className="output">{outPut}</div>
    </div>
  );
}
