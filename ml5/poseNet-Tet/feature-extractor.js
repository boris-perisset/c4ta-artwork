// Extract the already learned features from MobileNet
const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded);

// When the model is loaded
function modelLoaded() {
  console.log('Model Loaded!');
}

// Create a new classifier using those features and with a video element
const classifier = featureExtractor.classification(video, videoReady);

// Triggers when the video is ready
function videoReady() {
  console.log('The video is ready!');
}

// Add a new image with a label
classifier.addImage(document.getElementById('dogA'), 'dog');

// Retrain the network
classifier.train((lossValue) => {
  console.log('Loss is', lossValue);
});

// Get a prediction for that image
classifier.classify(document.getElementById('dogB'), (err, result) => {
  console.log(result); // Should output 'dog'
});