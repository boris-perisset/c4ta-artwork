
let a = 0;


/*
  =====================     S E T U P      ========================================
  */

function setup() {
  const width = windowWidth
  const height = windowHeight

  var canvas = createCanvas(width, height);
  canvas.parent('pi5-canvas');

  background(55);
  noStroke();

}
  /*
  =====================     D R A W      ========================================
  */

function draw () {
  background (55)
  let factor = sin(a);
  let maxAmplitude = 190;
  fill (0, 100, random(120,255));


  let Ball = {
    xPos: 0 * 100 * factor,
    yPos: 0 * 100 * factor,
    radius: factor * 50

  }

  let ellipseMinSize = 40;
  let ellipseSize = ellipseMinSize + 160 * factor;

 for (let i = 0; i < 20; i += 1) { 
  
  Ball.xPos += random(2,windowWidth);
  Ball.yPos += random(2,windowHeight)
  Ball.radius += 10*factor;
  ellipse(Ball.xPos, Ball.yPos, ellipseSize);
 }

 a += 0.5;


}