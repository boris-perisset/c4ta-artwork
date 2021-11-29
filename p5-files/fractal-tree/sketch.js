/*
=====================     G L O B A L      ========================================
*/
let a = 0;
let  factor;

let angle = 45 * factor;
let minBranchSize;
let width = 600;
let height = 600;
let lenBranch;

let angleSlider;
let forkSlider;
let lenSlider;

function branch(len) {
  line(0, 0, 0, -len);
  translate(0, -len);
  if (len > minBranchSize) {
    push();
    rotate(angle)
    branch(len * lenBranch);
    pop();
    push();
    rotate(-angle)
    branch(len * lenBranch);
    pop();
  }
}

/*
=====================     S E T U P      ========================================
*/

function setup() {
  var canvas = createCanvas(width, height);
  canvas.parent('fractal-tree');

  //createSliderSyntax = (min, max, [DefaulValue(optional)], [step])
  createP("Mindest Ast Grösse")
  forkSlider = createSlider(2, 20, 3, 0.01)
  createP("Astlänge")
  lenSlider = createSlider(0.1, 0.7, 0.2, 0.01)
}
  /*
  =====================     D R A W      ========================================
  */

function draw () {
  let increment = TWO_PI / 360;
  let initial = map(factor, -1, 1, height*0.1, height*0.4)
  factor = sin(a);
  a = a + increment;
  angle = 1 * factor;
  
  minBranchSize = forkSlider.value();
  lenBranch = lenSlider.value();
  background (51);
  stroke (255);
  translate(width/2,height);
  branch(initial);
}
