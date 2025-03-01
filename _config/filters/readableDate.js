import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

export default function (date) {
  return dayjs(date).utc().format('D MMMM YYYY');
}
