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
let Nextclicked = false
let buttonName
let buttons = ["Word1", "Word2", "Word3", "Word4", "Word5"]
let drawing
let drawingArray = []

let scoreText = 0
let totalScore = 0

let red = ("#fc8282")
let turkis = ("#7fffd4")
let white = ("#ffffff")

let waiting = false
let a = 0.0;
let inc = 0

/////////////////////////// SETUP ///////////////////////
function setup() {
  inc = TWO_PI / 120.0;

  w = windowWidth * 0.8
  h = windowHeight * 0.8

  const cnv = createCanvas(w, h)
  cnv.parent('pi5-canvas')

  noStroke()
  textAlign(CENTER, CENTER)
  textFont("Helvetica")
  textSize(20)
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
    text ("press R to restart", w/2, h - 125) 
  }
  if (waiting === true) {
    noStroke()
    background(34, 43, 142);
    fill(turkis)
    circle(w/2 + cos(a) * 40 ,h/2 + sin(a) * 40, 3)
    a = a + inc
  }
  // console.log(drawing)
}

/////////////////////////// AFTER DRAW ///////////////////////

function modelReady() {
  select("#status").html("Guess the Sketch")
  counter = 0
  waiting = false
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
      waiting = true
      select("#status").html("First Sketch is loading")
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
      waiting = true
      select("#status").html("Next Sketch is loading")
      modelRNN = ml5.sketchRNN(drawing, modelReady)
      
      Nextclicked = true  
  }

  if (key == "r" | key == "R") {
      totalScore = 0

      drawingArray.splice(0,drawingArray.length)

      for (let i = 0; i < buttons.length; i++) {
        drawingArray.push(random(models))
        buttons[i].html(drawingArray[i].toString())
      }
      drawing = random(drawingArray)
      select("#status").html("New Game is loading")
      modelRNN = ml5.sketchRNN(drawing, modelReady)
      resetClicked = true
  }
}

// Reset the drawing
function startDrawing() {
  background(34, 43, 142);
  select("#score").html(`Your Score ${totalScore}/80.`)
  // score.html(scoreText.toString())

  // text (totalScore, w - 115, 60)
  // text ("/ 80", w - 80, 60)
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
        text ( `${drawing} was right.`, w/2, h - 125 )
        fill(white)
        text ( "press N for new sketch", w/2, h - 100 )

        stroke(0)
        totalScore += 10
      } else {
        noStroke()
        fill(red)
        text ("Game Over", w/2, h - 150)
        text ( `the right answer was: ${drawing}`, w/2, h - 125 )
        fill(white)
        text ("press R to restart", w/2, h - 100)
      }

    })
  }
}
