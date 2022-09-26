var today = new Date();
var year = today.getUTCFullYear();
var month = today.getUTCMonth();
var day = today.getUTCDate();
var hour = today.getHours();
var minute = today.getMinutes();
var second = today.getSeconds();
var timeish = hour + '.' + (minute * 60);
  
var timeDiff = {
  setStartTime : function () {
    d = new Date();
    time  = d.getTime();
  },

  getDiff : function () {
    d = new Date();
    return (d.getTime()-time);
  }
}

var mtbl  = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
var mnames = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

// End-of-month Julian Day lookup tables for normal and leap years
var jdtbln = new Array(0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334);
var jdtbll = new Array(0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335);

var leap = false;
var jdtbl = jdtbln;
var yearpattern = /^\d{4,5}$/;
var displayStyle = "std";
var abtlinkhidden = true;

function isLeap(year) {
  return (year % 100 != 0) && (year % 4 == 0) || (year % 400 == 0);
}
function julianDay(day, month) {
  return day + jdtbl[month-1];
}

// returns the day of week as an integer: 1=Sun, 2=Mon, ..., 7=Sat
function dayOfWeek(day, month, year) {
  leap = isLeap(year);
  jdtbl = leap? jdtbll : jdtbln;
  var dow = (year + julianDay(day, month)
    + Math.floor((year-1)/4) - Math.floor((year-1)/100)
    + Math.floor((year-1)/400)) % 7;
  return dow == 0? 7: dow;
}

function renderMonth(parent, month, year) {
  var dateCells = $(parent + " div.dt");
  var cellid = dayOfWeek(1, month, year) - 1;
  var max = mtbl[month-1];
  if (max == 28 && leap) max = 29;

  dateCells.eq(cellid++).html(1);
  for (var ix = 2; ix <= max; ix++) {
    dateCells.eq(cellid++).html(ix);
  }
  $(parent + " div.mo").html(mnames[month-1]);
}

function getMonthSequence(mainMonth) {
  var tmp = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);
  if (mainMonth == 0) return tmp;
  
  var monthseq = new Array();
  monthseq.push(mainMonth);
  if (mainMonth == 11) {
    // n+1 isn't possible
    monthseq.push(9);
    monthseq.push(10);
    tmp.splice(9, 3);
  } else {
    monthseq.push(mainMonth-1);
    monthseq.push(mainMonth+1);
    tmp.splice(mainMonth-1, 3);
  }
  return monthseq.concat(tmp);
}

function getIdPrefix(ix) {
  return "#p";
}

function showSelective() {
  $("div#cal").show();
  $("p.prinvis").show();
  $("#mtoprow").show();
}

function renderCalendar(startMonth, stopMonth, year) {
  year = parseInt(year);

  timeDiff.setStartTime();
  var d = new Date();
  var seqargs = 0;
  var monthHtml = $("span#m0").html();
  var monthseq = getMonthSequence(seqargs);

  $("#caltitle").text(year);
  $("title").text(year);
  $('#prev').attr('href', '#' + (year-1)).text(year-1);
  $('#next').attr('href', '#' + (year+1)).text(year+1);

  for (var ix = startMonth-1; ix < stopMonth; ix++) {
    var newId = getIdPrefix(ix) + ix;
    if ($(newId).length == 1) {
      $(newId).html(monthHtml);
      renderMonth(newId, monthseq[ix]+1, year);
    }
  }

  showSelective();

}

// Clock

function convertToHHMM(info) {
  var hrs = parseInt(Number(info));
  var min = Math.round((Number(info)-hrs) * 60);
  return hrs+':'+min;
}



function startTime() {
  var today = new Date();
  var hour = today.getHours();
  var minute = today.getMinutes();
  var second = today.getSeconds();

  if (hour > 12) {
    hour -= 12;
  } else if (hour === 0) {
    hour = 12;
  }

  minute = checkTime(minute);
  second = checkTime(second);
  $('#time').text(hour + ":" + minute + ":" + second);
  t = setTimeout(function(){startTime()},500);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

$(window).on('hashchange', function() {
  if (window.location.hash) {
    var hash = window.location.hash.replace('#', '');
  }

  if(/^\d{4}$/.test(hash)) {
    renderCalendar(1, 12, hash);
  } else {
    renderCalendar(1, 12, year);
  }
});


// Lets get this shit started
$(document).ready(function () {

  if (window.location.hash) {
    var hash = window.location.hash.replace('#', '');
  }

  if(/^\d{4}$/.test(hash)) {
    renderCalendar(1, 12, hash);
  } else {
    renderCalendar(1, 12, new Date().getFullYear());
  }

  startTime();
  
});