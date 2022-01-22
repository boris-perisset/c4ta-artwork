let model

let blue = "#222b8e"
let turkis = "#7fffd4"
let red = "#fc8282"

let alcohol = 50
  let bitterness = 50
  let sweetness = 50
  let sourness = 50
  let saltyness = 50
  let hoppyness = 50
  let spiceyness = 50
  let maltyness = 50

/////////////////////////// SETUP ///////////////////////
function setup() {
  // w = windowWidth - (windowWidth*0.25)
  // h = windowHeight

  
  const cnv = createCanvas(0, 0)
  cnv.parent('pi5-canvas')

  // background (blue)
  // textSize(24)

  let options = {
    dataUrl: "new-beerlist.csv",
    input: ["Alcohol", "Bitter", "Sweet", "Sour", "Salty", "Fruits", "Hoppy", "Spices", "Malty"],

    // input: ["Name", "Style", "Brewery", "Alcohol", "Bitter", "Sweet", "Sour", "Salty", "Fruits", "Hoppy", "Spices", "Malty","review_aroma", "review_appearance", "review_taste", "review_overall", "number_of_reviews" ],
    outputs: [ "review_aroma", "review_appearance", "review_taste", "review_overall", "number_of_reviews" ],
    task: "classification",
    debug: true,
    learningRate: 0.1
  }
  
  model = ml5.neuralNetwork(options, modelReady)
  setupButtons()
}

/////////////////////////// DRAW ///////////////////////

function draw() {
  // console.log("Salty", saltyness)
}

/////////////////////////// FUNCTIONS ///////////////////////


function setupButtons() {

  trainButton = select("#train")
  trainButton.mousePressed( function(){
     let trainingOptions = {
       epoch: 40
     }

     model.train(trainingOptions, whileTraining, doneTraining)
  })
  predictButton = select("#predict")
  predictButton.mousePressed(classify)
  predictButton.hide()
}

function modelReady() {
  console.log("Model Loaded")
  model.normalizeData()
}

function whileTraining(epoch, loss) {
  console.log(epoch, loss)
}

function doneTraining() {
  predictButton.show()
  trainButton.hide()
  console.log("Training done")
}

function classify() {
  alcohol = parseInt(select("#Alcohol").value())
  bitterness = parseInt(select("#Bitter").value())
  sweetness = parseInt(select("#Sweet").value())
  sourness = parseInt(select("#Sour").value())
  saltyness = parseInt(select("#Salty").value())
  fruityness = parseInt(select("#Fruits").value())
  hoppyness = parseInt(select("#Hoppy").value())
  spiceyness = parseInt(select("#Spices").value())
  maltyness = parseInt(select("#Malty").value())
  reviewStyle = parseInt(select("#review").value().elt.value)

  let userInputs = {
    alcohol: alcohol,
    bitter: bitterness,
    sweet: sweetness,
    sour: sourness,
    salty: saltyness,
    fruits: fruityness,
    hoppy: hoppyness,
    spicey: spiceyness,
    malty: maltyness,
  }
  model.classify(userInputs, gotResults)
}

function gotResults(error, result){
  if(error){
    console.log(error)
    return
  }
  console.log(result)
  // model.predict(inputs, gotResults)
}

function updateTextInput(val, id) {
  if (id === "Alcohol"){
    document.getElementById('alc-value').value=val; 
  } else if (id === "Bitter"){
    document.getElementById('bitter-value').value=val; 
  } else if (id === "Sweet"){
    document.getElementById('sweet-value').value=val; 
  } else if (id === "Sour"){
    document.getElementById('sour-value').value=val; 
  } else if (id === "Salty"){
    document.getElementById('salt-value').value=val; 
  } else if (id === "Fruits"){
    document.getElementById('fruit-value').value=val; 
  } else if (id === "Hoppy"){
    document.getElementById('hoppy-value').value=val; 
  } else if (id === "Spices"){
    document.getElementById('spices-value').value=val; 
  } else if (id === "Malty"){
    document.getElementById('malty-value').value=val; 
  }
}