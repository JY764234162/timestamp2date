import dayjs from 'dayjs';

export type stampType = 'second' | 'millisecond';

export default function timestamp2date(
  number: number,
  stampType: stampType
): string {
  if (stampType === 'second') {
    return dayjs.unix(number).format('YYYY-MM-DD HH:mm:ss');
  } else return dayjs(number).format('YYYY-MM-DD HH:mm:ss');
}
