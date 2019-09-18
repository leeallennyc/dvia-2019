// The below code includes multiple comments for a WEBGL clock.

let angle1 = 0;
let now = clock(); 
let graphics; 
let message; 
let counter = 0;
// let redTime;
// let interval;


// Setup function for for loading the WEBGL canvas and images
// Might use: graphics = createGraphics(500,500);
// Might use: graphics.background(random(255));

function setup() {
    
    createCanvas(500, 500, WEBGL);
    message = createGraphics(500, 500);
    message.textAlign(CENTER);
    message.textSize(12);

    message.text(now.text.season, 25, 25); //  <--- Layout of Messages going around the 3D Primitive
    message.text(now.text.time, 50, 50);
    message.text(now.text.time, 75, 75);
    message.text(now.text.time, 100, 100);
    message.text(now.text.time, 125, 125);
    message.text(now.text.time, 150, 150);
    message.text(now.text.month, 175, 175); 
    message.text(now.text.weekday, 200, 200);
    message.text(now.text.date, 225, 225);
    message.fill(255,0,0);
    message.text(moment().format('MMMM Do YYYY, h:mm:ss a'), 250, 250);
    message.fill(0,0,0);
    message.text(now.text.time, 275, 275);
    message.text(now.text.time, 300, 300);
    message.text(now.text.time, 325, 325);
    message.text(now.text.time, 350, 350);
    message.text(now.text.time, 375, 375); 
    message.text(now.text.time, 400, 400);
    message.text(now.text.time, 425, 425);
    message.text(now.text.time, 450, 450);
}

// Using a test of 3D primatives with WEBGL: Torus rotating on the screen.
function draw() {

  if (now.progress.day > 0.5) {
    message.fill (0);
    background (255,255,255);
  } else {
    message.fill (255,255,255);
    background(0,0,0);
  }

  frameRate(60);
  rotateY(angle1);
  sphere (150, 150, 150, 150);
  angle1 += .01;
  texture(message);
  

  // let redTime = message.text(moment().format('MMMM Do YYYY, h:mm:ss a'), 250, 250);
  // graphics.fill(random(255));
  // texture(redTime);
  // image(graphics,0,-100);
  }


// -------------------------------

// Source: https://github.com/playgrdstar/d3_vs_p5/blob/master/index.html
// Experimental spiral snippets and reference to code above. 

 
  // var lines = 1000;
  // var linethickness = 0.1;
  // var circumference = Math.PI * 20;
  // var space = circumference/lines;
  // var linesdata = d3.range(lines).map(function(d,i){   // Here we will need D3 and access to methods
  //   return{
  //   startAngle: (i*space),
  //   endAngle: (i*space)+linethickness*0.5,
  //   outerRadius: width/20 * i/100,
  //   strokeWidth: 0.05,
  //   fillopacity: 0.1,
  //   fillcolor: colorsPalette[i%10]
  //   }
  // });


// var i = 0;
// var colorsPalette;
// function setup() {
//     colorsPalette = [color(146, 167, 202,30),
//             color(186, 196, 219,30),
//             color(118, 135, 172,30),
//             color(76, 41, 81,30),
//             color(144, 62, 92,30),
//             color(178, 93, 119,30),
//             color(215, 118, 136,30),
//             color(246, 156, 164,30),];
//   var width = 500;
//   var height = 500;
//   // var width = d3.select('#p5canvas').node().getBoundingClientRect().width;
//   // var height = width;
//   var canvas = createCanvas(width, height);
//   // canvas.parent('p5canvas');
//   // createCanvas(800, 800);
//   background(0,0);
//   ellipseMode(CENTER);
// }
// function draw() {
//   // rotate(20);
//   fill(colorsPalette[floor(random(8))],100);
//   stroke(colorsPalette[floor(random(8))],255);
//   strokeWeight(0.5);
//   arc(width/2,height/2,linesdata[i].outerRadius*2,linesdata[i].outerRadius*2,
//       linesdata[i].startAngle,linesdata[i].endAngle,PIE)
//   if(i<linesdata.length-1){
//     i++;
//   } else {
//     noLoop();
//   }
// }




