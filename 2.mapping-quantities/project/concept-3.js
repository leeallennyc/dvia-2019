// Set up array for Days of the Week
let weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Preload function for CSV files
function preload(){
  highestYieldwithPercentageChange = loadTable('data/twenty-highest-yielding-tests-percentage-change.csv', 'csv', 'header');
// sandpData = loadTable('data/sp-500-1945-1963.csv', 'csv', 'header');
// atmospheric = loadTable('data/usa-atmospheric-1945-1963.csv', 'csv', 'header');
// highestYieldbyDate = loadTable('data/twenty-highest-yielding-nuclear-tests-by-date.csv', 'csv', 'header');
// highestYieldbyYield = loadTable('data/twenty-highest-yielding-nuclear-tests-by-yield.csv', 'csv', 'header');
}
// setup Canvas and Background
function setup(){
  createCanvas(2000, 5000);
  background(255);

// pick one of the five data files to work with and call it 'table#'
  // let table = atmospheric;
  // let table2 = sandpData;
  // let table3 = highestYieldbyDate;
  // let table4 = highestYieldbyYield;
  let table5 = highestYieldwithPercentageChange;

// log 5 datasets to the console so we can poke around in it
  // print(table);
  // print(table2);
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
  let y = 40;
  let rowHeight = 40;
  let colWidth = 75;


// draw the Weekdays as a Lefthand column. 
  textStyle(BOLD);
  textAlign(CENTER);
  for (let i = 0; i<weekDays.length; i++) {
    text(weekDays[i], x-colWidth,y);
    y += rowHeight;
  } 

// draw the date range and bomb name on the "x" axis below the week days
  x = 200;
  y = 360;
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
  y = 0; 
  let increment = 30;
  let opacity = 10;

// Highlight any Bombs that were Tested on Monday by Country
  for (let r=0; r < table5.getRowCount(); r++) {
    let dayofWeek = table5.getString(r, 4);
    let country = table5.getString(r, 0);
    // Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Monday" && country === "ussr"){
      fill(255,0,0);
      rect(x, y + increment, 10, 10);
      x += colWidth;
    } else if (dayofWeek === "Monday" && country === "usa"){ 
      fill(0,255,0);
      rect(x, y +increment, 10, 10);
      x += colWidth;
    } else {
      fill(0,0,0,opacity);
      rect(x, y +increment, 10, 10);
      x += colWidth;
    }
  }

 // Reset X and Y
  x = 200;
  y = 40; 
  // Highlight any Bombs that were Tested on Tuesday by County
  for (let r=0; r < table5.getRowCount(); r++) {
    let dayofWeek = table5.getString(r, 4);
    let country = table5.getString(r, 0);
    // Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Tuesday" && country === "ussr"){
      fill(255,0,0);
      rect(x, y + increment, 10, 10);
      x += colWidth;
    } else if (dayofWeek === "Tuesday" && country === "usa"){ 
      fill(0,0,255);
      rect(x, y +increment, 10, 10);
      x += colWidth;
    } else {
      fill(0,0,0,opacity);
      rect(x, y +increment, 10, 10);
      x += colWidth;
    }
  }

// Reset X and Y
  x = 200;
  y = 80; 
    // Highlight any Bombs that were Tested on Wed by Country
    for (let r=0; r < table5.getRowCount(); r++) {
    let dayofWeek = table5.getString(r, 4);
    let country = table5.getString(r, 0);
    // Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Wednesday" && country === "ussr"){
      fill(255,0,0);
      rect(x, y + increment, 10, 10);
      x += colWidth;
    } else if (dayofWeek === "Wednesday" && country === "usa"){ 
      fill(0,0,255);
      rect(x, y +increment, 10, 10);
      x += colWidth;
    } else {
      fill(0,0,0,opacity);
      rect(x, y +increment, 10, 10);
      x += colWidth;
    }
  }

// Reset X and Y
  x = 200;
  y = 120; 
    // Highlight any Bombs that were Tested on Thurs by Country
    for (let r=0; r < table5.getRowCount(); r++) {
      let dayofWeek = table5.getString(r, 4);
      let country = table5.getString(r, 0);
      // Loop through and determine match between country and day of week and color accordingly
      if (dayofWeek === "Thursday" && country === "ussr"){
        fill(255,0,0);
        rect(x, y + increment, 10, 10);
        x += colWidth;
      } else if (dayofWeek === "Thursday" && country === "usa"){ 
        fill(0,0,255);
        rect(x, y +increment, 10, 10);
        x += colWidth;
      } else {
        fill(0,0,0,opacity);
        rect(x, y +increment, 10, 10);
        x += colWidth;
      }
    }

// Reset X and Y
  x = 200;
  y = 160; 
  // Highlight any Bombs that were Tested on Friday by Country
    for (let r=0; r < table5.getRowCount(); r++) {
    let dayofWeek = table5.getString(r, 4);
    let country = table5.getString(r, 0);
    // Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Friday" && country === "ussr"){
      fill(255,0,0);
      rect(x, y + increment, 10, 10);
      x += colWidth;
    } else if (dayofWeek === "Friday" && country === "usa"){ 
      fill(0,0,255);
      rect(x, y +increment, 10, 10);
      x += colWidth;
    } else {
      fill(0,0,0,opacity);
      rect(x, y +increment, 10, 10);
      x += colWidth;
    }
  }

// Reset X and Y
  x = 200;
  y = 200; 
  // Highlight any Bombs that were Tested on Saturday by Country
  for (let r=0; r < table5.getRowCount(); r++) {
    let dayofWeek = table5.getString(r, 4);
    let country = table5.getString(r, 0);
    // Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Saturday" && country === "ussr"){
      fill(255,0,0);
      rect(x, y + increment, 10, 10);
      x += colWidth;
    } else if (dayofWeek === "Saturday" && country === "usa"){ 
      fill(0,0,255);
      rect(x, y +increment, 10, 10);
      x += colWidth;
    } else {
      fill(0,0,0,opacity);
      rect(x, y +increment, 10, 10);
      x += colWidth;
    }
  }
  
// Reset X and Y
  x = 200;
  y = 240; 
  // Highlight any Bombs that were Tested on Sunday by Country
  for (let r=0; r < table5.getRowCount(); r++) {
    let dayofWeek = table5.getString(r, 4);
    let country = table5.getString(r, 0);
    // Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Sunday" && country === "ussr"){
      fill(255,0,0);
      rect(x, y + increment, 10, 10);
      x += colWidth;
    } else if (dayofWeek === "Sunday" && country === "usa"){ 
      fill(0,0,255);
      rect(x, y +increment, 10, 10);
      x += colWidth;
    } else {
      fill(0,0,0,opacity);
      rect(x, y +increment, 10, 10);
      x += colWidth;
    }
  }
}
