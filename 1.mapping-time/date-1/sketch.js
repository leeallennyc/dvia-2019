// Setting variables for clock
const now = clock();
let hour = now.hour;
let min = now.min;
let sec = now.sec;
let day = now.day;
let month = now.month;


function setup() {
  createCanvas(500,500);
  rectMode(CENTER);
  print('starting time:', clock());
} 

// Setting to Degrees instead of Radians
function draw() {
  angleMode(DEGREES);
  translate(250, 250);
  background(255);
  noFill();

// Created a grid underlay 
// for (let i = 0; i < 20; i++) {
//   stroke(200);
//   ellipse (0, 0, 20*i, 20*i); 
//   stroke(200);
//   square(0, 0, 20*i);
//   }

// Set up # of "ticks" for time in Spiral ( i.e. 720 represents 12 hours)
  for (let i = 0;  i < 720; i ++){
    let a = 180;
    let r1 = 0;
    let r2 = 10;
    let x1 = r1+i/4* cos(a);
    let x2 = r2+i/3* cos(a);
    let y1 = r1+i * sin(a);
    let y2 = r2*i * sin(a);
    // Working on Mapping each line iteration to time
    let secondHandLines = map (line (x1, y1, x2, y2), 0, sec, 0, i.length);
    rotate(a + i/720);
    stroke(255, 0, 0);
  }
}
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