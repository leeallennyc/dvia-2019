
function setup() {
  createCanvas(500,500);
  rectMode(CENTER);
} 

// Setting to Degrees instead of Radians
function draw() {
  angleMode(DEGREES);
  translate(250, 250);
  background(255, 0, 0);
  noFill();

// Created a grid underlay 
// for (let i = 0; i < 20; i++) {
//   stroke(200);
//   ellipse (0, 0, 20*i, 20*i); 
//   stroke(200);
//   square(0, 0, 20*i);
//   }

// Set up 720 "ticks"/minutes for 12 hour Spiral
for (let i = 0;  i < 180; i ++){
  let a = 45;
  let r1 = 0;
  let r2 = 0;
  let x1 = r1+i * cos(a);
  let x2 = r2+i * cos(a);
  let y1 = r1+i * sin(a);
  let y2 = r2*i * sin(a);
  line (x1, y1, x2, y2);
  rotate(a + i/360);
  stroke(255);      
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