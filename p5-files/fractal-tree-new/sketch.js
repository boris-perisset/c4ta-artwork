/*
=====================     G L O B A L      ========================================
*/

class Tree {
  constructor(len, x, y ) {
    this.a = 0;
    this.increment = TWO_PI / 360;
    this.factor = sin(this.a);
    this.angle = 1 * this.factor;
    this.branchEnd = 10;
    this.length = len;
    this.startX = x;
    this.startY = y;
  }

  grow() {
    function branch() {
      line(this.startX, this.startY, this.startX, this.length);
      translate(this.startX, -this.length);
      if (this.length > this.branchEnd) {
        push();
        rotate(this.angle)
        branch(this.length);
        pop();
        push();
        rotate(-this.angle)
        branch(this.length);
        pop();
      }
    }
  }
}

let width = 600;
let height = 600;

let TreeBlossom = []

/*
=====================     S E T U P      ========================================
*/

function setup() {
  var canvas = createCanvas(width, height);
  canvas.parent('pi5-canvas');
  
  for (let i = 0; i < 20; i +=1) {
    let x = random (0,width-length)
    let y = random(0,height/2)
    let len = random(20,90)
    TreeBlossom.push(new Tree(len, x, y ))
  }
  // Tree.angle = angleSlider.value();
  // Tree.forkMax = forkSlider.value();
}



  /*
  =====================     D R A W      ========================================
  */

function draw () {
  Tree.a = Tree.a + Tree.increment;
  background (50);
  stroke (255);
  translate(200,height);
  for (let i = 0; i < TreeBlossom.length; i += 1) {
    rotate(2);
    TreeBlossom[i].grow();
  }
}
