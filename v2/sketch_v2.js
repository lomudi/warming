var table;
let fr = 600;
var data;
r = 0;

function preload() {
  table = loadTable(
    "https://lomudi-playground.s3.us-east-2.amazonaws.com/ds/global_temp_per_day_per_city.csv",
    "csv",
    "header"
  );
  frameRate(fr);
}

function setup() {
  createCanvas(800, 800);
  data = table.getRows();
  print(data.length);
  loop();
}

function draw() {
  background(0);
  stroke(1);

  r = r + 1;
  if (r < data.length) {
    var avgTemp = float(data[r].getString("AverageTemperature"));
    var long = float(data[r].getString("Longitude"));
    var lat = float(data[r].getString("Latitude"));
    var x = map(long, -180, 180, 0, width);
    var y = map(lat, -90, 90, height, 0);
    fill(tempColor(avgTemp));
    rect(x, y, avgTemp, avgTemp * 10);
  } else {
    noLoop();
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