/*
=====================     G L O B A L      ========================================
*/
let flow = 0;
let resolution = 60
let fieldSize = 0
let angle;
let brush;
let globalPoints = {
  id: [{id: "gP"}],
  position: [{x: 0, y: 0}],
  color: ["#426b78","#6cc2db", "#a8d9e7", "#d9dbda", "#f7dcd00", "#f0dad6"],
  angle: [],
  strokeCap: ["ROUND", "SQUARE", "PROJECT"],
}


let randomArrayElement = function(ia) {
  return (ia[Math.floor(Math.random()*ia.length)])
}

/*
=====================     S E T U P      ========================================
*/


function setup() {
  let w = windowWidth
  let h = windowHeight

  fieldSize = w/resolution

  const cnv = createCanvas(w, h);
  cnv.parent('pi5-canvas');

  let colorBG = randomArrayElement(globalPoints.color)
  background(colorBG)

  for (let row = 0; row < resolution; row += 1) {
    for (let col = 0; col < resolution; col += 1) {

      let PosX = row * fieldSize
      let PosY = col * fieldSize
      
      let angle = (row/TAU)

      // The simple grid without translate to achieve all coordinates

      // Pushing the position of each gridPoint to the globalPoints Object in the Array "position", which has an Object with x and y.
      globalPoints.position.push({x: PosX, y: PosY})

     // Pushing an ID to the global Points Object
      globalPoints.id.push("R" + row + "C" + col)

      // Pushing an Angle to the Objects
      globalPoints.angle.push(angle)
    }
  }
  console.log(globalPoints)

  angle = TAU/360

  // A Loop for the Lines starting from the globalPoints positions.
  
  for (let i = 0; i < globalPoints.id.length; i++) {
    // Random Stroke Weight to Play with

    brush = 0.2 + ((i/resolution) * random())
    strokeWeight(brush)

    // Coloring Random Colors of an Color Selection in an Array
    let randCap = randomArrayElement(globalPoints.strokeCap)
    strokeCap(randCap)

    let x1 = globalPoints.position[i].x
    let y1 = globalPoints.position[i].y
    
    // let x2 = x1 * (2.5 * noise(flow * angle * i))
    // let y2 = y1 * (2 * noise(flow + angle * i))
    
    let x2 = x1 + globalPoints.angle[i] * i/TAU * noise(i*4)
    let y2 = y1 + globalPoints.angle[i] * i/TAU


    let circleSize = random(20,(100/i))
    if (circleSize > 19.8 && circleSize < 25) {
    let randomColor2 = randomArrayElement(globalPoints.color)
    fill('#e8c65c')
    noStroke()
    circle(x1 * noise(i), y1 * noise(i), circleSize)
  } else {
    let randomColor2 = randomArrayElement(globalPoints.color)
    fill(randomColor2)
    noStroke()
    circle(x1 * noise(i), y1 * noise(i), circleSize)

  }
    // flow = flow + 0.00002
    // Coloring Random Colors of an Color Selection in an Array


    if (brush > 21 && brush < 24 ) {
      stroke('#e8c65c')
      line(x1, y1, x2*i, y2*i)
    } else {
      let randomColor = randomArrayElement(globalPoints.color)
      stroke(randomColor)
      line(x1, y1, x2, y2)
    }

  }



  // let x = 500
  // let y = 100
  // beginShape()
  // for (let i = 0; i < 10; i++) {
  //   vertex(x, y)
  //   let x_offset = x + globalPoints.position[i * 100].x
  //   let y_offset = y * globalPoints.position[i * 100].y
  //   let column_index = int(x_offset / resolution)
  //   let row_index = int(y_offset / resolution)
  //   // NOTE: normally you want to check the bounds here
  //   let grid_angle = globalPoints.angle[i]
  //   let x_step = fieldSize * cos(grid_angle)
  //   let y_step = fieldSize * sin(grid_angle)
  //   x = x + x_step
  //   y = y + y_step
  // }
  // endShape()


}

/*
=====================     D R A W      ========================================
*/


function draw () {

}
