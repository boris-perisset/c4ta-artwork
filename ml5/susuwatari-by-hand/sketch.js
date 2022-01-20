//////////////// G L O B A L ///////////////////////////////////////////
// FH_HASH p5 template | @visiophone_lab
// www.visiophone-lab.com
let handpose;
let video;
let predictions = [];
let seed = 0; //seed Hash
let elements = []
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

let a = 0
let b = 0
let w = 0
let h = 0
let vw = 0
let points = 180
let centerX = 0
let centerY = 0

let ground = 36000
let colorBG
let dotAmount = 30
let scratches = 0;

let backgroundCanvas

let susuAmount = 30
let susu = []
let openEye = 0
let openEyeRadius = 50
let openEyeSpeedX = 0
let openEyeSpeedY = 0

let bounceRight = 0
let bounceUp = 0
let bounceDifference = 0


//////////////// S E T U P ///////////////////////////////////////////

function setup() {
  
  w = windowWidth * 0.8
  h = windowHeight * 0.8

  // try responsive sizing
  vw = w/1800

  const cnv = createCanvas(w, h)
  cnv.parent('pi5-canvas')
  
  video = createCapture(VIDEO);
  video.size(w, h);
  handpose = ml5.handpose(video, modelReady);

    // This sets up an event that fills the global variable "predictions"
  // with an array every time new hand poses are detected
  handpose.on("predict", results => {
    predictions = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
  // The Background Layer
  bgCanvas = createGraphics(w, h)
  
  // FXHASH seed random
  seed = int(fxrand() * 100000000); 
  randomSeed(seed); 
  noiseSeed(seed);

  //////////////// AFTER FX SETUP ///////////////////////////////////////////


    //////////////// BACKGROUND as IMAGE Afterwards in Draw ///////////////////////////////////////////
   
    // random Background Color Set
    let colorSet = random(palettes)
    let colorVar = int(random(0, colorSet.colors.length))
    let colorVar2 = int(random(0, colorSet.lines.length))

    let colorBody = colorSet.colors[colorVar2]

    // change Body Background Color
    document.getElementById("bg-body").style.background = colorBody
    let paletteName = colorSet.name
    // defining the background colors
    colorBG = colorSet.colors[colorVar]
    bgCanvas.background(colorBG)
    bgCanvas.noStroke()

    // adding some background noise
    for (let i = 0; i < ground; i++) {
      bgCanvas.fill(colorSet.colors[int(random(0, colorSet.colors.length))])
      bgCanvas.circle(random(0,w),random(0,h), random(vw*1, vw*10))
    }
    // // adding grain
    scratches = random(0, TAU)

    push()
    bgCanvas.rotate(scratches + a)
    for (let i = 0; i < ground * 0.1; i++) {
      bgCanvas.noStroke()
      bgCanvas.blendMode(OVERLAY)
      bgCanvas.fill(255)
      let scratchSize = random((vw * 1),(vw * 6))
      bgCanvas.rect(random(-w * 1.5, w * 1.5),random(-h * 1.5, h * 1.5) + a, scratchSize, random(vw * 1, w / 4))

      if (i % 64 == 0){
        bgCanvas.circle(random(-w, w),random(-h, h), scratchSize*50) 
      }
    }
    pop()


    //////////////// SUSUWATARI ///////////////////////////////////////////

    // Set a random amount of susuwatari
    susuAmount = int(random(20,100))
    // building up each suswatari   
    for (i = 0; i < susuAmount; i++) {
      let size = vw * (random(35,120))
      let centerX = random(-w/2,w/2)
      let centerY = random(-h/2,h/2)
      susu[i] = new Susuwatari(size, centerX, centerY, i)
    }

    // A Random Vector floating around
    let eyeX = random(-w/2,w/2)
    let eyeY = random(-h/2,h/2)
    openEye = createVector(eyeX, eyeY)
    
////////////////// FX Features should be at the end of the setup////////////////
  window.$fxhashFeatures = {
 "Color Palette": paletteName,
 "Susuwataris": susuAmount,
  };
}

//////////////// D R A W ///////////////////////////////////////////
function draw() {



  centerX = w/2
  centerY = h/2
  translate(centerX, centerY)
  
  background(colorBG)

  image(bgCanvas, -w/2, -h/2)
  image(video, 0, 0, w, h);
    // We can call both functions to draw all keypoints and the skeletons
    drawKeypoints();
  
  for (let i = 0; i < susu.length; i++) {
    susu[i].move()
    susu[i].display()
    susu[i].mouseFear(map(mouseX, 0, w, -w/2, w/2), map(mouseY, 0, h, -h/2, h/2))
    susu[i].eyeBlinking()

    for (let j = 0; j < susu.length; j++) {
      if (i != j && susu[i].intersects(susu[j])) {
        susu[i].bounces()
        susu[j].bounces()
      }
    }
  }
}

function windowResized() {
  resizeCanvas(w, h);
}

function keyTyped() {
  if (key === 's') {
    saveCanvas('susuwatari-wandering-soot', 'jpg');
  }

}


function modelReady() {
  console.log("Model ready!");
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