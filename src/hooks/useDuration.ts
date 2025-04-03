
import { parse, differenceInMinutes } from "date-fns";
import _ from "lodash";

export const useDuration = () => {
  const getDuration = (startTime: string, endTime: string) => {
    if (_.isEmpty(startTime) || _.isEmpty(endTime)) {
      return "";
    }

    const parseStartTime = parse(startTime, "HH:mm", new Date());
    const parseEndTime = parse(endTime, "HH:mm", new Date());

    const diffInMinutes = differenceInMinutes(parseEndTime, parseStartTime);
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;

    if (hours === 0) {
      return `${minutes}min`;
    }

    if (minutes === 0) {
      return `${hours}h`;
    }

    return `${hours}h ${minutes}min`;
  };

  return { getDuration };
};

export default useDuration;






