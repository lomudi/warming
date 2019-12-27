var table;
let fr = 20;
var data;

function preload() {
  table = loadTable(
    "https://lomudi-playground.s3.us-east-2.amazonaws.com/ds/GlobalLandTemperaturesByMajorCity.csv",
    "csv",
    "header"
  );
  frameRate(fr);
}

function setup() {
  createCanvas(800,800);
  data = tableCleanup(table);
  print(data);
  loop();
}

function draw() {
  background(0);
  stroke(0);

  for (var i = 0; i < data.length; i++) {

    var avgTemp = float(data[i].getString("AverageTemperature"));
    //var date = data[i].getString("dt");
    //var city = data[i].getString("City");
    var long = float(data[i].getString("Longitude"));
    var lat = float(data[i].getString("Latitude"));
    
    var x = map(long,-180,180,0,width);
    var y = map(lat,-90,90,height,0);

    fill(tempColor(avgTemp));
    rect(x, y, avgTemp/2, avgTemp*2);
  }
}

function tempColor(temp) {
  if (temp <= 8) {
    return "#80FF00";
  } else if (temp >= 9 && temp <= 16) {
    return "#FF8000";
  } else if (temp >= 17) {
    return "#CC0000";
  } else {
    return 0;
  }
}

function tableCleanup (tableA) {
    arr = tableA.getRows();
    

    return arr;
}
