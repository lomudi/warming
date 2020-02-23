var dates_table;
var dates;
let fr = 60;
var data = [];
r = 0;
let speed = 1;
let playButton;
let playMap = false;
let slowButton;
let midButton;
let fastButton;

function preload() {
  dates_table = loadTable("../warming-jupyter/dates.csv", "csv", "header");

  frameRate(fr);
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);

  dates = dates_table.getRows();
  for (let index = 0; index < dates.length; index++) {
    const dayX = dates[index].getString(1);
    const dayX_table = loadTableForDay(dayX);
    append(data, dayX_table);
  }

  playButton = createButton("Play/Pause");
  playButton.position(width - 145, 19);
  playButton.mousePressed(playWorldTempMap);

  slowButton = createButton("Slow");
  slowButton.position(width - 180, 39);
  slowButton.mousePressed(slowSpeed);

  midButton = createButton("Mid");
  midButton.position(width - 130, 39);
  midButton.mousePressed(midSpeed);

  fastButton = createButton("Fast");
  fastButton.position(width - 90, 39);
  fastButton.mousePressed(fastSpeed);

  loop();
}

function draw() {
  background(0);
  stroke(0);

  fill(255);
  textSize(25);
  text("Global Temperature 1900-2013", 29, 30);

  fill(255);
  textSize(13);
  text(
    "This visualization is presenting the temperature in majors cities in the world from 1900 to 2013.\nThe data set was taken from Kaggle (License CC BY-NC-SA 4.0).\nIts temperature sets each city color - Green will be smaller than 10 degrees celsius, Orange between 11 to 22 degrees celsius, and Red are larger than 23 degrees celsius.\nhttps://www.kaggle.com/berkeleyearth/climate-change-earth-surface-temperature-data",
    29,
    60
  );

  if (playMap) {
    r = r + speed;
    if (r < dates.length) {
      // draw world heat-map
      var drawDayTable = data[r];
      var drawDay = drawDayTable.getRows();
      for (let index = 0; index < drawDay.length; index++) {
        var date = moment(drawDay[index].getString("dt")).format("MMM YYYY");
        var avgTemp = float(drawDay[index].getString("AverageTemperature"));
        var long = float(drawDay[index].getString("Longitude"));
        var lat = float(drawDay[index].getString("Latitude"));
        var x = map(long, -180, 180, 0, width);
        var y = map(lat, -90, 90, height, 0);
        // present current date
        fill(255);
        textSize(16);
        text(date, width - 145, 79);
        // draw the ellipse
        fill(tempColor(avgTemp));
        ellipse(x, y, 4, 4);
      }
    } else {
      r = 0;
    }
  }
}

function tempColor(temp) {
  if (temp <= 10) {
    return "#03ff46";
  } else if (temp >= 11 && temp <= 22) {
    return "#ff8317";
  } else if (temp >= 23) {
    return "#ff0303";
  } else {
    return 0;
  }
}

function loadTableForDay(date) {
  const loadUrl =
    "../warming-jupyter/chunks/global_temp_per_city_" + date + ".csv";
  const tableForDay = loadTable(loadUrl, "csv", "header");
  return tableForDay;
}

function playWorldTempMap() {
  if (playMap) {
    print("Pause was clicked");
    playButton.text = "Play";
    playMap = false;
  } else {
    print("Play was clicked");
    playButton.text = "Pause";
    playMap = true;
  }
}

function slowSpeed() {
  speed = 1;
  print("running slow");
}

function midSpeed() {
  speed = 3;
  print("running mid");
}

function fastSpeed() {
  speed = 10;
  print("running fast");
}
