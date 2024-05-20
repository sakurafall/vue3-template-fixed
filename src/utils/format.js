import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

// UTC是协调世界时，又称世界统一时间、世界标准时间、国际协调时间
export const formatUTC = (utcStirng, format = 'YYYY-MM-DD HH:mm:ss') => {
  const time = dayjs.utc(utcStirng).utcOffset(8).format(format)
  return time
}

// 时间格式化
export function formatTime(time) {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}
