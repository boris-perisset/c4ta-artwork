let w = 0
let h = 0
let amount = 400
let vec = 0
let dots = []
let lineMaxDist = 100;
let debug = true

let a = 0
let inc = 0

let color = [
  "#436c74", 
  "#5d9ca8", 
  "#78cfe0", 
  "#95dad9", 
  "#acdac4", 
  "#bedbad", 
  "#cddc97", 
  "#d6de87", 
  "#cfe198", 
  "#c7e5a8",
  "#070605", 
  "#1f3130", 
  "#397573", 
  "#51c1be", 
  "#93c39e", 
  "#babb6f", 
  "#d3b346", 
  "#dfaa6a", 
  "#e9a18a", 
  "#eda3a4"
]

let hogColor = [
  "#f6b3b2", 
  "#f5a8a7", 
  "#f49d9c", 
  "#f29192", 
  "#f08687", 
  "#f08488", 
  "#f38d94", 
  "#f595a0", 
  "#f69ead", 
  "#f8a6b9"
]

let lights = [
  "#ddf0ef", 
  "#d5f3ed", 
  "#cdf6eb", 
  "#c5f8ea", 
  "#bcfbe8", 
  "#bef9df", 
  "#c9f4d1", 
  "#d3efc2", 
  "#dceab3", 
  "#e4e5a4"
]

function preload() {
  hogwarts = loadModel('model/hogwarts.obj');
}



/*
=====================     S E T U P      ========================================
*/

function setup() {
  w = windowWidth
  h = windowHeight
  var canvas = createCanvas(w, h, WEBGL);
  canvas.parent('pi5-canvas');

  // debugMode()
  
  mainColor = random(color)
  mainLight = random(lights)

  for (i = 0; i < amount; i++) {
    let x = random(-w/2,w/2)
    let y = random(-h/2,h/2)
    let z = random(-1000,1000)
    dots[i] = new Particle(x, y, z)
  }
  a = 0.0;
  inc = TWO_PI / 3600.0;

}
  /*
  =====================     D R A W      ========================================
  */

function draw () {
  // orbitControl()
  //pointLight(v1, v2, v3, x, y, z)
  // background(90, 10, 50)
  background(mainColor)
  // background(10)
  // directionalLight(255,(mouseY-windowWidth/2), (mouseX-windowWidth/2), dots[0].vec.z)
  // spotLight(255, 255, 0, dots[0].vec.x, dots[0].vec.y, dots[0].vec.z, dots[1].vec.x, dots[1].vec.y, dots[1].vec.z)

  lightFalloff(1, 0, 0);

  for(let i = 0; i < dots.length; i++) {
    // fill(0)
    if (i%6 == 0) {
    dots[i].showFlare()
    dots[i].updatePos()
    } else {
    dots[i].showDot()
    dots[i].updatePos()
    }
    // dots[i].repel()  
  }
  noStroke()
  push()
  translate(-w/2, h/1.8, 0)
  rotateY(sin(a))
  rotateX(HALF_PI)
  push()
  // rotateZ(frameCount * 0.001)
  pointLight(mainColor,-(mouseX-windowWidth/2), -(mouseY-windowWidth/2), dots[3].vec.z)
  // specularMaterial(random(color));
  shininess(100)
  ambientMaterial(random(color))
  scale(3.7)  // rotateZ(frameCount * 0.01)
  model(hogwarts);
  pop()
  pop()

  a = a + inc
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


function keyTyped() {
  if (key === 's') {
    saveCanvas('hogwarts-sky', 'jpg');
  }

}