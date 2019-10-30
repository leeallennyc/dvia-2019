


let data;
let atmospheric;
let weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let years;


function preload(){
  // sandpData = loadTable('data/sp-500-1945-1963.csv', 'csv', 'header');
  // atmospheric = loadTable('data/usa-atmospheric-1945-1963.csv', 'csv', 'header');
  // highestYieldbyDate = loadTable('data/twenty-highest-yielding-nuclear-tests-by-date.csv', 'csv', 'header');
  // highestYieldbyYield = loadTable('data/twenty-highest-yielding-nuclear-tests-by-yield.csv', 'csv', 'header');
  highestYieldwithPercentageChange = loadTable('data/twenty-highest-yielding-tests-percentage-change.csv', 'csv', 'header');
}
 // setup 
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
  textSize(16);
  fill(30);
  noStroke();

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

// // draw country name labels on the left edge of the table
  // textStyle(BOLD);
  // textAlign(RIGHT);
  // for (let c= 1; c<table5.getColumnCount(); c++){
  //   text(table5.columns[c], x-colWidth, y);
  //   y += rowHeight;
  // }  


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
  
    x = 200;
    y = 0; 
    let increment = 30;

    // Highlight any Bombs that were Tested on Monday
    for (let r=0; r < table5.getRowCount(); r++) {
      let dayofWeek = table5.getString(r, 4); 
      if (dayofWeek === "Monday"){
        fill(255,0,0,);
        rect(x, y + increment, 10, 10);
        // text(dayofWeek, x, y + increment);
        x += colWidth;

      } else { 
        fill(0,0,255, 50);
        rect(x, y +increment, 10, 10);
        // text(dayofWeek, x, y + increment);
        x += colWidth;
      }
    }
  
    x = 200;
    y = 40; 
    // Highlight any Bombs that were Tested on Tuesday
    for (let r=0; r < table5.getRowCount(); r++) {
      let dayofWeek = table5.getString(r, 4); 
      if (dayofWeek === "Tuesday"){
        fill(255,0,0,);
        rect(x, y + increment, 10, 10);
        // text(dayofWeek, x, y + increment);
        x += colWidth;

      } else { 
        fill(0,0,255, 50);
        rect(x, y +increment, 10, 10);
        // text(dayofWeek, x, y + increment);
        x += colWidth;
      }
    }

    x = 200;
    y = 80; 
    // Highlight any Bombs that were Tested on Wednesday
    for (let r=0; r < table5.getRowCount(); r++) {
      let dayofWeek = table5.getString(r, 4); 
      if (dayofWeek === "Wednesday"){
        fill(255,0,0,);
        rect(x, y + increment, 10, 10);
        // text(dayofWeek, x, y + increment);
        x += colWidth;

      } else { 
        fill(0,0,255, 50);
        rect(x, y +increment, 10, 10);
        // text(dayofWeek, x, y + increment);
        x += colWidth;
      }
    }

    x = 200;
    y = 120; 
    // Highlight any Bombs that were Tested on Thursday
    for (let r=0; r < table5.getRowCount(); r++) {
      let dayofWeek = table5.getString(r, 4); 
      if (dayofWeek === "Thursday"){
        fill(255,0,0,);
        rect(x, y + increment, 10, 10);
        // text(dayofWeek, x, y + increment);
        x += colWidth;

      } else { 
        fill(0,0,255, 50);
        rect(x, y +increment, 10, 10);
        // text(dayofWeek, x, y + increment);
        x += colWidth;
      }
    }

    x = 200;
    y = 160; 
    // Highlight any Bombs that were Tested on Friday
    for (let r=0; r < table5.getRowCount(); r++) {
      let dayofWeek = table5.getString(r, 4); 
      if (dayofWeek === "Friday"){
        fill(255,0,0,);
        rect(x, y + increment, 10, 10);
        // text(dayofWeek, x, y + increment);
        x += colWidth;

      } else { 
        fill(0,0,255, 50);
        rect(x, y +increment, 10, 10);
        // text(dayofWeek, x, y + increment);
        x += colWidth;
      }
    }

    x = 200;
    y = 200; 
    // Highlight any Bombs that were Tested on Saturday
    for (let r=0; r < table5.getRowCount(); r++) {
      let dayofWeek = table5.getString(r, 4); 
      if (dayofWeek === "Saturday"){
        fill(255,0,0,);
        rect(x, y + increment, 10, 10);
        // text(dayofWeek, x, y + increment);
        x += colWidth;

      } else { 
        fill(0,0,255, 50);
        rect(x, y +increment, 10, 10);
        // text(dayofWeek, x, y + increment);
        x += colWidth;
      }
    }

    x = 200;
    y = 240; 
    // Highlight any Bombs that were Tested on Sunday
    for (let r=0; r < table5.getRowCount(); r++){
      let dayofWeek = table5.getString(r, 4); 
      if (dayofWeek === "Sunday"){
        fill(255,0,0,);
        rect(x, y + increment, 10, 10);
        // text(dayofWeek, x, y + increment);
        x += colWidth;

      } else { 
        fill(0,0,255, 50);
        rect(x, y +increment, 10, 10);
        // text(dayofWeek, x, y + increment);
        x += colWidth;
      }
    }

    
    
 

 


// // draw year labels in the header row
//   x = 200;
//   y = 80;
//   textStyle(NORMAL)
//   textAlign(BOLD)
//   for (let r=1; r<table5.getRowCount(); r++){
//     let date = table5.getString(r, 0)
//     text(date, x, y-rowHeight)
//     x += colWidth
//   }

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

}





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