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
//   id: b
//   name: model


// }

let buttons = ["b1","b2","b3","b4","b5"]
let drawing
let drawingArray = []

let totalScore = 0


/////////////////////////// SETUP ///////////////////////
function setup() {
  w = 800
  h = 600

  const cnv = createCanvas(w, h)
  cnv.parent('pi5-canvas')
  // console.log(modelRNNs)
  
  buttonsSetup()

  noStroke()
  textAlign(CENTER, CENTER)
  textFont("Helvetica")
  textSize(24)
  text("Errate die Skizze", w/2, h/2)
  text("Drücke S um das Spiel zu starten", w/2, h/2 + 30)

  for (let i = 0; i < buttons.length; i++){
    let buttonName = buttons[i].toString()
    buttons[i] = select("#" + buttonName)
    // buttons[i] = select("#" + drawingArray[i].toString()) 

  }
}

/////////////////////////// DRAW ///////////////////////

function draw() {
  // If something new to draw
  if (strokePath) {
    // If the pen is down, draw a line
    if (previous_pen == 'down') {
      stroke(0);
      strokeWeight(3.0);
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

  if (totalScore > 20) {
    clear()
    text("YOU WON", w/2, h/2)
    text ("Drücke R zum Restarten", w/2, h/2 + 30) 
  }
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
    select("#status").html("modelRNN am Laden")
    modelRNN = ml5.sketchRNN(drawing, modelReady)
    clicked = true
    }
  }
  if (key == "r" | key == "R") {
    // select("#status").html("modelRNN am Laden")
    buttonReset()
    modelRNN = ml5.sketchRNN(drawing, modelReady)
    resetClicked = true

  }
}

// Reset the drawing
function startDrawing() {
  background(220);
  
  text ("Total Score", w - 200, 20)
  text (totalScore, w - 200, 60)
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

function buttonsSetup() {
  for (let i = 0; i < buttons.length; i++) {
  drawingArray.push(random(models))
  drawing = random(drawingArray)
  }

}

function buttonReset() {
  for (let i = 0; i < buttons.length; i++) {
    drawingArray.push(random(models))
    drawing = random(drawingArray)
  }
}

function gameCheck() {

  for (let i = 0; i < buttons.length; i++) {

      buttons[i].mousePressed(function(){

      if (buttons[i].html() == drawing) {
        drawingArray.push(random(models))
        drawing = random(drawingArray)
        modelRNN = ml5.sketchRNN(drawing, modelReady)
        totalScore += 10
      }
      noStroke()
      text ("Game Over", w/2, h/2 -100)
      text ("Drücke R zum Restarten", w/2, h/2)
      fill(100)
      text ( `Die richtige Antwort war: ${drawing}`, w/2, h/2 +100 )
    })
  }

}