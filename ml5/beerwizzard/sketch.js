let model
let table 
let blue = "#222b8e"
let turkis = "#7fffd4"
let red = "#fc8282"

let alcohol = 30
let bitterness = 30
let sweetness = 30
let sourness = 30
let saltyness = 30
let hoppyness = 30
let spiceyness = 30
let maltyness = 30

let amount = 1200
let vec = 0
let dots = []
let lineMaxDist = 100;


//loading the original table. And change the rating of number values into a string.
function preload() {
  table = loadTable('new-beerlist.csv', 'csv', 'header')
}

/////////////////////////// SETUP ///////////////////////
function setup() {
  w = displayWidth
  h = displayWidth


  const cnv = createCanvas(w, h)
  cnv.parent('pi5-canvas')

  // background (blue)
  // textSize(24)

  changeTable()


  let options = {
    dataUrl: "csv-sets/new_beers.csv",
    input: ["Alcohol", "Bitter", "Sweet", "Sour", "Salty", "Fruits", "Hoppy", "Spices", "Malty"],
    // input: ["Name", "Style", "Brewery", "Alcohol", "Bitter", "Sweet", "Sour", "Salty", "Fruits", "Hoppy", "Spices", "Malty","review_aroma", "review_appearance", "review_taste", "review_overall", "number_of_reviews" ],
    outputs: ["review_overall"],
    task: "classification",
    debug: true,
    // learningRate: 0.1
  }
  
  model = ml5.neuralNetwork(options, modelReady)
  setupButtons()

  //Create Background Bubbles
  for (i = 0; i < amount; i++) {
    let x = random(0,w)
    let y = random(0,h)
    dots[i] = new Bubbles(x, y)
  }
}


/////////////////////////// DRAW ///////////////////////

function draw() {
  // console.log("Salty", saltyness)

  //Bubbles bubbeling in the background
  background("#fff07a")

  for(let i = 0; i < dots.length; i++) {
    fill(0)
    dots[i].showDot()
    dots[i].updatePos()  
  }
}
/////////////////////////// FUNCTIONS ///////////////////////


function setupButtons() {

  loadButton = select("#load")
  loadButton.mousePressed(function(){
    model.loadData("csv-sets/new_beers.csv", dataLoaded)
  })

  saveButton = select("#save")
  saveButton.mousePressed(function(){
     saveTable(table, 'new_beer.csv')
  })

  trainButton = select("#train")
  trainButton.mousePressed( function(){
     let trainingOptions = {
       epoch: 40,
     }

     model.train(trainingOptions, whileTraining, doneTraining)
  })
  predictButton = select("#predict")
  predictButton.mousePressed(classify)
  predictButton.hide()
}

function modelReady() {
  console.log("Beerlist Loaded")
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
  // reviewStyle = parseInt(select("#review").value().elt.value)

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
  rating = result[0].value
  document.getElementById('result').html(rating); 

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


function changeTable() {
  
  let col = table.getColumn('review_overall')
  for (let j = 0; j < col.length; j++) {

    let rows = table.getRows();
    for (let r = 0; r < rows.length; r++) {
      let rating = rows[r].getString('review_overall');
      rows[r].setString('review_overall', rating);

      if (rating >= 1 && rating < 2) {
        rows[r].setString('review_overall', "like piss. Not even drunk pirates will drink that shit!");
        // setString( i, 'review_overall', "like piss")
      } else if (rating >= 2  && rating < 3) {
        rows[r].setString('review_overall', "terrible brew dude. Try again.");
        // setString( i, 'review_overall', "terrible")
      } else if (rating >= 3  && rating < 4) {
        rows[r].setString('review_overall', "alrighty. Sell it cheap, that could work.");
        // setString( i, 'review_overall', "alrighty")
      } else if (rating >= 4  && rating < 5) {
        rows[r].setString('review_overall', "savvy mate! even sober people will love it.");
        // setString( i, 'review_overall', "awesome")
      }
    }
  }
}

function dataLoaded(){
  console.log("New Beerlist Loaded")
}