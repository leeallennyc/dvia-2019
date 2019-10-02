// Setup function for setting CENTER
function setup() {
  createCanvas(500,500);
  rectMode(CENTER);
  print('starting time:', clock());
} 

// Setting to DEGREES instead of Radians
function draw() {
  angleMode(DEGREES);
  translate(250, 250);
  background(255);
  noFill();

  // Setting variables for clock
  const now = clock();
  let sec = now.sec;
  let min = now.min;
  let hour = now.hour;
  let hours = now.hours;
  let weekday = now.weekday;
  let day = now.day;
  let month = now.month;
  let year = now.year;
  let colSeason = map (now.season, 0, 4, 100, 255);

  // Setting up seasons and mapping to colSeason for background
  // Spring = 1,  Summer = 2 , Fall = 3, Winter = 4
  if(now.season === 1){
    background(colSeason);
  } else if (now.season === 2){
    background(colSeason);
  } else if (now.season === 3){
    background(colSeason);
  } else if (now.season === 4){
    stroke(0,0,0);
    background(colSeason);
  } else {
    background(255);
  }

   // Setting the position and color of radial arcs
   //  Hours, Mins, Seconds -- 24 Hours Military Time
  push();
  rotate(-90);
  strokeWeight(3);
  stroke(255, 0, 0, 80);
  let hourAngle = map (hours, 0, 23, 0, 360);
  arc(0, 0, 475, 475, 0, hourAngle);
 
  // Setting the position, radius and color of Min
  stroke(255, 0, 0, 80);
  let minAngle = map (min, 0, 60, 0, 360);
  arc(0, 0, 450, 450, 0, minAngle);

  // Setting the position, radius and color of Secs
  stroke(255, 0, 0, 80);
  let secondAngle = map (sec, 0, 60, 0, 360);
  arc(0, 0, 425, 425, 0, secondAngle);
  pop();

  // Set up spiral Math and # components for spiral
  for (let i = 0; i < 360; i ++){
    let a = 360 * now.progress.hour;
    let r1 = 1 * i * now.progress.season; // if you divide i by 3 here
    let r2 = 1 * i * now.progress.season; // and if you divide i by 2 here -- you get some bizarre patterns
    let x1 = r1+i * now.progress.season * cos(a);
    let x2 = r2+i * now.progress.season * cos(a);
    let y1 = r1+i * now.progress.season * sin(a);
    let y2 = r2+i * now.progress.season * sin(a);

  // For loop for executing the spiral and rotation
    for (let j = 0; j < 1; j++) { 
      line(x1, y1, x2, y2);
      rotate(a+j);     
    }
  }

  // Expanding Center Ellipse
  for (let i = 0; i < 52; i++) {
    fill(colSeason, 50);
    ellipse(0, 0, 1 * i * now.progress.week , 1 * i * now.progress.week);
  }
}

 