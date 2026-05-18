//计算两个时间之间的时间差 多少天时分秒
function getDiffTime(new_date,old_date){
    var subtime = (new_date - old_date) / 1000;    //计算时间差,并将毫秒转化为秒
    var days = parseInt(subtime / 86400);  //天  24*60*60*1000
    var hours = parseInt(subtime / 3600) - 24 * days;   //小时  60*60  总小时数-过去小时数=现在小时数
    var mins = parseInt(subtime % 3600 / 60);    //分钟 - (day*24)  以60秒为一整份  取余 剩下秒数 秒数/60就是分钟数
    var secs = parseInt(subtime % 60);   //以60秒为一整份  取余  剩下秒数
    return days + "天 " + hours + "小时 " + mins + "分钟 " + secs + "秒 ";
}










module.exports = {
    getDiffTime
}
