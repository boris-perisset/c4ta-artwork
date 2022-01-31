let w = 0
let h = 0
let amount = 200
let vec = 0
let particles = []
let lineMaxDist = 150;
let a = 0
let inc = 0
let debug = true

let color = [
  "#3a986d", 
  "#519f92", 
  "#6d8ebe", 
  "#7c7bea", 
  "#7ca0d9", 
  "#6acbbf", 
  "#50eca7", 
  "#aacdb9", 
  "#dea7ca", 
  "#f18dd0"
]

/*
=====================     S E T U P      ========================================
*/

function setup() {
  w = windowWidth
  h = windowHeight
  var canvas = createCanvas(w, h, WEBGL);
  canvas.parent('pi5-canvas');

  a = 0.0
  inc = PI / 200
  // debugMode()
  
  mainColor = random(color)

  for (i = 0; i < amount; i++) {
    let x = random(-w/2,w/2)
    let y = random(-h/2,h/2)
    let z = random(-1000,1000)
    particles[i] = new Particle(x, y, z)
  }

}
  /*
  =====================     D R A W      ========================================
  */

function draw () {
  orbitControl()
  //pointLight(v1, v2, v3, x, y, z)
  // background(90, 10, 50)
  background(mainColor)
  ambientLight(mainColor)
  // pointLight(mainColor,particles[3].vec.x,particles[3].vec.y,particles[3].vec.z)
  // pointLight(mainColor,particles[0].vec.x,particles[0].vec.y,particles[0].vec.z)
  
  for(let particle = 0; particle < particles.length; particle++) {
    // fill(0)
    particles[particle].showDot()
    particles[particle].updatePos()  
    // particles[particle].repel()

    if (mouseIsPressed) {
    particles[particle].connect();
    }
  
  }
   lineMaxDist = 50 + 200 * sin(a)
   a = a + inc
}


function windowResized() {
  resizeCanvas(w, h);
}

// function mouseClicked(){
//   if (debug === true){
//     noDebugMode()
//     debug = false
//   } else {
//     debugMode()
//     debug = true
//   }
  
// }


function keyTyped() {
  if (key === 's') {
    saveCanvas('hogwarts-sky', 'jpg');
  }

}