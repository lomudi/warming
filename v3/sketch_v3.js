var dates_table;
var dates;
let fr = 60;
var data = [];
r = 0;
let slider;

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

  slider = createSlider(1, 365, 3);
  slider.position(width * 0.5, 65);
  slider.style("width", "80px");

  loop();
}

function draw() {
  background(0);
  stroke(0);

  r = r + slider.value();
  if (r < dates.length) {
    // draw world heat-map
    //var date = dates[r].getString(1);
    var drawDayTable = data[r];
    var drawDay = drawDayTable.getRows();
    //print(drawDay);
    for (let index = 0; index < drawDay.length; index++) {
      var date = moment(drawDay[index].getString("dt")).format("MMM YYYY");
      var avgTemp = float(drawDay[index].getString("AverageTemperature"));
      var long = float(drawDay[index].getString("Longitude"));
      var lat = float(drawDay[index].getString("Latitude"));
      var x = map(long, -180, 180, 0, width);
      var y = map(lat, -90, 90, height, 0);
      // present current date
      fill(255);
      textSize(24);
      text(date, width * 0.5, 45);
      // draw the ellipse
      fill(tempColor(avgTemp));
      ellipse(x, y, 4, 4);
    }
  } else {
    r = 0;
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
