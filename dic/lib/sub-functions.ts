import dayjs from "dayjs";
import utc from "dayjs/plugin/utc"; // Import the UTC plugin
import timezone from "dayjs/plugin/timezone"; // Import the timezone plugin
import customParseFormat from "dayjs/plugin/customParseFormat"; // For parsing custom formats
dayjs.extend(timezone); // Extend dayjs with the timezone plugin

dayjs.extend(utc); // Extend dayjs with the UTC plugin
dayjs.extend(customParseFormat); // Extend dayjs with the custom parse format plugin

export function formatDateFromString(dateString: string): string {
  const date = dayjs.utc(dateString).local(); // Parse the date as UTC and convert to local time
  // Use the `format` method with the desired format string
  const formattedDate = date.format("YYYY-MM-DD");
  return formattedDate;
}
 