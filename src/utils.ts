export function shiftDate(date: Date, numDays: number) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

export function getRange(count: number) {
  return Array.from({ length: count }, (_, i) => i);
}

export function groupConsecutiveDates(dateArray: Date[]): string {
  if (dateArray.length === 0) {
    return "";
  }

  // Sort the dates in ascending order based on year, month, and day numerically

  let result = "";
  let startDate = dateArray[0];
  let endDate = dateArray[0];

  for (let i = 1; i < dateArray.length; i++) {
    const currentDate = dateArray[i];
    const prevDate = dateArray[i - 1];

    // Check if the current date is one day after the previous date
    const isConsecutive =
      currentDate.getFullYear() === prevDate.getFullYear() &&
      currentDate.getMonth() === prevDate.getMonth() &&
      currentDate.getDate() === prevDate.getDate() + 1;

    if (isConsecutive) {
      endDate = currentDate;
    } else {
      // If not consecutive, add the range to the result
      if (
        startDate.getFullYear() === endDate.getFullYear() &&
        startDate.getMonth() === endDate.getMonth() &&
        startDate.getDate() === endDate.getDate()
      ) {
        result += startDate.toISOString().substr(0, 10) + ",";
      } else {
        result +=
          startDate.toISOString().substr(0, 10) +
          ":" +
          endDate.toISOString().substr(0, 10) +
          ",";
      }

      startDate = currentDate;
      endDate = currentDate;
    }
  }

  // Add the last range to the result
  if (
    startDate.getFullYear() === endDate.getFullYear() &&
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getDate() === endDate.getDate()
  ) {
    result += startDate.toISOString().substr(0, 10);
  } else {
    result +=
      startDate.toISOString().substr(0, 10) +
      ":" +
      endDate.toISOString().substr(0, 10);
  }

  return result;
}

export function formatDateToCustomFormat(date: Date): string {
  const year = date.getUTCFullYear().toString().padStart(4, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = date.getUTCDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}
