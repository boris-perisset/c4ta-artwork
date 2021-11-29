/*
  Mit Sinus angetriebene Animationen
*/
let size = 800
let a = 0 // «Winkel» zur Errechnung von Sinus/Cosinus
// let nextX = 0
// let nextY = size
let i = 1
let zikZakArray = []
let x1
let y1

class ZikZak {
  constructor() {
    this.x1 = [i]
    this.y1 = 0
    this.x2 = x1[i-1]
    this.y2 = y1[i-1]
    this.factorSin = sin(a)
    this.factorCos = cos(a)
    this.offset = i/(size/2)
    this.offsetFactor = sin(a + offset)
  }
build() {
  this.y1 = map(offsetFactor, -1, 1, minY, maxY)
  line(this.x1,this.y1,this.x2,this.y2)
}
sinCos() {
  this.x1 += factor * (size/8)
  this.y1 += factor * (size/8)
  // nextX -= 1
  // nextY -= 1
}
}

// let Cx
// let Cy
// let Kx
// let Ky

let perlin = 0.0

function setup() {
  createCanvas(size, size)
  colorMode(HSB)

  for (let i = 1; i < 10; i += 1) {
  zikZakArray.push(new ZikZak())
  }
}

function draw() {
    /* Styling */
  background(180, 50, 50)
  stroke(180, 50, 80)
  strokeWeight(1)


  /* Eine Linie schlängeln */
  let minY = 0
  let maxY = size
  for (let i = 0; i < zikZakArray.length; i+= 1) {

    zikZakArray[i].build()
    zikZakArray[i].sinCos()
    // hier möchten wir für jeden Punkt einen leicht verschobenen
    // Winkel, mit dem wir die Sinus-Funktion aufrufen können.
    // let offset = i/(size/2)
    //fill(200, 50, 50)
    noFill()
    perlin += 0.005
    // let offsetFactor = sin(a + offset)
    // let x = i
    // let y = map(offsetFactor, -1, 1, minY, maxY)
    // line(x, y, size, x)
    //circle(x,y, 10)

    // let Cx = x + factor * (size/8)// * noise(perlin)
    // let Cy = y + factor2 * (size/8)// * noise(perlin)
    // let Kx = Cx + factor2 
    // let Ky = Cy + factor



    // line(Kx,Ky, y, size)
    // //circle(Cx, Cy, 100)
    // line(x, y, Cx, Cy)
    // line(Cx, Cy, Kx, Ky)
    // line(x, y, Kx, Ky)
    // //line(Kx, Ky, x, y)
  
  }

 
  // Den «Winkel» erhöhen
  const increment = TAU/360
  a += increment
}