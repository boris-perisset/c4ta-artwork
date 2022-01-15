let mobileNet
let classifier

let video

let classes = ["happy", "surprised", "neutral]
let buttons ["buttonHappy", "buttonSurprised", "buttonNeural"]

let w = 400
let h = 400


/////////////////////////// SETUP ///////////////////////
function setup() {
  w = windowWidth
  h = windowHeight

  createCanvas(w, h);

  video = createCapture(VIDEO)
  video.size(width.height)
  video.hide()

  mobileNet = ml5,featureExtractor("MobileNet", modelReady)
  classifier = mobileNet.classification(video)
  //Canvas Settings
}


/////////////////////////// DRAW ///////////////////////
function draw() {
  w = windowWidth
  h = windowHeight
 
}