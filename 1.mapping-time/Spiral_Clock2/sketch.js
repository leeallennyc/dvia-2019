// Elements adapted from p5.js tutorial: Coding Challenge #74: Clock with p5.js with Ben Shiffman
// Source: https://www.youtube.com/watch?v=E4RyStef-gY

function setup() {
  // set the width & height of the sketch
  createCanvas(600, 600);
  angleMode(DEGREES);

  // print the time to the console once at the beginning of the run. 
  print('starting time:', clock());
}

function draw() {

  background(255);
  translate(300,300);
  rotate(-90);

  const now = clock();
  let hour = now.hour;
  let min = now.min;
  let sec = now.sec;
  let day = now.day;
  let month = now.month;

  // Set the background to change from AM to PM  

  if (now.progress.day > 0.5) {
    background (0);
  } else {
    background(255);
  }

  //experimenting with for loop and motion <----- next iteration will attempt to match it seconds
  noStroke();
  fill(255, 0, 0);
  for (let i = 0; i < 1; i++) {
    ellipse(0 + sin(frameCount) * 200,
      1+(i*100), 15, 15);
  }

  // Setting the position, radius and color of Month
  strokeWeight(20);
  stroke (45, 255 , 23);
  noFill();
  let monthAngle = map (month, 0, 12, 0, 360);
  arc(0, 0, 400, 400, 0, monthAngle);


   // Setting the position, radius and color of Days
  strokeWeight(15);
  stroke (60, 100, 100);
  noFill();
  let daysPerWeekAngle = map (day, 0, 7, 0, 360);
  arc(0, 0, 350, 350, 0, daysPerWeekAngle);

 // Setting the position, radius and color of Hours
  strokeWeight(10);
  stroke(255, 0, 0);
  noFill();
  let hourAngle = map (hour % 12, 0, 12, 0, 360);
  arc(0, 0, 300, 300, 0, hourAngle); 


 // Setting the position, radius and color of Min
  strokeWeight(10);
  stroke(50, 35, 68);
  noFill();
  let minAngle = map (min, 0, 60, 0, 360);
  arc(0, 0, 250, 250, 0, minAngle);

   // Setting the position, radius and color of Secs
  strokeWeight(10);
  stroke(0,0,180);
  noFill();
  let secondAngle = map (sec, 0, 60, 0, 360);
  arc(0, 0, 200, 200, 0, secondAngle);


   // set up typography & drawing-color
   fill(255, 0, 0);
   strokeWeight(0);
   textFont("Montserrat"); // ← check index.html to see how it was loaded from google-fonts
   textSize(12);
   rotate(-270);
 
   // draw the time string to the canvas
   text(now.text.date, 175, 210);
   text(now.text.time, 175, 230);
  }
  

