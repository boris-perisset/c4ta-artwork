/*
=====================     G L O B A L      ========================================
*/

let width;
let height;

let treeSwarm = []
let rotator = 180


class Tree {  
  constructor(x, y, g, b, randomRange) {
    this.a = 0;
    this.increment;
    this.factor;
    this.angle;
    this.minBranchSize = random(5, 20);
    this.startX = x;
    this.startY = y;
    this.green = g;
    this.blue = b;
    this.rangle = randomRange
  }

  grow(len) {
      stroke (0, this.green, this.blue, 80)
      line(0, 0, 0, -len);
      translate(0, -len);
      if (len > this.minBranchSize) {
        push();
        rotate(this.angle);
        this.grow(len * 0.8);
        pop();
        push();
        rotate(-this.angle);
        this.grow(len * 0.8);
        pop();
      }
    }

    angleRotation() {
      this.increment = TWO_PI / (360 * random(1,6));
      this.a = this.a + this.increment * this.rangle;
      this.factor = sin(this.a);
      this.angle =  this.factor; 
    }

    
    updatePosition(){
      
      this.startX += random(2) - 1
      this.startY += random(2) - 1
    
    }

  }




/*
=====================     S E T U P      ========================================
*/

function setup() {

  width = windowWidth;
  height = windowHeight;

  var canvas = createCanvas(width, height);
  canvas.parent('pi5-canvas');
  
  for (let i = 0; i < 10; i += 1) {
    let startX = cos(i) * 180;
    let startY = sin(i) * 180;
    let g = random(150,250);
    let b = random(150,250);
    let randomRange = random(1, i);
    let aNewInstanceOfTree = new Tree(startX, startY, g, b, randomRange)
    treeSwarm.push(aNewInstanceOfTree)
    // console.log(`startX = ${aNewInstanceOfTree.startX} startY = ${aNewInstanceOfTree.startY}`)
   }
}

  /*
  =====================     D R A W      ========================================
  */

function draw () {
  background(50);
  stroke(150, 150, 150, 80);
  translate(width/2, height/2)

  for (let i = 0; i < treeSwarm.length; i += 1) {
    treeSwarm[i].angleRotation();
    // rotate(TAU/treeSwarm.length)
    rotate(rotator)
    rotator += 0.00025

    push()
    let currentOriginX = treeSwarm[i].startX
    let currentOriginY = treeSwarm[i].startY
    translate(currentOriginX, currentOriginY);
    treeSwarm[i].grow(50);
    treeSwarm[i].updatePosition();
    


    // if (treeSwarm[i].angle <= PI/180) {
    //   treeSwarm[i].startX += 5
    //   treeSwarm[i].startY += 5
    // } else {
    //   this.startX += random(2) - 1
    //   this.startY += random(2) - 1
    // }
    pop()
  }
}
