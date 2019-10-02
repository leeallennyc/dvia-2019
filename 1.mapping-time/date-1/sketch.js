
function setup() {
  createCanvas(500,500);
  rectMode(CENTER);
} 

// Setting to Degrees instead of Radians
function draw() {
  angleMode(DEGREES);
  translate(250, 250);
  background(255);
  noFill();

   // Setting variables for clock
  const now = clock();
  let hour = now.hour;
  let min = now.min;
  let sec = now.sec;
  let day = now.day;
  let month = now.month;


// Created a grid underlay 
// for (let i = 0; i < 20; i++) {
//   stroke(200);
//   ellipse (0, 0, 20*i, 20*i); 
//   stroke(200);
//   square(0, 0, 20*i);
//   }

// Set up # of "ticks" for time in Spiral ( i.e. 720 represents 12 hours)
  for (let i = 0; i < 720; i ++){
    let a = 10 +.5 * now.progress.month;
    let r1 = 3;
    let r2 = 2;
    let x1 = r1+i * cos(a);
    let x2 = r2+i * cos(a);
    let y1 = r1+i * sin(a);
    let y2 = r2*i * sin(a);
    // Working on Mapping each line segment to now.sec and displaying one line at a time
    // let secondHandLines = map (now.sec, 0, 60, 0, i.length);  
    // beginShape(LINES);
    //   vertex(x1,y1);
    //   vertex(x2,y2);
    // endShape();
    // rotate(a + i/720);
    // stroke(255, 0, 0)
    for (let i = 0; i < 2; i++) {
      stroke(0, 0, 0);
      // line(x1, y1, x2, y2);
      point(x2, y2);
      rotate(a+i/720);
    }
  }
}

// Ellipse Tick Test
// ellipse(0 + sin(now.sec/60*360+90) * 75,
      //   1+(i*20), 1, 1);

// Making a background grid with points
// for (let i = 0; i < 100; i++) {
//   let n = 0;
//   let xrightSide = n + i;
//   let xleftSide = n - i; 
//   let yupSide = n - i;
//   let ydownSide = n + i;

//   stroke(255, 0, 0);
//   point(n, yupSide);
//   point(n, ydownSide);
//   point(xleftSide, n);
//   point(xrightSide, n);
//   point(xrightSide, yupSide);
//   point(xrightSide, ydownSide);
//   point(xleftSide, ydownSide);
//   point(xleftSide, yupSide);
// }