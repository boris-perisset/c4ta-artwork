
let classifier;
let video;

let modelURL = "./model-objects/model.json";
let label = 0;
let confidence = 0;

let timer = 15;
let tabOpened = false;

let points = []

let ring = []
let dots = 18
let radius = 350
let dynamic = 10
let semiDynamic = dynamic / 2
let degree

let w 
let h
let a
let inc
let flow
let size
let spin = 0.001
// let x
// let y

let colorEins = "#4cd4b0"
let colorZwei = "#cf4a5f"
let colorDrei = "#ebccfb"
let colorVier = "#c8c368"
let colorFuenf = "#82a450"



function preload(){
    classifier = ml5.imageClassifier(modelURL)
    label = "Das Model lädt..."
}

//////////////////////// SETUP //////////////////////////////
function setup() 
{
    w = windowWidth
    h = windowHeight
    
	createCanvas(w,h);
    video = createCapture(VIDEO)
    video.hide();

    //Defining the Base
    a = 0.1
    size = 10
    inc = TAU / 360
    flow = 0
    dynamic = 0
    degree = TAU / dots


    textSize(28)
    textAlign(CENTER, CENTER)
    fill(255)

    classifyVideo();

// console.log(ring)
    
}
//////////////////////// DRAW //////////////////////////////

function draw() {
    w = windowWidth
    h = windowHeight
    translate (w/2, h/2)
    background(0)
    fill(255)

    push()
    rotate(spin)
    for (let i = 0; i < dots; i++)  {

        let x = sin(i * degree) * radius
        let y = cos(i * degree) * radius

        ifModelWorks(x, y, i)
    }
    pop()
    spin += spin + 0.0002

    // Display the Video to see what you do
    // image(video, 0, 0, 960, 540);
    textAlign(LEFT, CENTER)
    // text("show some Finger Poses to the camera", -(w/2)+100, -(h/2)+70)
    text(label, -(w/2)+100, -(h/2)+70)
    text(confidence, -(w/2)+100, -(h/2)+100)
    
}
//////////////////////// MORE FUNCTIONS //////////////////////////////

    function ifModelWorks(posX, posY, iteration){

        if (label == "Eins"){
            fill(colorEins)

            eins(posX, posY, iteration);

    
        } else if (label == "Peace"){
            fill(colorZwei)

            zwei(posX, posY, iteration);

    
        } else if (label == "FuckYou"){
            fill(colorDrei)

            drei(posX, posY, iteration);

    
        } else if (label == "HighFive"){
            fill(colorVier)

            vier(posX, posY, iteration);

    
        } else if (label == "Rock"){
            fill(colorFuenf)

            fuenf(posX, posY, iteration);

    
        } else if (label == "Leer"){
            leer(posX, posY, iteration);
            text("Boris has some objects he could show to the camera", -(w/2)+100, -(h/2)+130)
        
        } else {
            fill (255)
            rectMode(CENTER)
            push()
            rotate(HALF_PI/2)
            rect(-20, 20, 40, 2)
            rotate(HALF_PI)
            rect(20, 20, 40, 2)
            pop()
        }
    
    }

    function classifyVideo(){
        classifier.classify(video, gotResult)
    }

    function gotResult(error, result){

        if(error){
            console.error(error);
            return;
        }

        classifyVideo();
        label = result[0].label;
        confidence = nf(result[0].confidence * 100, 0, 0) + "%";

    }

    // Nastüechli / Eins
    function eins(posX, posY, iteration) {

        push()
        translate (posX * (iteration/dynamic), posY * (iteration/dynamic))
        circle(0, 0, 5 + (iteration * flow))
        pop()

        flow = 1.34 + (sin(a) * 0.3)
        a += a + inc
        // //increment is the value it excellerates        // size++

        // let value = dynamic
        // let start1 = 0 // current min range
        // let stop1 = 10 // target min range
        // let start2 = 1 // current max range
        // let stop2 = w/2 // target max range

        // dynamic = sin(a) * 300

        // map(value, start1, stop1, start2, stop2)

        if (frameCount % 200 == 0) {
        dynamic = 20
        } else {
        dynamic--
        }
    }
   
    //Ricola / Peace
    function zwei(posX, posY, iteration){

        push()
        translate (posX * (iteration * dynamic), posY * (iteration * dynamic))
        rect(0, 0, 10 + (iteration * flow))
        pop()

        //flow Sinus Size of Circle
        flow = 1.34 + (sin(a) * 0.3)
        dynamic = 0.1 + (sin(a) * 0.002)
        a = a + inc
        spin += spin + flow
    }

    // Veloflickzeug / FuckYou
    function drei(posX, posY, iteration){
        push()
        translate (posX * (iteration * dynamic), posY * (iteration * dynamic))
        circle(0, 0, 10 + (iteration * flow))
        pop()
        //flow Sinus Size of Circle
        flow = 1.34 + (sin(a) * 0.2)
        dynamic = 0.1 + (sin(a) * 0.2)
        a = a + inc
    }

    // High Five / High Five
    function vier(posX, posY, iteration) {
        push()
        translate (posX * (iteration * dynamic), posY * (iteration * dynamic))
        circle(0, 0, 5 + (iteration * flow))
        pop()
        //flow Sinus Size of Circle
        flow = 10.34 + (sin(a) * 0.8)
        dynamic = 0.1 + (sin(a) * 0.002)
        a = a + inc
    }

    // Schlüssel / Rock
    function fuenf(posX, posY, iteration) {
        push()
        translate (posX * (iteration * dynamic), posY * (iteration * dynamic))
        circle(0, 0, 5 + (iteration * flow))
        pop()
        // dots--
        //flow Sinus Size of Circle
        flow = 1.34 + (sin(a) * 0.7)
        dynamic = 0.1 + (sin(a) * 0.02)
        a = a + inc


    }

    //Leer
    function leer(posX, posY, iteration) {
        push()
        translate (posX, posY)
        circle(0, 0, 10 + (iteration * flow))
        pop()

    a = 0.1
    size = 10
    inc = TAU / 25
    flow = sin(a) * size
    dynamic = 10
    fill(255)
    }
