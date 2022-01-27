let model
let table 
let table2

//gradient background
let b1, b2, c1, c2;
const Y_AXIS = 1;
const X_AXIS = 2;

let rating

let alcohol = 30
let bitterness = 30
let sweetness = 30
let sourness = 30
let saltyness = 30
let hoppyness = 30
let spiceyness = 30
let maltyness = 30

let amount = 400
let vec = 0
let dots = []
let lineMaxDist = 100;

let beerTypes = []

const modelInfo = {
  model: 'path/to/beerlist.json',
  metadata: 'path/to/beerlist_meta.json',
  weights: 'path/to/beerlist.weights.bin',
};

/////////////////////////// PREPARATION  ///////////////////////

//loading the original table. And change the rating of number values into a string.
function preload() {
  table = loadTable('new-beerlist.csv', 'csv', 'header')
}

//refine the ratings to get funier and more results.
function changeTable() {
  
  let col = table.getColumn('review_overall')

  for (let j = 0; j < col.length; j++) {

    let rows = table.getRows();
    for (let r = 0; r < rows.length; r++) {
      let rating = rows[r].getString('review_overall');
      rows[r].setString('review_overall', rating);

      if (rating >= 0 && rating < 1) {
        rows[r].setString('review_overall', "A waste of time. It stinks! 0/8");
        // setString( i, 'review_overall', "like piss")
      } else if (rating >= 1 && rating < 1.5) {
        rows[r].setString('review_overall', "Like piss. Not even drunk pirates will drink that shit! 1/8");
        // setString( i, 'review_overall', "like piss")
      } else if (rating >= 1.5 && rating < 2) {
        rows[r].setString('review_overall', "Good Lord! What an ugly soup you brew! 2/8");
        // setString( i, 'review_overall', "like piss")
      }  else if (rating >= 2 && rating < 2.5) {
        rows[r].setString('review_overall', "Terrible brew dude. Try again. 3/8");
        // setString( i, 'review_overall', "like piss")
      } else if (rating >= 2.5  && rating < 3) {
        rows[r].setString('review_overall', "Well. Sometimes you just have a bad day. Next time... 4/8");
        // setString( i, 'review_overall', "terrible")
      } else if (rating >= 3  && rating < 3.5) {
        rows[r].setString('review_overall', "Alrighty. Sell it cheap, that could work. 5/8");
        // setString( i, 'review_overall', "alrighty")
      } else if (rating >= 3.5  && rating < 4) {
        rows[r].setString('review_overall', "If I'm drunk. This shit's gonna flow heavily! 6/8");
        // setString( i, 'review_overall', "terrible")
      } else if (rating >= 4  && rating < 4.5) {
        rows[r].setString('review_overall', "Not Bad old chap! A decent beer you brew 7/8");
        // setString( i, 'review_overall', "terrible")
      }  else if (rating >= 4.5  && rating <= 5) {
        rows[r].setString('review_overall', "Savvy mate! even sober people will love it. 8/8");
        // setString( i, 'review_overall', "awesome")
      }
    }
  }
}




