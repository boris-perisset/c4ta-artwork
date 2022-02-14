//////////////// G L O B A L ///////////////////////////////////////////
let ran = 0;
let w, h = 0

let leftX = 0
let rightX  = 0
let topY = 0
let bottomY  = 0

let resolution = 1

let zOff = 0
let tOff = 0
let fr = 0
let inc = 0.7
let scale = 20
let cols, rows = 0
let angle = 0

let col = 0
let amount = 100
let shapeAmount = 1
let particles = []
let shapes = []
let flowField = []
let others = 0

let initialFlowDirection = 0

let colorSet
let colorBG


//////////////// S E T U P ///////////////////////////////////////////
function setup() {
  
  w = windowWidth
  h = windowHeight
  
  const cnv = createCanvas(w, h);
  cnv.parent('pi5-canvas');
  
  colorSet = random(palettes)
  let colorBG = colorSet.lines[int(random(0, colorSet.lines.length))]
  background(colorBG)  

  leftX = int(w * -0.5)
  rightX  = int(w * 1.5)
  topY = int(h * -0.5)
  bottomY  = int(h * 1.5)

  resolution = int(w * 0.03)



  cols = int((rightX - leftX) / resolution)
  rows = int((bottomY - topY) / resolution)

  flowField = new Array(cols * rows)

  initialFlowDirection = random(0, TAU)


  for (let i = 0; i < amount; i++) {
    particles[i] = new Particle()
  }


  for (let i = 0; i < shapeAmount; i++) {
    shapes[i] = new Shape(flowField)
  }
}

//////////////// D R A W ///////////////////////////////////////////
function draw() {

  // background(0);

  let yOff = 0
  for (let y = 0; y < rows; y++) {
    let xOff = 0
    for (let x = 0; x < cols; x++) {

      let index = x + y * cols
      angle = noise(xOff, yOff, zOff, tOff) * initialFlowDirection

      
      let v = p5.Vector.fromAngle(angle)
      v.setMag(1)

      flowField[index] = v
      xOff += inc
      // rect(x * scale, y * scale, scale, scale)
      // stroke(255, 1)
      // noStroke()
      push()
      //go to point in grid
      translate (x * scale, y * scale)

      //rotate in the direction of the vector
      rotate(v.heading())
      
      //draw a line to with the length of scale with that rotation
      // line(0, 0, scale, 0)

      pop()

    }
    yOff += inc
    zOff += 0.06
    tOff += 0.00006

    

  }

  for (let i = 1; i < particles.length; i++) {
    particles[i].follow(flowField)

    particles[i].update()
    particles[i].show()
    particles[i].edges()

    if (frameCount%100 == 0) {
        initialFlowDirection = random(0, TAU)
    }

    if (frameCount >= 300) {
      if (particles[i].size >= 0) {
        particles[i].closeUp() 
      } else {
        noLoop()
      }
    }

  }

  for (let i = 1; i < shapes.length; i++) {
    shapes[i].build()
    // shapes[i].update()
    shapes[i].show()
  }   
console.log(frameCount)

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


function keyTyped() {
  if (key === 's') {
    saveCanvas('flow-worms', 'jpg');
  }
}