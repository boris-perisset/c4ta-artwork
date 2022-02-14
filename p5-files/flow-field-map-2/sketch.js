//////////////// G L O B A L ///////////////////////////////////////////
let ran = 0;
let w, h = 0

let leftX = 0
let rightX  = 0
let topY = 0
let bottomY  = 0

let resolution = 0
let step = []

let zOff = 0
let fr = 0
let inc = 0.1
let scale = 20
let numCols, numRows = 0
let angle = 0

let col = 0
let amount = 30
let shapeAmount = 1
let particles = []
let shapes = []
let flowField = []
let others = 0

let initialFlowDirection = 0

//////////////// S E T U P ///////////////////////////////////////////
function setup() {
  
  w = windowWidth
  h = windowHeight
  
  const cnv = createCanvas(w, h);
  cnv.parent('pi5-canvas');
  
  leftX = int(w * -0.5)
  rightX  = int(w * 1.5)
  topY = int(h * -0.5)
  bottomY  = int(h * 1.5)

  resolution = int(w * 0.03)
  numCols = int((rightX - leftX) / resolution)
  numRows = int((bottomY - topY) / resolution)
  
  flowField = new Array(numCols * numRows)
  
  initialFlowDirection = random(0, TAU)

  
  let yOff = 0
  for (let y = 0; y < numCols; y++) {
    let xOff = 0
    for (let x = 0; x < numCols; x++) {

      angle = noise(xOff, yOff) * initialFlowDirection
      let v = p5.Vector.fromAngle(angle)
      
      xOff += inc
      stroke(90)
      push()
      translate (x * resolution, y * resolution)
      rotate(v.heading())
      line(0, 0, resolution, 0)
      pop()
    }
    yOff += inc
    zOff += 0.002
  }


  translate(w/2, h/2)

  let xPoint = 0
  let yPoint = 0

  beginShape()
  stroke(255, 0, 0)
  // curveVertex(x,y)
  
  for (let i = 0; i < 10; i++) {
    curveVertex(xPoint,yPoint)

    let xOffset = int(xPoint - leftX)
    let yOffset = int(yPoint - topY)

    step.push(i+1)

    // let step[index] = i 

    columnIndex = int(xOffset / resolution)
    rowIndex = int(yOffset / resolution)

    let gridAngle = flowField[(columnIndex, rowIndex)]

    let xStep = step.length * cos(gridAngle)
    let yStep = step.length * sin(gridAngle)

    xPoint = xPoint + xStep
    yPoint = yPoint + yStep
    
    curveVertex(xPoint,y)
    console.log(xOffset)

  }
  endShape()

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

  // let yOff = 0
  // for (let y = 0; y < numCols; y++) {
  //   let xOff = 0
  //   for (let x = 0; x < numCols; x++) {

  //     let index = x + y * numCols
  //     angle = noise(xOff, yOff) * initialFlowDirection

  //     col = noise(zOff) * 255
      
  //     let v = p5.Vector.fromAngle(angle)
  //     v.setMag(1)

  //     flowField[index] = v
  //     xOff += inc
  //     // rect(x * scale, y * scale, scale, scale)
  //     stroke(90)
  //     // noStroke()
  //     push()
  //     //go to point in grid
  //     translate (x * scale, y * scale)

  //     //rotate in the direction of the vector
  //     rotate(v.heading())
      
  //     //draw a line to with the length of scale with that rotation
  //     line(0, 0, scale, 0)

  //     pop()

  //   }
  //   yOff += inc
  //   zOff += 0.0002

  // }

  // for (let i = 1; i < particles.length; i++) {
  //   particles[i].follow(flowField)

  //   particles[i].update()
  //   particles[i].show()
  //   particles[i].edges()
  // }

  for (let i = 1; i < shapes.length; i++) {
    shapes[i].build()
    // shapes[i].update()
    shapes[i].show()
  }   
// console.log(shapes[0].startingPoint)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

