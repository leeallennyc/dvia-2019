  // Set up array for Days of the Week
let numofDays = 365;
let weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let fiveYearSpan = ["1945", "1950", "1955", "1960", "1965", "1970", "1975","1980", "1985", "1990", "1995", "2000","2005", "2010", "2015"];
let years = ["1945", "1946", "1947", "1948", "1949", "1950", "1951", "1952", "1953", "1954", "1955", "1956",
    "1957", "1958", "1959", "1960", "1961", "1962", "1963", "1964", "1965", "1966", "1967", "1968", "1969", "1970", "1971", "1972",
    "1973", "1974", "1975", "1976", "1977", "1978", "1979", "1980", "1981", "1982", "1983", "1984", "1985", "1986", "1987", "1988",
    "1989", "1990", "1991", "1992","1993", "1994", "1995", "1996", "1997","1998", "1999", "2000", "2001", "2002", "2003", "2004",  
    "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017"];
// Preload function for CSV files
function preload(){
// highestYieldwithPercentageChange = loadTable('data/twenty-highest-yielding-tests-percentage-change.csv', 'csv', 'header');
// highestYieldbyYield = loadTable('data/twenty-highest-yielding-nuclear-tests-by-yield.csv', 'csv', 'header');
  usaDayofWeek = loadTable('data/Usa-dayofweek-cleaned.csv', 'csv', 'header');
  ussrDayofWeek = loadTable('data/Ussr-dayofweek-cleaned.csv', 'csv', 'header');
  ukDayofWeek = loadTable('data/Uk-dayofweek-cleaned.csv', 'csv', 'header');
  franceDayofWeek = loadTable('data/France-dayofweek-cleaned.csv', 'csv', 'header');
  chinaDayofWeek = loadTable('data/china-dayofweek-cleaned.csv', 'csv', 'header');
  countryWeekDayandTimeCount = loadTable('data/country-weekdaycount.csv', 'csv', 'header');
}
// setup Canvas and Background
function setup(){
  createCanvas(5000, 5000);
  background(255);

// pick one of the five data files to work with and call it 'table#'
    let table1 = usaDayofWeek;
    let table2 = ussrDayofWeek;
    let table3 = ukDayofWeek;
    let table4 = franceDayofWeek;
    let table5 = chinaDayofWeek;
    let table6 = countryWeekDayandTimeCount;
    // let table7 = highestYieldwithPercentageChange;

// log 7 datasets to the console so we can poke around in it
  print(table1);
  print(table2);
  print(table3);
  print(table4);
  print(table5);
  print(table6);
//   print(table7);

// let palette = Brewer.qualitative('Set1', table.columns);

// set up typography
  textFont("Rokkitt");
  textSize(14);
  fill(60);
  noStroke();

  // set up x, y, rowHeight, and colWidth
  let x = 200;
  let y = 50;
  let rowHeight = 40;
  let colWidth = 65;
  let colWidth2 = 5;


// draw the Weekdays as a Lefthand column. 
  textStyle(BOLD);
  textAlign(CENTER);
  for (let i = 0; i<weekDays.length; i++) {
    text(weekDays[i], x-100, y);
    y += rowHeight;
  } 

//   Set increment and opacity
  let increment = 40;
  let opacity = 90;
    
// draw five year span across the bottom of the "x" axis
  x = 200;
  y = 360;
  textStyle(BOLD);
  textSize(12);
  textAlign(CENTER);
    for (let d = 0; d<fiveYearSpan.length; d++){
        text(fiveYearSpan[d], x, y-rowHeight);
         x += colWidth;
  }


//  Draw time ticks to fit to the 5 year span
  x = 200;
  y = 375;
    for (let t = 0; t < fiveYearSpan.length; t++){
        fill(255,0,0);
        stroke(255);
        rect(x, y - rowHeight, 2,10);
        x += colWidth;
    }

//  Draw time yearly ticks to fit to with the 5 year span
x = 201;
y = 380;
  for (let m = 0; m < years.length-2; m++){
      fill(255,0,0);
      stroke(255);
      ellipse(x, y - rowHeight, 2,2);
      x += colWidth/5; 
  }

// Monday USA
x = 200;
y = 0;

for (let r=0; r < table1.getRowCount(); r++) {
        let dayofWeek = table1.getString(r, 2);
    // let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
    // print(maptableToYearsLength);
    // Loop through and determine match between country and day of week and color accordingly
        if (dayofWeek === "Monday"){
        fill('blue');
        rect(x, y + increment, 2, 20);
        x += 5;
        // } else {
        // fill(100);
        // rect(x, y + increment, 1.25, 15);
        // x += 1;
        // }
    }
}


// Tuesday USA
x = 200;
y = 40;
for (let r=0; r < table1.getRowCount(); r++) {
    let dayofWeek = table1.getString(r, 2);
// let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
// print(maptableToYearsLength);
// Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Tuesday"){
    fill('blue');
    rect(x, y + increment, 2, 20);
    x += colWidth2;
    // } else {
    // fill(100);
    // rect(x, y + increment, 1.25, 15);
    // x += 1;
    // }
    }
}

