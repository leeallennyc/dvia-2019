var data;
var atmospheric;
var thyroidData;


function preload(){
  sandpData = loadTable('data/sp-500-1945-1963.csv', 'csv', 'header');
  atmospheric = loadTable('data/usa-atmospheric-1945-1963.csv', 'csv', 'header');
}
 // setup 
function setup(){
  createCanvas(1000, 5000);
  background(220);

// pick one of the three data files to work with and call it 'table'
  var table = atmospheric;

// log the whole dataset to the console so we can poke around in it
  print(table);

// set up typography
  textFont("Rokkitt");
  textSize(16);
  fill(30);
  noStroke();

  var x = 200;
  var y = 40;
  var rowHeight = 40;
  var colWidth = 40;

// draw country name labels on the left edge of the table
  textStyle(BOLD);
  textAlign(RIGHT);
  for (var c= 0; c<table.getColumnCount(); c++){
    text(table.columns[c], x-colWidth, y);
    y += rowHeight;
  }


// draw year labels in the header row
  x = 200;
  y = 80;
  textStyle(NORMAL)
  textAlign(BOLD)
  for (var r=0; r<table.getRowCount(); r++){
    var date = table.getString(r, 0)
    text(date, x, y-rowHeight)
    x += colWidth
  }


// draw year labels in the header row
x = 200;
y = 120;
textStyle(NORMAL)
textAlign(BOLD)
for (var r=1; r<table.getRowCount(); r++){
  var date = table.getString(r, 0)
  text(date, x, y-rowHeight)
  x += colWidth
}

// // print out the total for each country, one column at a time
//   x = 200
//   for (var r=0; r<table.getRowCount(); r++){
//     y = 100
//     for (var c=1; c<table.getColumnCount(); c++){
//       var value = table.getNum(r, c)
//       text(value, x, y)
//       y += rowHeight
//     }
//     x += colWidth
//   }

}



// Creating row variables from CSV
// var rows = table.getRows()
// for (var r = 0; r < rows.length; r++) {
//   var country = rows[r].getString("country")
//   var date = rows[r].getString("date");
//   var type = rows[r].getString("type");
//   var shot = rows[r].getString("shot");
//   var yeild = rows[r].getNum("yield");
//   var iodine131 = rows[r].getNum("iodine131-released");
// }