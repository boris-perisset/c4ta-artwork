//https://learn.ml5js.org/#/reference/neural-network


let model
let notes = {
  A: 110,
  E: 330,
  G: 196
}

let frequency = 0
let envelope, wave
let targetLabel = "A"
let state = "collection"

const modelInfo = {
  model: 'path/to/model.json',
  metadata: 'path/to/model_meta.json',
  weights: 'path/to/model.weights.bin',
};


let strings = []

let blue = "#222b8e"
let turkis = "#7fffd4"
let red = "#fc8282"

/////////////////////////// SETUP ///////////////////////
function setup() {
  getAudioContext().suspend();

  w = windowWidth - (windowWidth*0.25)
  h = windowHeight

  const cnv = createCanvas(w, h)
  cnv.parent('pi5-canvas')

  background (blue)
  textSize(24)
  
  let options = {
    inputs: ["x", "y"],
    outputs: ["frequency"],
    task: "regression",
    debug: true,
    learningRate: 0.1
  }

  model = ml5.neuralNetwork(options)

  setupButtons()

  envelope = new p5.Envelope()
  envelope.setADSR(0.05, 0.1, 0.7, 1)
  envelope.setRange(1.2, 0) 

  wave = new p5.Oscillator()
  wave.setType("sine")
  wave.start()
  wave.freq(300)
  wave.amp(envelope)

  for (let i = 50; i < h; i+= 100) {
    midPoint = createVector(w/2, i)
    strings.push(new GuitarString(1, midPoint))
  }

  for(let string of strings){
    distToMid = dist(mouseX, mouseY, string.mid.x, string.mid.y)
    strokeWeight(1)
    stroke(turkis)
    string.draw()
  }
}

/////////////////////////// DRAW ///////////////////////

function draw() {

  if(state === "prediction"){
    background(blue)
    fill(turkis)

    for(let string of strings){
      distToMid = dist(mouseX, mouseY, string.mid.x, string.mid.y)
      strokeWeight(1)
      stroke(turkis)
      string.update()
      string.draw()

      if(distToMid < 50) {
        fill(red)
        circle(string.mid.x, string.mid.y, 20)
        text(str(frequency).slice(0, 6), mouseX, mouseY)
      }
    }
  }
}


/////////////////////////// FUNCTIONS ///////////////////////


function setupButtons() {
  // if (getAudioContext().state !== 'running') {
  buttonSound = createButton("Sound On")
  buttonSound.position(w+(w*0.05),00)
  // } else {
  buttonSoundOff = createButton("Sound Off")
  buttonSoundOff.position(w+(w*0.15),00)
  // }

  buttonA = createButton("Add A Note")
  buttonA.position(w+(w*0.05),40)

  buttonE = createButton("Add E Note")
  buttonE.position(w+(w*0.05),80)

  buttonG = createButton("Add G Note")
  buttonG.position(w+(w*0.05),120) 

  saveButton = createButton("Save Data")
  saveButton.position(w+(w*0.05),240)

  loadButton = createButton("Load Data")
  loadButton.position(w+(w*0.05),280)

  saveModelButton = createButton("Save Model")
  saveModelButton.position(w+(w*0.05),320)

  loadModelButton = createButton("Load Model")
  loadModelButton.position(w+(w*0.05),360)


  trainButton = createButton("Train Model")
  trainButton.position(w+(w*0.05),h-100)
  
  trainButton.mousePressed(function(){
    console.log("Start Training")
    model.normalizeData()

    let options = {
      epochs: 70,
    }

    model.train(options, whileTraining, doneTraining)
  })

  buttonSound.mousePressed(function(){
    userStartAudio()
    console.log("Running?",getAudioContext().state)
  })

  buttonSoundOff.mousePressed(function(){
    // getAudioContext().pause()
    getAudioContext().suspend();
    console.log("Pause?",getAudioContext().state)
  }) 

  saveModelButton.mousePressed(function(){
    model.save()
  })

  loadModelButton.mousePressed(function(){
    model.load(modelInfo)
  })

  saveButton.mousePressed(function(){
    model.saveData("musically-notes",)
  })

  loadButton.mousePressed(function(){
    model.loadData("musically-notes.json", dataLoaded)
  })

  buttonA.mousePressed(function(){
    fill(turkis)
    targetLabel = "A"
  })

  buttonE.mousePressed(function(){
    fill(255)
    targetLabel = "E"
  })

  buttonG.mousePressed(function(){
    fill(red)
    targetLabel = "G"
  })
}
  
function whileTraining(epoch, loss){
  console.log(`Training - epoch: ${epoch}, loss:${loss}`);
}
  
function doneTraining() {
  console.log("Done Training")
  clear()
  state = "prediction"
}

function mousePressed() {
  let inputs =  {
    x: mouseX,
    y: mouseY,
  }

  if ( state === "collection") {
    noStroke()
    fill(turkis)
    let targetFrequency = notes[targetLabel]
    let output = {
      frequency: targetFrequency
    }

    model.addData(inputs, output)

    text(targetLabel, mouseX, mouseY)
    wave.freq(targetFrequency)
    envelope.play()


  } else if (state === "prediction"){
    model.predict(inputs, gotResults)
  }
}


function gotResults(error, result) {
  if (error) {
    console.log(error)
    return
  }
  console.log(result)
  frequency = result[0].value


  wave.freq(frequency)
  envelope.play()

  for(let string of strings){
    distToMid = dist(mouseX, mouseY, string.mid.x, string.mid.y)  
    if (distToMid < 50) {
      string.setVal(floor(frequency)) // 100
      string.pluck()
    }
  }

}

function dataLoaded(){
  console.log("Data Loaded")
}