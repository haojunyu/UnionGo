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


var i = 8;
function nextId() {
  return ++i;
}


function minuteBetween(begDate, endDate) {
  return (Date.parse(endDate) - Date.parse(begDate))/60000
}


module.exports = {
  formatTime: formatTime,
  nextId: nextId,
  minuteBetween: minuteBetween
}