// Wed USA
x = 200;
y = 80;
for (let r=0; r < table1.getRowCount(); r++) {
    let dayofWeek = table1.getString(r, 2);
// let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
// print(maptableToYearsLength);
// Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Wednesday"){
    fill('blue');
    rect(x, y + increment, 2, 20);
    x += colWidth2;
    // } else {
    // fill(100);
    // rect(x, y + increment, 1.25, 15);
    // x += 1;
    // }
    }
}

// Thursday USA
x = 200;
y = 120;
for (let r=0; r < table1.getRowCount(); r++) {
    let dayofWeek = table1.getString(r, 2);
// let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2)
// print(maptableToYearsLength);
// Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Thursday"){
    fill('blue');
    rect(x, y + increment, 2, 20);
    x += colWidth2;
    // } else {
    // fill(100);
    // rect(x, y + increment, 1.25, 15);
    // x += 1;
    // }
    }
}

// Friday USA
x = 200;
y = 160;
for (let r=0; r < table1.getRowCount(); r++) {
    let dayofWeek = table1.getString(r, 2);
// let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
// print(maptableToYearsLength);
// Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Friday"){
    fill('blue');
    rect(x, y + increment, 2, 20);
    x += colWidth2;
    // } else {
    // fill(100);
    // rect(x, y + increment, 1.25, 15);
    // x += 1;
    // }
    }
}

// Saturday USA
x = 200;
y = 200;
for (let r=0; r < table1.getRowCount(); r++) {
    let dayofWeek = table1.getString(r, 2);
// let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2)
// print(maptableToYearsLength);
// Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Saturday"){
    fill('blue');
    rect(x, y + increment, 2, 20);
    x += colWidth2;
    // } else {
    // fill(100);
    // rect(x, y + increment, 1.25, 15);
    // x += 1;
    // }
    }
}

// Sunday USA
x = 200;
y = 240;
for (let r=0; r < table1.getRowCount(); r++) {
    let dayofWeek = table1.getString(r, 2);
// let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
// print(maptableToYearsLength);
// Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Sunday"){
    fill('blue');
    rect(x, y + increment, 2, 20);
    x += colWidth2;
    // } else {
    // fill(100);
    // rect(x, y + increment, 1.25, 15);
    // x += 1;
    // }
    }
}

// USSR
// Monday USSR
x = 200;
y = 360;

for (let r=0; r < table2.getRowCount(); r++) {
        let dayofWeek = table2.getString(r, 2);
    // let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
    // print(maptableToYearsLength);
    // Loop through and determine match between country and day of week and color accordingly
        if (dayofWeek === "Monday"){
        fill('red');
        rect(x, y + increment, 2, 20);
        x += 5;
        // } else {
        // fill(100);
        // rect(x, y + increment, 1.25, 15);
        // x += 1;
        // }
    }
}


// Tuesday USSR
x = 200;
y = 400;
for (let r=0; r < table2.getRowCount(); r++) {
    let dayofWeek = table2.getString(r, 2);
// let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
// print(maptableToYearsLength);
// Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Tuesday"){
    fill('red');
    rect(x, y + increment, 2, 20);
    x += colWidth2;
    // } else {
    // fill(100);
    // rect(x, y + increment, 1.25, 15);
    // x += 1;
    // }
    }
}

