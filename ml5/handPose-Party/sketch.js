let handpose;
let video;
let predictions = [];
let w = 400
let h = 400

let cells = 30
let cellSize = 10
let elements = []
let xPos
let yPos

let hand = {
  thumb: {x: 0, y: 0},
  indexFinger: {x: 0, y: 0},
  middleFinger: {x: 0, y: 0},
  ringFinger: {x: 0, y: 0},
  pinky: {x: 0, y: 0},
  palmBase: {x: 0, y: 0}
}
// HAND ANNOTATIONS
// export const MESH_ANNOTATIONS: {[key: string]: number[]} = {
//   thumb: [1, 2, 3, 4],
//   indexFinger: [5, 6, 7, 8],
//   middleFinger: [9, 10, 11, 12],
//   ringFinger: [13, 14, 15, 16],
//   pinky: [17, 18, 19, 20],
//   palmBase: [0]
// };

let dimmer = 255
let spin = 0

/////////////////////////// SETUP ///////////////////////
function setup() {
  w = windowWidth
  h = windowHeight

  createCanvas(w, h);


  //Canvas Settings
  background(dimmer, 0, 0)

  cellSize = w / cells

  // for (let i = 0; i < cells; i++) {
  //   for (let j = 0; j < cells; j++) {


  //     let posX = i + cellSize
  //     let posY = j + cellSize
     
  //     elements.position = {x:posX, y:posY, size:cellSize}
  //   }
  // }


  video = createCapture(VIDEO);
  video.size(w, h);

  fill(0,255-dimmer,dimmer)
  for (let i = 0; i < 100; i++) {
    xPos = random(0, w)
    yPos = random(0, h)
    elements.push({x:xPos, y:yPos})
  }

  handpose = ml5.handpose(video, modelReady);

  // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", results => {
    predictions = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();

  noStroke();

}

function modelReady() {
  console.log("Model ready!");
}


/////////////////////////// DRAW ///////////////////////
function draw() {
  w = windowWidth
  h = windowHeight
  // translate (w / 2, h / 2)

  // blendMode(MULTIPLY)
  rectMode(CENTER)
  background(dimmer, 0, 0)
  // tint(255, 0, 0)
  // image(video, 0, 0, w, h);
  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();



  // console.log(elements)

  let d1 = dist(hand.thumb.x, hand.thumb.y, hand.indexFinger.x, hand.indexFinger.y)
  dimmer = d1

  let d2 = dist(hand.thumb.x, hand.thumb.y, hand.pinky.x, hand.pinky.y)
  cellSize = d2 / 2

  let d3 = dist(hand.indexFinger.x, hand.indexFinger.y, hand.middleFinger.x, hand.middleFinger.y)
  spin = d3 * 30

  spin = TAU / d3

  for (let i = 0; i < elements.length; i++) {
    fill(0,255-dimmer,dimmer)

    circle(elements[i].x, elements[i].y, cellSize)

    let newPosX = elements[i].x + (random(-2/2))
    let newPosY = elements[i].y + (random(-2/2))
    // elements[i].push({x:newPosX, y:newPosY})
  }



  fill(dimmer,dimmer,0)
  push()
  translate (w/2, h/2)
  rotate(spin*2)
  rect(100,100,cellSize * 2)
  pop()

  // rotate(spin)
  // circle(d3/2,d3/2,cellSize * 1.4)

  // handpose.on('predict', callback);

  // handpose.predict(inputMedia, results => {
  //   // do something with the results
  // });
}


// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      // const keypoint = prediction.landmarks[j];
      // fill(255, j*10, i*10);
      // circle(keypoint[0], keypoint[1], 20, 20);

      //thumb outer point
      let thumbX = prediction.annotations.thumb[3][1]
      let thumbY = prediction.annotations.thumb[3][2]
      hand.thumb = {x:thumbX, y:thumbY}
     
      //indexFinger outer point
      let indexFingerX = prediction.annotations.indexFinger[3][1]
      let indexFingerY = prediction.annotations.indexFinger[3][2]
      hand.indexFinger = {x:indexFingerX, y:indexFingerY}

      //middleFinger outer point
      let middleFingerX = prediction.annotations.middleFinger[3][1]
      let middleFingerY = prediction.annotations.middleFinger[3][2]
      hand.middleFinger = {x:middleFingerX, y:middleFingerY}

      //ringFinger outer point
      let ringFingerX = prediction.annotations.ringFinger[3][1]
      let ringFingerY = prediction.annotations.ringFinger[3][2]
      hand.ringFinger = {x:ringFingerX, y:ringFingerY}

      //pinky outer point
      let pinkyX = prediction.annotations.pinky[3][1]
      let pinkyY = prediction.annotations.pinky[3][2]
      hand.pinky = {x:pinkyX, y:pinkyY}

      // palmBase center point
      let palmBaseX = prediction.annotations.palmBase[0][1]
      let palmBaseY = prediction.annotations.palmBase[0][2]
      hand.palmBase = {x:palmBaseX, y:palmBaseY}

    }
  }
}