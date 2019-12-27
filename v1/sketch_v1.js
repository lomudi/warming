var table;
let fr = 60;
var rows;
var sortedRows;
var sortedRowsCount;

function preload() {
  table = loadTable(
    "/climate-change-earth-surface-temperature-data/GlobalTemperatures.csv",
    "csv",
    "header"
  );
  frameRate(fr);
}

function setup() {
  createCanvas(800, 800);
  rows = table.getRows();
  sortedRows = rows.sort((a, b) => b.dt - a.dt);
  sortedRowsCount = sortedRows.length;
  loop();
}

function draw() {
  background(0);
  stroke(0);

  for (var i = 0; i < sortedRowsCount; i++) {
    var avgTemp = float(sortedRows[i].getString("LandAverageTemperature"));
    var date = sortedRows[i].getString("dt");
    var randomY = random(800);
    fill(tempColor(avgTemp));
    rect(i, randomY, avgTemp * 10, avgTemp * 50);
  }
}

function tempColor(temp) {
  if (temp <= 5) {
    return "#80FF00";
  } else if (temp >= 6 && temp <= 11) {
    return "#FF8000";
  } else if (temp >= 12) {
    return "#CC0000";
  } else {
    return 0;
  }
}
