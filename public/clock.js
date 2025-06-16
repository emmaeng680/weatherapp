
// Work on the clock and the time
var diallines = document.getElementsByClassName('diallines');
var clockE1 = document.getElementsByClassName('clock')[0];

// Draw all 60 clock ticks
for (var i = 1; i < 60; i++) {
  clockE1.innerHTML += "<div class='diallines'></div>";
  diallines[i].style.transform = "rotate(" + 6 * i + "deg)";
}

// Function to update the details in the clock
function clock() {
  var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],

    //Variables for time
    d = new Date;
  hr = d.getHours();
  min = d.getMinutes();
  sec = d.getSeconds();
  day = d.getDay();

  //Variables for day
  var options = {
    day: "numeric",
    month: "numeric",
    year: "numeric"
  };

  var currentDay= d.toLocaleDateString("en-US", options)

  //Variables for degrees
  hrDeg = (hr * 30) + (min * (360 / 720));
  minDeg = (min * 6);
  secDeg = (sec * 6);

  // Variable for the name of the current weekday
  days = weekday[day];

  // Transform the clock hands with respect to current time
  document.querySelector(".hour-hand").style.transform = "rotate(" + hrDeg + "deg)";
  document.querySelector(".min-hand").style.transform = "rotate(" + minDeg + "deg)";
  document.querySelector(".sec-hand").style.transform = "rotate(" + secDeg + "deg)";

  // Update date and day likewise
  document.querySelector(".date").innerHTML = currentDay;
  document.querySelector(".day").innerHTML = days;

  // Update the digital clock
  document.querySelector(".digital").innerHTML = get2D(hr) + ":" + get2D(min) + ":" + get2D(sec);
}

// Function to add zero before a single digit
function get2D(num) {
  return (num.toString().length < 2 ? "0" + num : num);
}

// function refreshes every 50ms
setInterval(clock, 50);