/////////////////////////// SETUP ///////////////////////
function setup() {
  w = displayWidth
  h = displayWidth

  b1 = color(244, 193, 23);
  b2 = color(255, 242, 108);


  const cnv = createCanvas(w, h)
  cnv.parent('pi5-canvas')

  changeTable()

  let options = {
    dataUrl: "csv-sets/new_beers.csv",
    inputs: ["Alcohol", "Bitter", "Sour"],
    // input: ["Alcohol", "Bitter", "Sweet", "Sour", "Salty", "Fruits", "Hoppy", "Spices", "Malty"],
    // input: ["Name", "Style", "Brewery", "Alcohol", "Bitter", "Sweet", "Sour", "Salty", "Fruits", "Hoppy", "Spices", "Malty","review_aroma", "review_appearance", "review_taste", "review_overall", "number_of_reviews" ],
    outputs: ["review_overall"],
    task: "classification",
    debug: true,
    learningRate: 0.1
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
  // background("#fff07a")
  setGradient(0, 0, w, h, b1, b2, Y_AXIS);
  setGradient(w, 0, w, h, b2, b1, Y_AXIS);

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

  savingButton = select("#save")
  savingButton.mousePressed(function(){
     saveTable(table, 'new_beers.csv')
  })

  trainButton = select("#train")
  trainButton.mousePressed( function(){
     let trainingOptions = {
       epochs: 60,
       batchSize: 32
     }

     model.train(trainingOptions, whileTraining, doneTraining)
     console.log(model.data)
  })
  predictButton = select("#predict")
  predictButton.mousePressed(classify)
  predictButton.hide()

  saveModelButton = select("#saveModel")
  saveModelButton.hide()
  saveModelButton.mousePressed(function(){
    

    model.save()
  })

  loadModelButton = select("#loadModel")
  loadModelButton.mousePressed(function(){
    model.load(modelInfo)
  })
}

function modelReady() {
  console.log("Beerlist Loaded")
  model.normalizeData()
}

function whileTraining(epoch, loss) {
  console.log(epoch, loss)
  let meanwhile = select("#train")
  meanwhile.html("fetching drunk sailors")
}

function doneTraining() {
  predictButton.show()
  saveModelButton.show()
  loadModelButton.hide()
  trainButton.hide()
 // console.log("Training done")
}

function classify() {
  alcohol = parseFloat(select("#Alcohol").value())
  bitterness = parseFloat(select("#Bitter").value())
  sourness = parseFloat(select("#Sour").value())

  // alcohol = parseFloat(select("#Alcohol").value())
  // bitterness = parseFloat(select("#Bitter").value())
  // sweetness = parseFloat(select("#Sweet").value())
  // sourness = parseFloat(select("#Sour").value())
  // saltyness = parseFloat(select("#Salty").value())
  // fruityness = parseFloat(select("#Fruits").value())
  // hoppyness = parseFloat(select("#Hoppy").value())
  // spiceyness = parseFloat(select("#Spices").value())
  // maltyness = parseFloat(select("#Malty").value())
  // reviewStyle = parseFloat(select("#review").value().elt.value)

  let userInputs = {
    Alcohol: alcohol,
    Bitter: bitterness,
    Sour: sourness,

    // alcohol: alcohol,
    // bitter: bitterness,
    // sweet: sweetness,
    // sour: sourness,
    // salty: saltyness,
    // fruits: fruityness,
    // hoppy: hoppyness,
    // spicey: spiceyness,
    // malty: maltyness,
  }
  model.classify(userInputs, gotResults)
  console.log("UserInput Alcohol",userInputs.Alcohol)
}

function gotResults(error, result){
  if(error){
    console.error(error)
    return
  } 

    // if(result[0].label ==)
    console.log(result)
    //rating = options.outputs
    //result[0] > The array index [0] is the top choice of the machine learning model training.
    console.log(result[0].label)
    rating = result[0].label
    let phrase = select("#result")
    phrase.html(rating)
    // document.getElementById('result').html(rating); 
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




function dataLoaded(){
  console.log("New Beerlist Loaded")
}

// function getBeerTypes() {
//   let selection = creatSelection()
//   selection.position(0,220, 300)

//   let rows2 = table2.getRows();

//     for (let r = 0; r < rows2.length; r++) {
//       let style = rows2[r].getString('Style');

//       for (let j = 0; j < style.length; j++) {
//       beerTypes.push(styles[j]);
//       }
//     }

//     let uniqueValues = getUniqueValues(beerTypes) {
//       for (let j = 0; j > uniqueValues.length; j++) {
//         selection.option(uniqueValues[j])
//       }
//     }
// }

// function getUniqueValues(array) {
//   let newarray = array.filter((element, index, array) => array.indexOf(element) === index)
// }


function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}
