function getFormatDate() {
    var date = new Date();
    var seperator = "-";

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var nowDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (nowDate >= 0 && nowDate <= 9) {
        nowDate = "0" + nowDate;
    }
    var newDate = year + seperator + month + seperator + nowDate;
    return newDate;
}
//获取前一天
function getBeforeDate() {
    var date = new Date();

    date = new Date(date.getTime() - 24 * 60 * 60 * 1000);

    var seperator = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var nowDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (nowDate >= 0 && nowDate <= 9) {
        nowDate = "0" + nowDate;
    }
    var newDate = year + seperator + month + seperator + nowDate;
    return newDate;
}

function getFullFormatDate() {
    var date = new Date();
    var seperator = "-";

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var nowDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (nowDate >= 0 && nowDate <= 9) {
        nowDate = "0" + nowDate;
    }
    let dateString = year + seperator + month + seperator + nowDate;

    let hour = date.getHours(), minute = date.getMinutes(), second = date.getSeconds()

    if (hour >= 1 && hour <= 9) {
        hour = "0" + hour;
    }
    if (minute >= 0 && minute <= 9) {
        minute = "0" + minute;
    }
    if (second >= 0 && second <= 9) {
        second = "0" + second;
    }
    dateString = dateString + " " + hour + ":" + minute + ":" + second
    return dateString;
}
module.exports = {
    getFormatDate,
    getBeforeDate,
    getFullFormatDate
}