// Wed USSR
x = 200;
y = 440;
for (let r=0; r < table2.getRowCount(); r++) {
    let dayofWeek = table2.getString(r, 2);
// let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
// print(maptableToYearsLength);
// Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Wednesday"){
    fill('red');
    rect(x, y + increment, 2, 20);
    x += colWidth2;
    // } else {
    // fill(100);
    // rect(x, y + increment, 1.25, 15);
    // x += 1;
    // }
    }
}

// Thursday USSR
x = 200;
y = 480;
for (let r=0; r < table2.getRowCount(); r++) {
    let dayofWeek = table2.getString(r, 2);
// let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);

// print(maptableToYearsLength);
// Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Thursday"){
    fill('red');
    rect(x, y + increment, 2, 20);
    x += colWidth2;
    // } else {
    // fill(100);
    // rect(x, y + increment, 1.25, 15);
    // x += 1;
    // }
    }
}

// Friday USSR
x = 200;
y = 520;
for (let r=0; r < table2.getRowCount(); r++) {
    let dayofWeek = table2.getString(r, 2);
// let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);

// print(maptableToYearsLength);
// Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Friday"){
    fill('red');
    rect(x, y + increment, 2, 20);
    x += colWidth2;
    // } else {
    // fill(100);
    // rect(x, y + increment, 1.25, 15);
    // x += 1;
    // }
    }
}


// Saturday USSR
x = 200;
y = 560;
for (let r=0; r < table2.getRowCount(); r++) {
    let dayofWeek = table2.getString(r, 2);
// let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);

// print(maptableToYearsLength);
// Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Saturday"){
    fill('red');
    rect(x, y + increment, 2, 20);
    x += colWidth2;
    // } else {
    // fill(100);
    // rect(x, y + increment, 1.25, 15);
    // x += 1;
    // }
    }
}


// Sunday USSR
x = 200;
y = 600;
for (let r=0; r < table2.getRowCount(); r++) {
    let dayofWeek = table2.getString(r, 2);
// let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
// print(maptableToYearsLength);
// Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Sunday"){
    fill('red');
    rect(x, y + increment, 2, 20);
    x += colWidth2;
    // } else {
    // fill(100);
    // rect(x, y + increment, 1.25, 15);
    // x += 1;
    // }
    }
}

// UK
// Monday UK
x = 200;
y = 680;

for (let r=0; r < table3.getRowCount(); r++) {
        let dayofWeek = table3.getString(r, 2);
    // let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
    // print(maptableToYearsLength);
    // Loop through and determine match between country and day of week and color accordingly
        if (dayofWeek === "Monday"){
        fill('green');
        rect(x, y + increment, 2, 20);
        x += 5;
        // } else {
        // fill(100);
        // rect(x, y + increment, 1.25, 15);
        // x += 1;
        // }
    }
}


// Tuesday UK
x = 200;
y = 720;
for (let r=0; r < table3.getRowCount(); r++) {
    let dayofWeek = table3.getString(r, 2);
// let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
// print(maptableToYearsLength);
// Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Tuesday"){
    fill('green');
    rect(x, y + increment, 2, 20);
    x += colWidth2;
    // } else {
    // fill(100);
    // rect(x, y + increment, 1.25, 15);
    // x += 1;
    // }
    }
}

// Wed UK
x = 200;
y = 760;
for (let r=0; r < table3.getRowCount(); r++) {
    let dayofWeek = table3.getString(r, 2);
// let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
// print(maptableToYearsLength);
// Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Wednesday"){
    fill('green');
    rect(x, y + increment, 2, 20);
    x += colWidth2;
    // } else {
    // fill(100);
    // rect(x, y + increment, 1.25, 15);
    // x += 1;
    // }
    }
}

// Thursday UK
x = 200;
y = 800;
for (let r=0; r < table3.getRowCount(); r++) {
    let dayofWeek = table3.getString(r, 2);
// let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);

// print(maptableToYearsLength);
// Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Thursday"){
    fill('green');
    rect(x, y + increment, 2, 20);
    x += colWidth2;
    // } else {
    // fill(100);
    // rect(x, y + increment, 1.25, 15);
    // x += 1;
    // }
    }
}

