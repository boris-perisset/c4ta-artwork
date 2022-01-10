
let classifier;
let video;

let modelURL = "./model-new/model.json";
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
    flow = sin(a) * size
    dynamic = 10
    degree = TAU / dots


    textSize(30)
    textAlign(CENTER, CENTER)
    fill(255)

    classifyVideo();
  

    // for (let i = 0; i < dots; i++)  {
    //     //building the circle wih data points and some randomness
    //     let x = sin(i * degree) * radius
    //     let y = cos(i * degree) * radius

    //     ring.push({x: x, y: y})
    // }
// console.log(ring)
    
}
//////////////////////// DRAW //////////////////////////////

function draw() {
    w = windowWidth
    h = windowHeight
    translate (w/2, h/2)
    background(0)
    fill(255)


    for (let i = 0; i < dots; i++)  {

        let x = sin(i * degree) * radius
        let y = cos(i * degree) * radius

        ifModelWorks()
        push()
        translate (x * (i/dynamic), y * (i/dynamic))
        circle(0, 0, 5 + (i/semiDynamic) * flow)
        pop()
    }

    // Display the Video to see what you do
    // image(video, 0, 0, 960, 540);
    textAlign(LEFT, CENTER)
    text("show some Finger Poses to the camera", -(w/2)+100, -(h/2)+70)
    text(label, -(w/2)+100, -(h/2)+100)
    text(confidence, -(w/2)+100, -(h/2)+130)

    }
//////////////////////// MORE FUNCTIONS //////////////////////////////

    function ifModelWorks(){

        if (label == "Eins"){
            fill(colorEins)

            eins();
            text(label, -(w/2)+100, -(h/2)+100)
            text(confidence, -(w/2)+100, -(h/2)+130)
    
        } else if (label == "Peace"){
            fill(colorZwei)

            zwei();
            text(label, -(w/2)+100, -(h/2)+100)
            text(confidence, -(w/2)+100, -(h/2)+130)
    
        } else if (label == "FuckYou"){
            fill(colorDrei)

            drei();
            text(label, -(w/2)+100, -(h/2)+100)
            text(confidence, -(w/2)+100, -(h/2)+130)
    
        } else if (label == "HighFive"){
            fill(colorVier)

            vier();
            text(label, -(w/2)+100, -(h/2)+100)
            text(confidence, -(w/2)+100, -(h/2)+130)
    
        } else if (label == "Rock"){
            fill(colorFuenf)

            fuenf();
            text(label, -(w/2)+100, -(h/2)+100)
            text(confidence, -(w/2)+100, -(h/2)+130)
    
        } else if (label == "Leer"){
            leer();
            text("Your Fingers could do «Peace, Rock, FuckYou or ThumbUp", -(w/2)+100, -(h/2)+100)
        
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

    // Eins
    function eins() {
        flow = sin(a) * 20
        // dynamic is Offset Position of each point
        dynamic = 15
        
        // // a is the number in sin()
        a += a + inc
        // //increment is the value it excellerates
        inc = TAU / 360

        // size++
        // dynamic++

    }
   
    //Peace
    function zwei(){
        //flow Sinus Size of Circle
        flow = sin(a) * 20
        // dynamic is Offset Position of each point
        dynamic = 5
        // // a is the number in sin()
        a += a + inc
        // //increment is the value it excellerates
        inc = TAU / 200

    
    }

    // FuckYou
    function drei(){
        //flow Sinus Size of Circle
        flow = sin(a) * 60
        // dynamic is Offset Position of each point
        dynamic = 25
        // // a is the number in sin()
        a += a + inc
        // //increment is the value it excellerates
        inc = TAU / 360



    }

    // High Five
    function vier() {
        // dots++
        //flow Sinus Size of Circle
        flow = sin(a) * 15
        // dynamic is Offset Position of each point
        dynamic = 30
        // // a is the number in sin()
        a += a + inc
        // //increment is the value it excellerates
        inc = TAU / 100


    }

    // Rock
    function fuenf() {
        // dots--
        //flow Sinus Size of Circle
        flow = sin(a) * 70
        // dynamic is Offset Position of each point
        dynamic = 60
        // // a is the number in sin()
        a += a + inc
        // //increment is the value it excellerates
        inc = TAU / 600

    }

    //Leer
    function leer() {
    a = 0.1
    size = 10
    inc = TAU / 25
    flow = sin(a) * size
    dynamic = 10
    fill(255)
    }
