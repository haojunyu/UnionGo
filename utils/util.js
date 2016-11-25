function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


var i = 15;
function nextId() {
  return ++i;
}


function minuteBetween(begDate, endDate) {
  return (Date.parse(endDate) - Date.parse(begDate))/60000
}

function toRad(d) {  return d * Math.PI / 180; }

// lat为纬度, lng为经度, 一定不要弄错
function getDisance(lat1, lng1, lat2, lng2) {
    var dis = 0;
    var radLat1 = toRad(lat1);
    var radLat2 = toRad(lat2);
    var deltaLat = radLat1 - radLat2;
    var deltaLng = toRad(lng1) - toRad(lng2);
    var dis = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(deltaLng / 2), 2)));
    return dis * 6378137;
}




module.exports = {
  formatTime: formatTime,
  nextId: nextId,
  minuteBetween: minuteBetween,
  getDisance: getDisance
}
