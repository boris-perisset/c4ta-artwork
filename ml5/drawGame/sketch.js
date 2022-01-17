// The SketchRNN modelRNN
let modelRNN;
// Start by drawing
let previous_pen = 'down';
// Current location of drawing
let x, y;
// The current "stroke" of the drawing
let strokePath;
let clicked = false
let resetClicked = false

// let button = {
//   id: b,
//   name: model
// }
let buttonName
let buttons = ["Word1", "Word2", "Word3", "Word4", "Word5"]
let drawing
let drawingArray = []

let totalScore = 0

let red = ("#fc8282")
let turkis = ("#7fffd4")
let white = ("#ffffff")

/////////////////////////// SETUP ///////////////////////
function setup() {
  w = 800
  h = 600

  const cnv = createCanvas(w, h)
  cnv.parent('pi5-canvas')
  // console.log(modelRNNs)


  noStroke()
  textAlign(CENTER, CENTER)
  textFont("Helvetica")
  textSize(24)
  fill(white)
  text("Guess the Sketch", w/2, h - 150)
  fill (red)
  text("press S to start", w/2, h - 100)
  fill (white)

  // buttonsSetup()
  for (let i = 0; i < buttons.length; i++) {
    buttonName = buttons[i].toString()
    buttons[i] = select("#" + buttonName)
    buttons[i].html(buttonName.toString())
    // buttons[i].html(drawingArray[i].toString())
  }
}

/////////////////////////// DRAW ///////////////////////

function draw() {
  strokeCap(ROUND)
  strokeJoin(ROUND)
  // If something new to draw
  if (strokePath) {
    // If the pen is down, draw a line
    if (previous_pen == 'down') {
      stroke(turkis);
      strokeWeight(2);
      line(x, y, x + strokePath.dx, y + strokePath.dy);
    }
    // Move the pen
    x += strokePath.dx;
    y += strokePath.dy;
    // The pen state actually refers to the next stroke
    previous_pen = strokePath.pen;

    // If the drawing is complete
    if (strokePath.pen !== 'end') {
      strokePath = null;
      modelRNN.generate(gotStroke);
    }
  }

  if (totalScore > 80) {
    clear()
    fill(turkis)
    text("YOU WON", w/2, h - 150)
    text ("press R to restart", w/2, h - 100) 
  }

  // console.log(drawing)

}

/////////////////////////// AFTER DRAW ///////////////////////

function modelReady() {
  select("#status").html("modelRNN ist Bereit")
  startDrawing()
}

function keyPressed() {
  if (key == "s" | key == "S") {
    if (!clicked) {
      totalScore = 0

      for (let i = 0; i < buttons.length; i++) {
        drawingArray.push(random(models))
        // buttons[i].html(buttonName.toString())
        buttons[i].html(drawingArray[i].toString())
      }

      drawing = random(drawingArray)
      select("#status").html("modelRNN am Laden")
      modelRNN = ml5.sketchRNN(drawing, modelReady)
      
      clicked = true
    }
  }

  if (key == "n" | key == "N") {
      drawingArray.splice(0,drawingArray.length)

      for (let i = 0; i < buttons.length; i++) {
        drawingArray.push(random(models))
        buttons[i].html(drawingArray[i].toString())
      }
      drawing = random(drawingArray)
      select("#status").html("modelRNN am Laden")
      modelRNN = ml5.sketchRNN(drawing, modelReady)
      
      clicked = true  
  }

  if (key == "r" | key == "R") {
      totalScore = 0

      drawingArray.splice(0,drawingArray.length)
      // clear()

      for (let i = 0; i < buttons.length; i++) {
        drawingArray.push(random(models))
        buttons[i].html(drawingArray[i].toString())
      }
      drawing = random(drawingArray)
      // return drawing

      modelRNN = ml5.sketchRNN(drawing, modelReady)
      resetClicked = true
  }
}

// Reset the drawing
function startDrawing() {
  background(34, 43, 142);
  
  text ("Total Score", w - 100, 20)
  text (totalScore, w - 115, 60)
  text ("/ 80", w - 80, 60)
  // Start in the middle
  x = width / 2;
  y = height / 2;
  modelRNN.reset();
  // Generate the first stroke path
  modelRNN.generate(gotStroke);
  gameCheck()
}

// A new stroke path
function gotStroke(err, s) {
  strokePath = s;
}

// function buttonsSetup() {

//   for (let i = 0; i < buttons.length; i++) {
//     let buttonName = buttons[i].toString()
//     drawingArray.push(random(models))
//     // console.log(drawingArray[i])

//     buttons[i] = select("#" + buttonName)
//     buttons[i].html(drawingArray[i].toString())
//   }
// }

function gameCheck() {

  for (let i = 0; i < buttons.length; i++) {
      buttons[i].mousePressed(function(){

      if (buttons[i].html() == drawing) {
        // drawingArray.push(random(models))
        // drawing = random(drawingArray)
        // modelRNN = ml5.sketchRNN(drawing, modelReady)
        noStroke()
        fill(turkis)
        text("CORRECT", w/2, h -150 )
        text ( `${drawing} was right. press N for new sketch`, w/2, h - 100 )
        stroke(0)
        totalScore += 10
      } else {
        noStroke()
        fill(red)
        text ("Game Over", w/2, h - 200)
        text ("press R to restart", w/2, h - 150)
        fill(white)
        text ( `the right answer was: ${drawing}`, w/2, h - 100 )
      }

    })
  }
}