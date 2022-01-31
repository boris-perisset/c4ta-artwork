let w = 0
let h = 0
let a = 0
let inc = 0
let amount = 5
let vec = 0
let bubble = []
let size = 40


let colorSet = [
  "#49cbd1", 
  "#69c2d2", 
  "#80b8d3", 
  "#93aed3", 
  "#a2a4d4", 
  "#b099d5", 
  "#bd8ed5", 
  "#c981d6", 
  "#d373d6", 
  "#dd63d7"
]

let color1 = 0
let LightPos = 0

let debug = true


let myFont;
function preload() {
  myFont = loadFont('assets/Inconsolata-Bold.ttf');
}


/*
=====================     S E T U P      ========================================
*/

function setup() {
  w = windowWidth
  h = windowHeight
  var canvas = createCanvas(w, h, WEBGL);
  canvas.parent('pi5-canvas');

  a = 0
  inc = PI / 360

  textFont(myFont)
  textSize(24)
  textAlign(CENTER)

  // debugMode()

  color1 = random(colorSet)

  for (let x = 0; x < amount; x++) {
    for (let y = 0; y < amount; y++) {
      for (let z = 0; z < amount; z++) {
        push()
        let posX = x + size * random(-2,4)
        let posY = y + size * random(-2,4)
        let posZ = z + size * random(-2,4)
        bubble.push(new Cloud(posX, posY, posZ))
        pop()
      }
    }
  }
 
// console.log(bubble)

}
  /*
  =====================     D R A W      ========================================
  */

function draw () {
  //camera(X, Y, Z, centerX, centerY, centerZ, 0, 1, 0)
  camera(0, -100 * sin(a), 500, 0, 0, 0, 0, 1, 0)
  // orbitControl()
  background(color1)

  lightFalloff(0.01, 0, 0)
  ambientLight(255, 255, 255)


  //map(value, start1, stop1, start2, stop2, [withinBounds])
  let m1 = map(mouseX-w/2, -w/2, w/2, -400, 400)
  let m2 = map(mouseY-h/2, -h/2, h/2, -200, -400)


  pointLight(255, 255, 255, m1, m2, 500)


  rotateY(frameCount * 0.00005)

  for(let i = 0; i < bubble.length; i++) {
    bubble[i].showCloud()
    bubble[i].deforming()


    if (bubble[i].size <= 0) {
      bubble.splice(i, 1)
      // console.log("Ciao", bubble.length)
      }
  }
  // console.log(bubble[0].size)
  if (mouseIsPressed) {
    let spreader = random(1,10)
    let factor = random(2,10)

  for(let i = 0; i < spreader; i++) {
    
    let posX = (mouseX - w/2) + random(-spreader * factor,spreader * factor)
    let posY = (mouseY - h/2) + random(-spreader * factor,spreader * factor)
    let posZ = random(-spreader * factor,spreader * factor)
    newbubble = new Cloud(posX, posY, posZ)
    bubble.push(newbubble)
  }
  }
  
  if(bubble.length == 0) {
    fill(255)
    text ("press the mouse to create some smoke",0,0)
  }


  a = a + inc

}



function windowResized() {
  resizeCanvas(w, h);
}


function keyTyped() {
  if (key === 's') {
    saveCanvas('clouds', 'jpg');
  }

}

// function mousePressed() {
//   let spreader = random(5,30)
//   for(let i = 0; i < spreader; i++) {
    
//     let posX = (mouseX - w/2) + random(-spreader*2,spreader*2)
//     let posY = (mouseY - h/2) + random(-spreader*2,spreader*2)
//     let posZ = random(-spreader*2,spreader*2)
//     newbubble = new Cloud(posX, posY, posZ)
//     bubble.push(newbubble)
//   }
// }