

// Set up array for Days of the Week
let weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let years = ["1951", "1952", "1953", "1954", "1955", "1956", "1957", "1958", "1959", "1960", "1961", "1962", "1963"];
let pricing = ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"];

// Preload function for CSV files
function preload(){
  highestYieldwithPercentageChange = loadTable('data/twenty-highest-yielding-tests-percentage-change.csv', 'csv', 'header');
  sandpData = loadTable('data/sp-500-1945-1963.csv', 'csv', 'header');
// atmospheric = loadTable('data/usa-atmospheric-1945-1963.csv', 'csv', 'header');
// highestYieldbyDate = loadTable('data/twenty-highest-yielding-nuclear-tests-by-date.csv', 'csv', 'header');
// highestYieldbyYield = loadTable('data/twenty-highest-yielding-nuclear-tests-by-yield.csv', 'csv', 'header');
}
// setup Canvas and Background
function setup(){
  createCanvas(2000, 5000); //<-- SVG added after 5000 for export
  background(255);

// pick one of the five data files to work with and call it 'table#'
  // let table = atmospheric;
  let table2 = sandpData;
  // let table3 = highestYieldbyDate;
  // let table4 = highestYieldbyYield;
  let table5 = highestYieldwithPercentageChange;

// log 5 datasets to the console so we can poke around in it
  // print(table);
  print(table2);
  // print(table3);
  // print(table4);
  print(table5);

// let palette = Brewer.qualitative('Set1', table.columns);

// set up typography
  textFont("Rokkitt");
  textSize(14);
  fill(60);
  noStroke();

  // set up x, y, rowHeight, and colWidth
  let x = 200;
  let y = 140;
  let rowHeight = 40;
  let rowHeight2 = 50;
  let colWidth = 75;
  let colWidth2 = 100;


// draw the Weekdays as a Lefthand column. 
  textStyle(BOLD);
  textAlign(CENTER);
  for (let i = 0; i<weekDays.length; i++) {
    text(weekDays[i], x-colWidth,y);
    y += rowHeight;
  } 

  x=200;
  y=960;
// draw the change in price in dollars on the Lefthand column
  textStyle(BOLD);
  textAlign(CENTER);
  for (let p = 0; p < pricing.length; p++) {
    text(pricing[p], x-colWidth,y);
    y -= rowHeight2;
  } 


// // Draw the 1945 -1963 Date range across the bottom X Axis
// x = 200;
// y = 1050;
// textStyle(BOLD);
// textSize(14);
// textAlign(CENTER);
// for (let s=0; s<years.length; s++){
//   text(years[s], x, y-rowHeight);
//    x += colWidth2;
// }


// draw a rectangle to frame the s&p chart below
rect(150, 525, 1600, 460);

// draw the date range and bomb name on the "x" axis below the week days
x = 200;
y = 1050;
textStyle(BOLD);
textSize(14);
textAlign(CENTER);
for (let t=0; t<table5.getRowCount(); t++){
  let date = table5.getString(t, 2);
  let bombName = table5.getString(t ,1);
  text(date, x, y-rowHeight);
  text(bombName, x, y + 20-rowHeight);
   x += colWidth;
}

// draw the date range and bomb name on the "x" axis below the week days
  x = 200;
  y = 460;
  textStyle(BOLD);
  textSize(14);
  textAlign(CENTER);
  for (let d=0; d<table5.getRowCount(); d++){
    let date = table5.getString(d, 2);
    let bombName = table5.getString(d ,1);
    text(date, x, y-rowHeight);
    text(bombName, x, y + 20-rowHeight);
     x += colWidth;
  }

// Set the x and y coordinates, increment and opactity for the below loops.
  x = 200;
  y = 100; 
  let increment = 35;
  let opacityforVoids = 1;
  let opacityforYields = 95;
  yieldfactor = 500;

// Highlight any Bombs that were Tested on Monday by Country
  for (let r=0; r < table5.getRowCount(); r++) {
    let dayofWeek = table5.getString(r, 4);
    let country = table5.getString(r, 0);
    let bombYield = table5.getString(r, 3);
    let sandpPrice = table5.getString(r, 6);
    let sandpweeklyChange = table5.getString(r, 8);
    let sandpChangeSinceLastBomb = table5.getString(r, 9);

    // Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Monday" && country === "ussr"){
      fill(255,0,0,opacityforYields);
      ellipse(x, y + increment, bombYield/yieldfactor, bombYield/yieldfactor);
      x += colWidth; 
    } else if (dayofWeek === "Monday" && country === "usa"){ 
      fill(0,255,0,opacityforYields);
      ellipse(x, y +increment, bombYield/yieldfactor, bombYield/yieldfactor);
      x += colWidth;
    } else {
      fill(0,0,0,opacityforVoids);
      ellipse(x, y +increment, bombYield/yieldfactor, bombYield/yieldfactor);
      x += colWidth;
    }
  }

 // Reset X and Y
  x = 200;
  y = 140; 
  // Highlight any Bombs that were Tested on Tuesday by County
  for (let r=0; r < table5.getRowCount(); r++) {
    let dayofWeek = table5.getString(r, 4);
    let country = table5.getString(r, 0);
    let bombYield = table5.getString(r,3);
    // Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Tuesday" && country === "ussr"){
      fill(255,0,0,opacityforYields);
      ellipse(x, y + increment, bombYield/yieldfactor, bombYield/yieldfactor);
      x += colWidth;
    } else if (dayofWeek === "Tuesday" && country === "usa"){ 
      fill(0,0,255,opacityforYields);
      ellipse(x, y +increment, bombYield/yieldfactor, bombYield/yieldfactor);
      x += colWidth;
    } else {
      fill(0,0,0,opacityforVoids);
      ellipse(x, y +increment, bombYield/yieldfactor, bombYield/yieldfactor);
      x += colWidth;
    }
  }

