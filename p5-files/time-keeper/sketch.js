/*
=====================     G L O B A L  V A R I A B L E S      ========================================
*/
let size = 600
let factor

let positionSec = [];
let positionMin = [];

let specialIndex = 0;

function timer (time, radius, posList) {
  for (let a = 0; a < TAU; a += TAU/time) {
    let newX = cos(a) * radius
    let newY = sin(a) * radius
    posList.push({x: newX, y:newY})
  }
}

/*
=====================     S E T U P      ========================================
*/


/*
  Mit Sinus angetriebene Animationen
*/

function setup() {
  frameRate(1);
  createCanvas(size, size)
  colorMode(HSB);
  background(200, 50, 80);
  noStroke();
}

  /*
  =====================     D R A W      ========================================
  */


function draw() {
  background(30, 50, 80);

  translate (width/2, height/2)
  rotate (-HALF_PI)

  timer(60, 150, positionSec);
  timer(60*60, 200, positionMin);

  for (let i = 0; i < positionSec.length; i += 1) {
    let x = positionSec[i].x
    let y = positionSec[i].y
    circle (x,y,1);
  }

  for (let j = 0; j < positionSec.length; j += 1) {
    let x = positionMin[j].x
    let y = positionMin[j].y
    circle (x,y,1);
  }


  push()
  let specialPos1 = positionSec[specialIndex]
  circle (specialPos1.x, specialPos1.y, 20)

  let specialPos2 = positionMin[specialIndex]
  circle (specialPos2.x, specialPos2.y, 20)
  pop()

  specialIndex = (specialIndex + 1) % 60;
}