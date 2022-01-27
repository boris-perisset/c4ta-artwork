let w = 0
let h = 0
let amount = 200
let vec = 0
let dots = []
let lineMaxDist = 100;

let debug = true

/*
=====================     S E T U P      ========================================
*/

function setup() {
  w = windowWidth
  h = windowHeight
  var canvas = createCanvas(w, h, WEBGL);
  canvas.parent('pi5-canvas');

  debugMode()
  

  for (i = 0; i < amount; i++) {
    let x = random(-w/2,w/2)
    let y = random(-h/2,h/2)
    let z = random(-1000,1000)
    dots[i] = new Particle(x, y, z)
  }

}
  /*
  =====================     D R A W      ========================================
  */

function draw () {
  orbitControl()
  //pointLight(v1, v2, v3, x, y, z)
  background(30, 10, 50)
  pointLight(220,220,23,dots[3].vec.x,dots[3].vec.y,dots[3].vec.z)
  pointLight(0,220,153,dots[0].vec.x,dots[0].vec.y,dots[0].vec.z)
  
  for(let i = 0; i < dots.length; i++) {
    // fill(0)
    dots[i].showDot()
    dots[i].updatePos()  
    // dots[i].repel()  
  }

}


function windowResized() {
  resizeCanvas(w, h);
}

function mouseClicked(){
  if (debug === true){
    noDebugMode()
    debug = false
  } else {
    debugMode()
    debug = true
  }
  
}