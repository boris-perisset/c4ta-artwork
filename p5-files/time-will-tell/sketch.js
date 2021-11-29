/*
=====================     G L O B A L      ========================================
*/
let cellNumb = 40
let size = 600
let posX = size/cellNumb
let posY = size/cellNumb
let cellSize = size/cellNumb

let a = 0
let factor

/*
=====================     S E T U P      ========================================
*/


function setup() {
  var canvas = createCanvas(size, size);
  canvas.parent('pi5-canvas');
  noStroke();
  frameRate(16)


}
  /*
  =====================     D R A W      ========================================
  */

function draw () {

  background (255, 120, 120)
  factor = sin(a);
  minRad = cellSize/2
  maxRad = cellSize
  radius = factor
  radMap = map(radius, -1, 1, minRad, maxRad)
  let rotation = 1

  for(let row = 0; row < cellNumb; row ++) {
    for(let col = 0; col < cellNumb; col ++) {
      
      push();
      fill (120, 120, 255)
      translate(col*cellSize - cellSize/2, row*cellSize - cellSize/2)
      circle(posX, posY,radMap);
      pop();
      rotate(rotation);
      posX = (posX + 0.001) % size;
      posY = (posY + 0.001) % size;
    }
   
  }

  a += PI

}   
