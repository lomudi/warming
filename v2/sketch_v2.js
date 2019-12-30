var table;
let fr = 60;
var data;
var numOfDays;
r = 0;

function preload() {
  table = loadTable(
    "https://lomudi-playground.s3.us-east-2.amazonaws.com/ds/GlobalLandTemperaturesByMajorCity.csv",
    "csv",
    "header"
  );
  frameRate(fr);
}

function setup() {
  createCanvas(window.innerWidth - 4, window.innerHeight - 4);
  data = tableCleanup(table);
  print(data);
  numOfDays = getNumOfDays(data);
  loop();
}

function draw() {
  background(255);
  stroke(1);

  r = r + 1;
  if (r < numOfDays) {
    var avgTemp = float(data[r].getString("AverageTemperature"));
    var long = float(data[r].getString("Longitude"));
    var lat = float(data[r].getString("Latitude"));
    var x = map(long, -180, 180, 0, width);
    var y = map(lat, -90, 90, height, 0);
    fill(tempColor(avgTemp));
    rect(x, y, avgTemp, avgTemp * 10);
  }
}

function tempColor(temp) {
  if (temp <= 10) {
    return "#80FF00";
  } else if (temp >= 11 && temp <= 24) {
    return "#FF8000";
  } else if (temp >= 25) {
    return "#CC0000";
  } else {
    return 0;
  }
}

function tableCleanup(tableA) {
  arr = tableA.getRows();
  sortArr = arr.sort(function(a, b) {
    var dateA = new Date(a.dt),
      dateB = new Date(b.dt);
    return dateA - dateB;
  });
  return arr;
}

function getNumOfDays(dataA) {
  days = dataA.length;

  return days;
}