// Reset X and Y
  x = 200;
  y = 180; 
    // Highlight any Bombs that were Tested on Wed by Country
    for (let r=0; r < table5.getRowCount(); r++) {
    let dayofWeek = table5.getString(r, 4);
    let country = table5.getString(r, 0);
    let bombYield = table5.getString(r,3);
    // Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Wednesday" && country === "ussr"){
      fill(255,0,0,opacityforYields);
      ellipse(x, y + increment, bombYield/yieldfactor, bombYield/yieldfactor);
      x += colWidth;
    } else if (dayofWeek === "Wednesday" && country === "usa"){ 
      fill(0,0,255,opacityforYields);
      ellipse(x, y +increment, bombYield/yieldfactor, bombYield/yieldfactor);
      x += colWidth;
    } else {
      fill(0,0,0,opacityforVoids);
      ellipse(x, y +increment, bombYield/yieldfactor, bombYield/yieldfactor);
      x += colWidth;
    }
  }

// Reset X and Y
  x = 200;
  y = 220; 
    // Highlight any Bombs that were Tested on Thurs by Country
    for (let r=0; r < table5.getRowCount(); r++) {
      let dayofWeek = table5.getString(r, 4);
      let country = table5.getString(r, 0);
      let bombYield = table5.getString(r,3);
      // Loop through and determine match between country and day of week and color accordingly
      if (dayofWeek === "Thursday" && country === "ussr"){
        fill(255,0,0,opacityforYields);
        ellipse(x, y + increment, bombYield/yieldfactor, bombYield/yieldfactor);
        x += colWidth;
      } else if (dayofWeek === "Thursday" && country === "usa"){ 
        fill(0,0,255,opacityforYields);
        ellipse(x, y +increment, bombYield/yieldfactor, bombYield/yieldfactor);
        x += colWidth;
      } else {
        fill(0,0,0,opacityforVoids);
        ellipse(x, y +increment, bombYield/yieldfactor, bombYield/yieldfactor);
        x += colWidth;
      }
    }

// Reset X and Y
  x = 200;
  y = 260; 
  // Highlight any Bombs that were Tested on Friday by Country
    for (let r=0; r < table5.getRowCount(); r++) {
    let dayofWeek = table5.getString(r, 4);
    let country = table5.getString(r, 0);
    let bombYield = table5.getString(r,3);
    // Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Friday" && country === "ussr"){
      fill(255,0,0,opacityforYields);
      ellipse(x, y + increment, bombYield/yieldfactor, bombYield/yieldfactor);
      x += colWidth;
    } else if (dayofWeek === "Friday" && country === "usa"){ 
      fill(0,0,255,opacityforYields);
      ellipse(x, y +increment, bombYield/yieldfactor, bombYield/yieldfactor);
      x += colWidth;
    } else {
      fill(0,0,0,opacityforVoids);
      ellipse(x, y +increment, bombYield/yieldfactor, bombYield/yieldfactor);
      x += colWidth;
    }
  }

// Reset X and Y
  x = 200;
  y = 300; 
  // Highlight any Bombs that were Tested on Saturday by Country
  for (let r=0; r < table5.getRowCount(); r++) {
    let dayofWeek = table5.getString(r, 4);
    let country = table5.getString(r, 0);
    let bombYield = table5.getString(r,3);
    // Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Saturday" && country === "ussr"){
      fill(255,0,0,opacityforYields);
      ellipse(x, y + increment, bombYield/yieldfactor, bombYield/yieldfactor);
      x += colWidth;
    } else if (dayofWeek === "Saturday" && country === "usa"){ 
      fill(0,0,255,opacityforYields);
      ellipse(x, y +increment, bombYield/yieldfactor, bombYield/yieldfactor);
      x += colWidth;
    } else {
      fill(0,0,0,opacityforVoids);
      ellipse(x, y +increment, bombYield/yieldfactor, bombYield/yieldfactor);
      x += colWidth;
    }
  }
  
