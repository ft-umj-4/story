import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export function readableDate(date) {
  return dayjs(date).utc().format('D MMMM YYYY');
};
