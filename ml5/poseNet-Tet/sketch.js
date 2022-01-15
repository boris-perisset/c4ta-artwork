let mobileNet
let classifier

let video

let classes = ["Happy", "Surprised", "Neutral"]
let buttons = ["buttonHappy", "buttonSurprised", "buttonNeural"]

let w = 400
let h = 400


/////////////////////////// SETUP ///////////////////////
function setup() {
  w = 800
  h = 600

  const cnv = createCanvas(w, h)
  cnv.parent('pi5-canvas')

  video = createCapture(VIDEO)
  video.size(w, h)
  video.hide()


  mobileNet = ml5.featureExtractor("MobileNet", modelReady)
  classifier = mobileNet.classification(video)

  initializeButtons()
}


/////////////////////////// DRAW ///////////////////////
function draw() {
  // translate(w/2, h/2)
  image(video, 0, 0)

}


function modelReady(){
  // console.log("model loaded")
  select("#status").html("Model Loaded")
}


function initializeButtons() {
  
  for (let i = 0; i < classes.length; i++) {
    let className = classes[i].toString()
    buttons[i] = select("#" + className)
    buttons[i].mousePressed(function() {
      classifier.addImage(className)
      let span = document.getElementById(className + "Images")
      let numImages = parseInt(span.innerHTML)
      numImages++
      span.innerHTML = numImages
    })    
  }

  train = select("#Train")
  train.mousePressed(function() {
    classifier.train(function(lossValue) {
      if(lossValue) {
        loss = lossValue
        select("#loss").html(`loss: ${loss}`) //backticks > `
      } else {
        select("#loss").html(`Finished, Final Loss: ${loss}`)
      }
    })
  })

  predict = select("#Predict")
  predict.mousePressed(classify)

  saveModel = select("#saveModel")
  saveModel.mousePressed(function() {
    classifier.save()
  })

  loadModel = select("#loadModel")
  loadModel.mousePressed(function(){
    select("#status").html("Loaded custom model")
  })

  loadModel.changed(function(){
    classifier.load(load.elt.files)
  })


}

function classify() {
  classifier.classify(gotResult)
}

function gotResult(error, result) {
  if(error) {
    console.log(error)
  }
  if(result) {
    select("#result").html(result[0].label)
    select("#confidence").html(`${result[0].confidence.toFixed(2) * 100}%`)
    classify()
  }
}