// Reset X and Y
  x = 200;
  y = 340; 
  // Highlight any Bombs that were Tested on Sunday by Country
  for (let r=0; r < table5.getRowCount(); r++) {
    let dayofWeek = table5.getString(r, 4);
    let country = table5.getString(r, 0);
    let bombYield = table5.getString(r,3);
    // Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Sunday" && country === "ussr"){
      fill(255,0,0,opacityforYields);
      ellipse(x, y + increment, bombYield/yieldfactor, bombYield/yieldfactor);
      x += colWidth;
    } else if (dayofWeek === "Sunday" && country === "usa"){ 
      fill(0,0,255,opacityforYields);
      ellipse(x, y +increment, bombYield/yieldfactor, bombYield/yieldfactor);
      x += colWidth;
    } else {
      fill(0,0,0,opacityforVoids);
      ellipse(x, y +increment, bombYield/yieldfactor, bombYield/yieldfactor);
      x += colWidth;
    }
  }
  // save('concept-3.svg')
}


// draw squares in X Axis
// x = 200;
// y = 75;
// textStyle(NORMAL);
// textAlign(BOLD);
// for (let r=0; r<table5.getRowCount(); r++){
//   let date = table5.getString(r, 0);
//   noFill();
//   strokeWeight(.5);
//   stroke(180);
//   rect(x, y-rowHeight, 10, 10);
//   x += colWidth
// }

// print out the total for each country, one column at a time
  // x = 200;
  // for (let r = 0; r<table5.getRowCount(); r++){
  //   y = 40;
  //   for (let c = 4; c<table5.getColumnCount(); c++){
  //     let value = table5.getString(r, c);
  //     // let name = table5.columns[i];
  //     // let clr = palette.colorForValue(name
  //     // fill();
     
  //     // noFill();
  //     // strokeWeight(.5);
  //     // stroke(60);
  //     // rect(x, y + 30 - rowHeight, 10, 10);
  //     text(value, x, y);
  //     y += rowHeight;
  //   }
  //   x += colWidth;
  // }







// Creating row variables from CSV
// let rows = table.getRows()
// for (let r = 0; r < rows.length; r++) {
//   let country = rows[r].getString("country")
//   let date = rows[r].getString("date");
//   let type = rows[r].getString("type");
//   let shot = rows[r].getString("shot");
//   let yeild = rows[r].getNum("yield");
//   let iodine131 = rows[r].getNum("iodine131-released");
// }



// Color sample
/*
 SYNTAX
 let palette = Brewer.sequential(paletteName, numColors, minValue, maxValue)
 let palette = Brewer.divergent(paletteName, numColors, minValue, midpoint, maxValue)
 let palette = Brewer.qualitative(paletteName, numColors)
               -or-
 let palette = Brewer.qualitative(paletteName, ['list','with','every','category','name'])

 SEQUENTIAL PALETTE NAMES
 YlGn, YlGnBu, GnBu, BuGn, PuBuGn, PuBu, BuPu, RdPu, PuRd, OrRd, YlOrRd, YlOrBr,
 Purples, Blues, Greens, Oranges, Reds, Greys

 DIVERGENT PALETTE NAMES
 PuOr, BrBG, PRGn, PiYG, RdBu, RdGy, RdYlBu, Spectral, RdYlGn

 QUALITATIVE PALETTE NAMES
 Accent, Dark2, Paired, Pastel1, Pastel2, Set1, Set2, Set3
*/

// function setup() {
//   createCanvas(400, 200);
//   background(220);
//   noLoop()
// }

// function draw() {
//   // on the left, draw a gradient with 9 shades drawn from the red sequential palette
//   let pal = Brewer.sequential ('YlGnBu', Infinity, 0, 200) <-- last two numbers are like using map
//   
//   for (let i=0; i<200; i++){
//       noStroke()
//       fill(pal.colorForValue(i))
//       rect(0,i, width/2,i+1)
//   }

//   // on the right, draw a gradient with 'infinite' (i.e., interpolated) shades drawn from
//   // the red-yellow-green divergent palette
//   let pal2 = Brewer.divergent('RdYlGn', Infinity, 0, 66, 200) <---- middle number is the parting line
//   for (let i=0; i<200; i++){
//       noStroke()
//       fill(pal2.colorForValue(i))
//       rect(width/2,i, width,i+1)
//   }
// }
