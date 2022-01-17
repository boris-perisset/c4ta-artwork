let mobileNet
let classifier

let video

let classes = ["Happy", "Surprised", "Neutral", "Angry", "Sad"]
let buttons = ["buttonHappy", "buttonSurprised", "buttonNeural", "buttonAngry", "buttonSad"]
let removeButtons = ["removeHappy", "removeSurprised", "removeNeural", "removeAngry", "removeSad"]


let w = 400
let h = 400

let faceapi
let detections = []



/////////////////////////// SETUP ///////////////////////
function setup() {
  w = 800
  h = 600

  const cnv = createCanvas(w, h)
  cnv.parent('pi5-canvas')

  video = createCapture(VIDEO)
  video.size(w, h)
  video.hide()

  const options = {numLabels: 5}

  mobileNet = ml5.featureExtractor("MobileNet", modelReady)
  classifier = mobileNet.classification(video, options )

  const detectionOptions = {
    withLandmarks: true,
    withDescriptors: false,
  };
  // Initialize the magicFeature
  faceapi = ml5.faceApi(video, detectionOptions, modelLoaded);

  initializeButtons()
  removeImageButton()
}





/////////////////////////// DRAW ///////////////////////
function draw() {
  // translate(w/2, h/2)
  image(video, 0, 0)

  if(detections.length >= 1) {
    drawBox(detections)
    hideFace()
  }

  
}
/////////////////////////// AFTER DRAW ///////////////////////

function modelReady(){
  // console.log("model loaded")
  select("#status").html("Model Loaded")
}


// When the model is loaded
function modelLoaded() {
  select("#status").html('FaceApi Model Loaded!');
  
  // Make some sparkles
  faceapi.detect(detectFaces);
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

  noface = select("#NoFace")
  noface.mousePressed(hideFace)

  saveModel = select("#saveModel")
  saveModel.mousePressed(function() {
    classifier.save()
  })

  loadModel = select("#loadModel")
  loadModel.mousePressed(function(){
    select("#status").html("Loaded custom model")
  })

  loadModel.changed(function(){
    classifier.load(loadModel.elt.files)
  })

}

function removeImageButton() {
  
  for (let i = 0; i < classes.length; i++) {
    let className = classes[i].toString()
    removeButtons[i] = select("#" + className + "ImagesRemove")
    removeButtons[i].mousePressed(function() {
      // classifier.addImage(className)
      let span = document.getElementById(className + "Images")
      let numImages = parseInt(span.innerHTML)
      
      if(numImages > 0) {
        numImages--
      }

      span.innerHTML = numImages
    })    
  }
}

function hideFace() {
  if (!mouseIsPressed){
  drawLandmarks(detections)
  }
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

function detectFaces(error, result) {
  if(error) {
    console.log(error)
  }
  detections = result
  faceapi.detect(detectFaces) 
}

function drawBox(detections) {
  noFill()
  strokeWeight(4)
  stroke(127, 255, 212)

  for(let i= 0; i < detections.length; i++) {
    let faceBox = detections[i].alignedRect
    let x = faceBox._box._x
    let y = faceBox._box._y
    let boxW = faceBox._box._width
    let boxH = faceBox._box._height
    

    rect(x, y, boxW, boxH)
  }
}


function drawLandmarks(detections) {
  noFill();
  stroke(127, 255, 212);
  strokeWeight(4);

  for (let i = 0; i < detections.length; i += 1) {
    const mouth = detections[i].parts.mouth;
    const nose = detections[i].parts.nose;
    const leftEye = detections[i].parts.leftEye;
    const rightEye = detections[i].parts.rightEye;
    const rightEyeBrow = detections[i].parts.rightEyeBrow;
    const leftEyeBrow = detections[i].parts.leftEyeBrow;

    drawPart(mouth, true);
    drawPart(nose, false);
    drawPart(leftEye, true);
    drawPart(leftEyeBrow, false);
    drawPart(rightEye, true);
    drawPart(rightEyeBrow, false);
  }
}

function drawPart(feature, closed) {
  beginShape();
  for (let i = 0; i < feature.length; i += 1) {
    const x = feature[i]._x;
    const y = feature[i]._y;
    vertex(x, y);
  }

  if (closed === true) {
    endShape(CLOSE);
  } else {
    endShape();
  }
}