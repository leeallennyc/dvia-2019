// Testing WEBGL as Renderer for 3D primatives

// let angle = 0;
// let graphics;
// let words; 
// let img;
// let c;

// let spiralImage;
// // let spiralObject;


// function preload() {
//   img = loadImage('/spiral_object.jpg');
// }

// function preload() {
//   spiralObject = loadModel('spiral_clock.stl', true);
// }

// function preload() {
//   img = loadImage('spiral_object.jpg');
// }
// function setup() {
//   loadImage('/spiral_object.jpg', img => {
//   img(img, 0, 0);
//   });
// //   // getting  color  of middle pixel
//   // c = img.get(img.width / 2,  img.height / 2);
// }
  // set the width & height of the sketch
//   createCanvas(300, 300, WEBGL);
// }
  // graphics = createGraphics(200, 200);
  // graphics.background(100);

  // words = createGraphics(300, 300);
  // words.fill(100);
  // words.textAlign(CENTER);
  // words.textSize(50);
  // words.text('test', 100, 100);

  // print the time to the console once at the beginning of the run. try opening up the
  // web inspector and poking around to see the various values the clock function gives you
  // print('starting time:', clock());


// Using a test of 3D primatives with WEBGL: Torus rotating on the screen.
// function draw() {
  
//   background(c);
//   // scale(0.5);
//     //  image(img);
//   // rotateX(framecount * 0.01);
//   // rotateY(framecount * 0.01);
//   // stroke(255);
//   // texture(graphics);
//   // box(100);
//   // angle += 0.04;
//   // normalMaterial();
//   // import WEBGL 3D model of spiral clock design.
//   // model(spiralObject);
// }




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

  
// ----------------------



  // function setup() {
  //   let img = createImage(600, 600); // same as new p5.Image(100, 100);
  //   img.loadPixels();
  //   createCanvas(600, 600);
  //   background(0);
  
  //   // helper for writing color to array
  //   function writeColor(image, x, y, red, green, blue, alpha) {
  //     let index = (x + y * width) * 4;
  //     image.pixels[index] = red;
  //     image.pixels[index + 1] = green;
  //     image.pixels[index + 2] = blue;
  //     image.pixels[index + 3] = alpha;
  //   }
  
  //   let x, y;
  //   // fill with random colors
  //   for (y = 0; y < img.height; y++) {
  //     for (x = 0; x < img.width; x++) {
  //       let red = random(255);
  //       let green = random(255);
  //       let blue = random(255);
  //       let alpha = 255;
  //       writeColor(img, x, y, red, green, blue, alpha);
  //     }
  //   }
  
  //   // draw a red line
  //   y = 0;
  //   for (x = 0; x < img.width; x++) {
  //     writeColor(img, x, y, 255, 0, 0, 255);
  //   }
  
  //   // draw a green line
  //   y = img.height - 1;
  //   for (x = 0; x < img.width; x++) {
  //     writeColor(img, x, y, 0, 255, 0, 255);
  //   }
  
  //   img.updatePixels();
  //   image(img, 0, 0);
  // }

// -------------------------------
  var lines = 1000;
  var linethickness = 0.1;
  var circumference = Math.PI * 20;
  var space = circumference/lines;
  var linesdata = d3.range(lines).map(function(d,i){
    return{
    startAngle: (i*space),
    endAngle: (i*space)+linethickness*0.5,
    outerRadius: width/20 * i/100,
    strokeWidth: 0.05,
    fillopacity: 0.1,
    fillcolor: colorsPalette[i%10]
    }
  });

var i = 0;
var colorsPalette;

function setup() {
    colorsPalette = [color(146, 167, 202,30),
            color(186, 196, 219,30),
            color(118, 135, 172,30),
            color(76, 41, 81,30),
            color(144, 62, 92,30),
            color(178, 93, 119,30),
            color(215, 118, 136,30),
            color(246, 156, 164,30),];
  var width = 500;
  var height = 500;
  // var width = d3.select('#p5canvas').node().getBoundingClientRect().width;
  // var height = width;
  var canvas = createCanvas(width, height);
  // canvas.parent('p5canvas');
  // createCanvas(800, 800);
  background(0,0);
  ellipseMode(CENTER);
}
function draw() {
  // rotate(20);
  fill(colorsPalette[floor(random(8))],100);
  stroke(colorsPalette[floor(random(8))],255);
  strokeWeight(0.5);
  arc(width/2,height/2,linesdata[i].outerRadius*2,linesdata[i].outerRadius*2,
      linesdata[i].startAngle,linesdata[i].endAngle,PIE)
  if(i<linesdata.length-1){
    i++;
  } else {
    noLoop();
  }
}




