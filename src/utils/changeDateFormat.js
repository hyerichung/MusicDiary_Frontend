import { parseISO, format } from "date-fns";

const changeDateFormat = (date) => {
  return format(parseISO(date), "yyyy-MM-dd");
};

export default changeDateFormat;
