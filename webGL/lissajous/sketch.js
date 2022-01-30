let w = 0
let h = 0
let amount = 200
let vec = 0
let particles = []
let lineMaxDist = 150;
let a = 0
let b = 0
let c = 0

let d = 0
let e = 0
let f = 0


let t = 0
let t2 = 0

let color1 = 0
let color2 = 0
let color3 = 0

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

  a = 1.0
  b = 3.0
  c = 5.0

  d = 105.0
  e = 3.0
  f = 1.0

  t = PI/4
  t2 = PI/4
  // debugMode()
  
  color1 = random(color)
  color2 = random(color)
  color3 = random(color)



}
  /*
  =====================     D R A W      ========================================
  */

function draw () {
  orbitControl()

  background(color1)

  for (i = 0; i < amount; i++) {
    let x = 160 * sin(a * t + PI/2)
    let y = 160 * sin(b * t)
    let z = 160 * sin(c * t)
    // particles[i] = new Lissajous(x, y, z)
    push()
    rotateY(frameCount * 0.001)
    rotateX(frameCount * 0.006)
    rotateZ(frameCount * 0.005)
    noStroke()
    translate(-w/8 + x, h/24 + y, z)
    ambientLight(color2)
    ambientMaterial(color2)
    sphere(10)
    pop()
    // t += 0.1
    a = a + t/2 + mouseX * 0.000002
    b = b + t/4 + mouseY * 0.000002
    c = c + t/8 + mouseX * 0.000004
  }

  for (i = 0; i < amount; i++) {
    let x = 160 * cos(d * t2 + PI/2)
    let y = 160 * cos(e * t2)
    let z = 160 * cos(f * t2)
    // particles[i] = new Lissajous(x, y, z)
    push()
    rotateY(frameCount * 0.002)
    rotateX(frameCount * 0.002)
    rotateZ(frameCount * 0.001)

    noStroke()
    translate(-w/8 + x, h/24 + y, z)
    ambientLight(color3)
    ambientMaterial(color3)
    sphere(10*cos(c/4000))
    pop()
    // t += 0.1
    d = d + t2/8
    e = e + t2/4
    f = f + t2/2
  }


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

// function mousePressed() {
//   noLoop();
// }

// function mouseReleased() {
//   loop();
// }

function keyTyped() {
  
  if (keyIsPressed === true) {
      frameCount(1);
    } else {
      frameCount(60);
    }
  }



function keyTyped() {
  if (key === 's') {
    saveCanvas('lissajous-3D', 'jpg');
  }

}