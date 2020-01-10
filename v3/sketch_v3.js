var table;
let fr = 60;
var data;
r = 0;
let slider;

function preload() {
  table = loadTable(
    "https://lomudi-playground.s3.us-east-2.amazonaws.com/ds/global_temp_per_day_per_city.csv",
    "csv",
    "header"
  );
  frameRate(fr);
}

function setup() {
  createCanvas(window.innerWidth - 4, window.innerHeight - 4);
  data = table.getRows();
  
  slider = createSlider(1, 365, 1);
  slider.position(25, 50);
  slider.style('width', '80px');

  loop();
}

function draw() {
  background(0);
  stroke(1);

  r = r + slider.value();

  if (r < data.length) {
    var date = moment(data[r].getString("dt")).format('MMM YYYY');
    var avgTemp = float(data[r].getString("AverageTemperature"));
    var long = float(data[r].getString("Longitude"));
    var lat = float(data[r].getString("Latitude"));
    var x = map(long, -180, 180, 0, width);
    var y = map(lat, -90, 90, height, 0);
    fill(tempColor(avgTemp));
    ellipse(x, y, avgTemp * 10, avgTemp * 10);
    textSize(24);
    text(date, 10, 30);
  } else {
    r = 0;
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