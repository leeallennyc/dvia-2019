let angle = 0;
let graphics;
let words; 
// let spiralImage;
// let spiralObject;

// function preload() {
//   spiralImage = loadImage('/Users/leekuczewski/Desktop/The_New_School/Repos/dvia-2019/1.mapping-time/project/variants/large/spiral_object.jpg');
// }
// function preload() {
//   spiralObject = loadModel('spiral_object.obj');
// }

function setup() {
  // set the width & height of the sketch
  createCanvas(600, 600, WEBGL);
  graphics = createGraphics(200, 200);
  // graphics.background(100);

  words = createGraphics(300, 300);
  words.fill(100);
  words.textAlign(CENTER);
  words.textSize(50);
  words.text('test', 100, 100);
}
  // print the time to the console once at the beginning of the run. try opening up the
  // web inspector and poking around to see the various values the clock function gives you
  // print('starting time:', clock());


// Using a test of 3D primatives with WEBGL: Torus rotating on the screen.
function draw() {
  
  background(200);
  rotateX(angle);
  stroke(255);
  texture(graphics);
  box(100);
  angle += 0.04;
  // normalMaterial();
  

  // //   // import WEBGL 3D model of spiral clock design.
  // model(spiralObject);
}

  // check the clock for the current time and unpack some of its fields to generate a time-string
  // var now = clock();

  // // set the background to 'white' – you can also specify colors use integers, hex-color strings and more.
  // // note that setting the background also clears the canvas from our previous round of drawing
  // background('white');

  // // set up typography & drawing-color
  // textFont("Anonymous Pro"); // ← check index.html to see how it was loaded from google-fonts
  // textSize(42); // make it big
  // fill(100, 50, 50);

  // // draw the time string to the canvas
  // text(now.text.date, 30, 50);
  // text(now.text.time, 30, 100);

  

