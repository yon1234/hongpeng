function formatNumber(n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

const remianTime = function (day) {
  var now = new Date();
  var discountDay = new Date(day);
  var discountDaySeconds = Date.parse(discountDay);
  var todaySeconds = Date.parse(now);
  var totalRemainSeconds = discountDaySeconds - todaySeconds; //剩下的
  var remainDay = parseInt(totalRemainSeconds / (24 * 60 * 60 * 1000)); //parseInt保留整数部分
  var dayRemainer = totalRemainSeconds % (24 * 60 * 60 * 1000)
  var remainHours = parseInt(dayRemainer / (60 * 60 * 1000));
  var hoursRemainer = dayRemainer % (60 * 60 * 1000);
  var remianMinutes = parseInt(hoursRemainer / (60 * 1000));
  var minutesRemainer = hoursRemainer % (60 * 1000);
  var remainSeconds = parseInt(minutesRemainer / 1000);
  return `${remainDay}天${remainHours}时${remianMinutes}分${remainSeconds}秒`

}

export default {
  formatNumber,
  formatTime,
  remianTime
}
