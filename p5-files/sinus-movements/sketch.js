/*
=====================     G L O B A L  V A R I A B L E S      ========================================
*/
let size = 600

let xPos = 0
let yPos = 0
let radius = size * 0.1
let hue = 20

let lissaous = 4 // name dieser Figur > Kurvengraph
let pointilisme = 760

/*
=====================     S E T U P      ========================================
*/


function setup() {
  var canvas = createCanvas(size, size);
  canvas.parent('pi5-canvas');
  colorMode(HSB);
  background(200, 50, 80);


}
  /*
  =====================     D R A W      ========================================
  */

function draw () {
  translate (size/2, size/2)


  for (i = 0; i < TWO_PI; i = i + TWO_PI/pointilisme)  {
    fill (hue, 50, 80);

    xPos = cos(i*lissaous) * size/2.5;
    yPos = sin(i*lissaous*HALF_PI) * size/2.5;
    
    ellipse (xPos, yPos, radius);
  }

  hue = (hue + 1) % 360;
  //radius = (radius + sin(0.3)) % 200
  //lissaous = (lissaous + 0.01) % 12
  lissaous += 0.01;
  pointilisme += 2;

}
