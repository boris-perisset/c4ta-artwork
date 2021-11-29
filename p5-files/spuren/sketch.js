let shapes = []
let numbObjects = 100
let traceLength = 10

let radius = 10;
let hue1 = 225;
let hue2 = 125;
let hueBG = 200;
let opacity = 20;

function setup() {
  createCanvas(windowWidth, windowHeight)
  colorMode(HSB);
  ellipseMode(RADIUS);
  background(hueBG,50,50)
  
  // numbObject Objekte in den Array «pushen».
  for (let i=0; i<numbObjects; i+=1){
  let traceObject = {
  x: random() * windowWidth,
  y: random() * windowHeight,
  changeX: random(-1,1),
  changeY: random(-1,1),
  trace: []
}

  shapes.push(traceObject)
  }
  // Dies könntest du auch mit einem Loop machen.
  }
  //saveCanvas('myCanvas', 'png');

function draw() {
 
  noStroke();
  background(hueBG,50,50)
  // Loop durch den Array
  for (let i = 0; i < shapes.length; i += 1) {
    
    // Variable mit einzelnem Element aus dem Array 
    let currentPos = shapes[i];

    if (i%2 ==0) {
    // Zeichne den trace Array mit Positionsdaten 
    for (let t = 0; t < currentPos.trace.length; t += 1) {
      fill (hue2, 50, 50, opacity);
      ellipse(currentPos.trace[t].x, currentPos.trace[t].y, radius);
    }
    // Einen Kreis zeichnen darüber

    fill (hue1, 50, 50);
    ellipse(currentPos.x, currentPos.y, radius);

    //Letzte Positionen in Spur speichern
    currentPos.trace.push({x: currentPos.x, y: currentPos.y})

    // jede Zweite Form sieht anders aus (Modulo)
    if (currentPos.trace.length>traceLength){
    currentPos.trace.shift()
      }
    } else {
      for (let t = 0; t < currentPos.trace.length; t += 1) {
        fill (hue2, 50, 50, opacity);
        rect(currentPos.trace[t].x, currentPos.trace[t].y, radius*2);
      }
      // Einen Kreis zeichnen darüber
  
      fill (hue1, 50, 50);
      rect(currentPos.x, currentPos.y, radius*2);
  
      //Letzte Positionen in Spur speichern
      currentPos.trace.push({x: currentPos.x, y: currentPos.y})
  
      if (currentPos.trace.length>traceLength){
      currentPos.trace.shift()
        }

    }
    // Werte im Objekt ändern

    if (currentPos.x > (windowWidth-radius) || currentPos.x < (0+radius)) {
      currentPos.changeX = currentPos.changeX  * -1;
    }

    if (currentPos.y > (windowHeight-radius) || currentPos.y < (0+radius)) {
      currentPos.changeY = currentPos.changeY * -1;
    }


    currentPos.x += currentPos.changeX;
    currentPos.y += currentPos.changeY;

    hue2 = (hue2 + 0.01) % 360 ;
    hue1 = (hue1 + 0.01) % 360 ;
    hueBG = (hueBG + 0.01) % 360 ;
  }

}