// Friday UK
x = 200;
y = 840;
for (let r=0; r < table3.getRowCount(); r++) {
    let dayofWeek = table3.getString(r, 2);
// let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);

// print(maptableToYearsLength);
// Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Friday"){
    fill('green');
    rect(x, y + increment, 2, 20);
    x += colWidth2;
    // } else {
    // fill(100);
    // rect(x, y + increment, 1.25, 15);
    // x += 1;
    // }
    }
}


// Saturday UK
x = 200;
y = 880;
for (let r=0; r < table3.getRowCount(); r++) {
    let dayofWeek = table3.getString(r, 2);
// let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);

// print(maptableToYearsLength);
// Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Saturday"){
    fill('green');
    rect(x, y + increment, 2, 20);
    x += colWidth2;
    // } else {
    // fill(100);
    // rect(x, y + increment, 1.25, 15);
    // x += 1;
    // }
    }
}


// Sunday UK
x = 200;
y = 920;
for (let r=0; r < table3.getRowCount(); r++) {
    let dayofWeek = table3.getString(r, 2);
// let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
// print(maptableToYearsLength);
// Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Sunday"){
    fill('green');
    rect(x, y + increment, 2, 20);
    x += colWidth2;
    // } else {
    // fill(100);
    // rect(x, y + increment, 1.25, 15);
    // x += 1;
    // }
    }
}


// France
// Monday France
x = 200;
y = 1000;

for (let r=0; r < table4.getRowCount(); r++) {
        let dayofWeek = table4.getString(r, 2);
    // let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
    // print(maptableToYearsLength);
    // Loop through and determine match between country and day of week and color accordingly
        if (dayofWeek === "Monday"){
        fill('orange');
        rect(x, y + increment, 2, 20);
        x += 5;
        // } else {
        // fill(100);
        // rect(x, y + increment, 1.25, 15);
        // x += 1;
        // }
    }
}


// Tuesday France
x = 200;
y = 1040;
for (let r=0; r < table4.getRowCount(); r++) {
    let dayofWeek = table4.getString(r, 2);
// let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
// print(maptableToYearsLength);
// Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Tuesday"){
    fill('orange');
    rect(x, y + increment, 2, 20);
    x += colWidth2;
    // } else {
    // fill(100);
    // rect(x, y + increment, 1.25, 15);
    // x += 1;
    // }
    }
}

// Wed France
x = 200;
y = 1080;
for (let r=0; r < table4.getRowCount(); r++) {
    let dayofWeek = table4.getString(r, 2);
// let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
// print(maptableToYearsLength);
// Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Wednesday"){
    fill('orange');
    rect(x, y + increment, 2, 20);
    x += colWidth2;
    // } else {
    // fill(100);
    // rect(x, y + increment, 1.25, 15);
    // x += 1;
    // }
    }
}

// Thursday France
x = 200;
y = 1120;
for (let r=0; r < table4.getRowCount(); r++) {
    let dayofWeek = table4.getString(r, 2);
// let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);

// print(maptableToYearsLength);
// Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Thursday"){
    fill('orange');
    rect(x, y + increment, 2, 20);
    x += colWidth2;
    // } else {
    // fill(100);
    // rect(x, y + increment, 1.25, 15);
    // x += 1;
    // }
    }
}

// Friday France
x = 200;
y = 1160;
for (let r=0; r < table4.getRowCount(); r++) {
    let dayofWeek = table4.getString(r, 2);
// let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);

// print(maptableToYearsLength);
// Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Friday"){
    fill('orange');
    rect(x, y + increment, 2, 20);
    x += colWidth2;
    // } else {
    // fill(100);
    // rect(x, y + increment, 1.25, 15);
    // x += 1;
    // }
    }
}


// Saturday France
x = 200;
y = 1200;
for (let r=0; r < table4.getRowCount(); r++) {
    let dayofWeek = table4.getString(r, 2);
// let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);

// print(maptableToYearsLength);
// Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Saturday"){
    fill('orange');
    rect(x, y + increment, 2, 20);
    x += colWidth2;
    // } else {
    // fill(100);
    // rect(x, y + increment, 1.25, 15);
    // x += 1;
    // }
    }
}


