//////////////// G L O B A L ///////////////////////////////////////////
let w, h = 0
let grid = 0
let resolution = 0

let startpointX = 0
let startpointY = 0
let startpoint = 0


//////////////// S E T U P ///////////////////////////////////////////
function setup() {
  
  w = windowWidth
  h = windowHeight
  resolution = int(w * 0.02)
  
  const cnv = createCanvas(w, h);
  cnv.parent('pi5-canvas');
  
  grid = new Grid(w, h, resolution)
  grid.build()

  
  startpointX = random(0,w)
  startpointY = random(0,h)
  startpoint = createVector( startpointX, startpointY)


}

//////////////// D R A W ///////////////////////////////////////////
function draw() {

  background(255);
  grid.display()
  grid.update()

  

push()
  stroke(0,255,0)
  strokeWeight(30)

  beginShape()
  curveVertex(startpoint.x, startpoint.y)
  for (let i = 0; i < 10; i++) {
    startpoint.setMag(11)
    let verletPointX = startpoint.x * grid.resolution
    let verltPointY = startpoint.y * grid.resolution
    curveVertex(verletPointX, verltPointY)
  }
  endShape()
pop()

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

