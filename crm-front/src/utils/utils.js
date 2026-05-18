//计算两个时间之间的时间差 多少天时分秒
export const getDiffTime = (new_date, old_date) => {
  var subtime = (new_date - old_date) / 1000; //计算时间差,并将毫秒转化为秒
  var days = parseInt(subtime / 86400); //天  24*60*60*1000
  var hours = parseInt(subtime / 3600) - 24 * days; //小时  60*60  总小时数-过去小时数=现在小时数
  var mins = parseInt((subtime % 3600) / 60); //分钟 - (day*24)  以60秒为一整份  取余 剩下秒数 秒数/60就是分钟数
  var secs = parseInt(subtime % 60); //以60秒为一整份  取余  剩下秒数
  return days + "天 " + hours + "小时 " + mins + "分钟 " + secs + "秒 ";
}

//秒转换
export const formatDate = (new_date) => {
  var subtime = new_date; //计算时间差,并将毫秒转化为秒
  var hours = parseInt(subtime / 3600); //小时  60*60  总小时数-过去小时数=现在小时数
  var mins = parseInt((subtime % 3600) / 60); //分钟 - (day*24)  以60秒为一整份  取余 剩下秒数 秒数/60就是分钟数
  var secs = parseInt(subtime % 60); //以60秒为一整份  取余  剩下秒数
  let params = "";
  if (hours > 0) {
    return (params = hours + "小时 " + mins + "分钟 " + secs + "秒 ");
  } else if (mins > 0) {
    return (params = mins + "分钟 " + secs + "秒 ");
  } else if (secs > 0) {
    return (params = secs + "秒 ");
  } else {
    return (params = "0秒 ");
  }
}

/**
 * 字符串中间用****代替
 */
export const  formatStr = (str) => {
  if (!str) return "****"; // 空值处理

  // 预处理：去除所有分隔符（空格、-）
  const pureStr = str.replace(/[-\s]/g, "");

  // 1. 严格匹配手机号（1开头，第二位3-9，11位纯数字）
  const mobilePattern = /^1[3-9]\d{9}$/;
  if (mobilePattern.test(pureStr)) {
    return str.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
  }

  // 2. 匹配座机号（带区号3-4位 + 7-8位号码，允许原字符串有分隔符）
  const landlinePattern = /^(\d{3,4})[- ]?(\d{2,4})[- ]?(\d{2,4})$/;
  if (landlinePattern.test(str)) {
    return str.replace(landlinePattern, (_, area, mid, end) => {
      // 保留原分隔符风格，例如 010-1234-5678 => 010-****-5678
      const separator = str.match(/[- ]/g)?.[0] || "";
      return `${area}${separator}****${separator}${end}`;
    });
  }

  // 3. 其他字符串处理（根据长度动态脱敏）
  const length = str.length;
  if (length > 8) {
    // 示例：ABCDEFGHIJK => ABC****JK（保留前后各3位）
    return str.replace(/(...).*(...)/, "$1****$2");
  }
  if (length >= 4) {
    // 示例：ABCDE => AB**E
    return str.replace(/(..).*(..)/, "$1**$2");
  }
  return "****"; // 短于4位全替换
}