// Sunday France
x = 200;
y = 1240;
for (let r=0; r < table4.getRowCount(); r++) {
    let dayofWeek = table4.getString(r, 2);
// let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
// print(maptableToYearsLength);
// Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Sunday"){
    fill('orange');
    rect(x, y + increment, 2, 20);
    x += colWidth2;
    // } else {
    // fill(100);
    // rect(x, y + increment, 1.25, 15);
    // x += 1;
    // }
    }
}



// China
// Monday China
x = 200;
y = 1300;

for (let r=0; r < table5.getRowCount(); r++) {
        let dayofWeek = table5.getString(r, 2);
    // let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
    // print(maptableToYearsLength);
    // Loop through and determine match between country and day of week and color accordingly
        if (dayofWeek === "Monday"){
        fill('purple');
        rect(x, y + increment, 2, 20);
        x += 5;
        // } else {
        // fill(100);
        // rect(x, y + increment, 1.25, 15);
        // x += 1;
        // }
    }
}


// Tuesday China
x = 200;
y = 1340;
for (let r=0; r < table5.getRowCount(); r++) {
    let dayofWeek = table5.getString(r, 2);
// let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
// print(maptableToYearsLength);
// Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Tuesday"){
    fill('purple');
    rect(x, y + increment, 2, 20);
    x += colWidth2;
    // } else {
    // fill(100);
    // rect(x, y + increment, 1.25, 15);
    // x += 1;
    // }
    }
}

// Wed China
x = 200;
y = 1380;
for (let r=0; r < table5.getRowCount(); r++) {
    let dayofWeek = table5.getString(r, 2);
// let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
// print(maptableToYearsLength);
// Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Wednesday"){
    fill('purple');
    rect(x, y + increment, 2, 20);
    x += colWidth2;
    // } else {
    // fill(100);
    // rect(x, y + increment, 1.25, 15);
    // x += 1;
    // }
    }
}

// Thursday China
x = 200;
y = 1420;
for (let r=0; r < table5.getRowCount(); r++) {
    let dayofWeek = table5.getString(r, 2);
// let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);

// print(maptableToYearsLength);
// Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Thursday"){
    fill('purple');
    rect(x, y + increment, 2, 20);
    x += colWidth2;
    // } else {
    // fill(100);
    // rect(x, y + increment, 1.25, 15);
    // x += 1;
    // }
    }
}

// Friday China
x = 200;
y = 1460;
for (let r=0; r < table5.getRowCount(); r++) {
    let dayofWeek = table5.getString(r, 2);
// let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);

// print(maptableToYearsLength);
// Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Friday"){
    fill('purple');
    rect(x, y + increment, 2, 20);
    x += colWidth2;
    // } else {
    // fill(100);
    // rect(x, y + increment, 1.25, 15);
    // x += 1;
    // }
    }
}


// Saturday China
x = 200;
y = 1500;
for (let r=0; r < table5.getRowCount(); r++) {
    let dayofWeek = table5.getString(r, 2);
// let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);

// print(maptableToYearsLength);
// Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Saturday"){
    fill('purple');
    rect(x, y + increment, 2, 20);
    x += colWidth2;
    // } else {
    // fill(100);
    // rect(x, y + increment, 1.25, 15);
    // x += 1;
    // }
    }
}


// Sunday China
x = 200;
y = 1540;
for (let r=0; r < table5.getRowCount(); r++) {
    let dayofWeek = table5.getString(r, 2);
// let maptableToYearsLength = map(table1.getRowCount(), 0 ,table1.getRowCount(), 0, years.length-2);
// print(maptableToYearsLength);
// Loop through and determine match between country and day of week and color accordingly
    if (dayofWeek === "Sunday"){
    fill('purple');
    rect(x, y + increment, 2, 20);
    x += colWidth2;
    // } else {
    // fill(100);
    // rect(x, y + increment, 1.25, 15);
    // x += 1;
    // }
    }
}
// save('countrydayofweek.svg');
}


