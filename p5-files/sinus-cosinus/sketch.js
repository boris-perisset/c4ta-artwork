let a;

const diameter = 300;
const radius = diameter/2;

let off = 50;
let spc = 15;


let prevx1 = 0;
let prevx2 = 0;
let prevrad = 0;


/*
  =====================     S E T U P      ========================================
  */

function setup() {
 
  w = min(windowWidth, windowHeight)
  var canvas = createCanvas(w, w);
  canvas.parent('pi5-canvas');

  strokeWeight(4);

}
  /*
  =====================     D R A W      ========================================
  */

function draw () {
background(255,0,0,80);
//translate (width/2, height/2);

t = frameCount/50;

for(x = off; x<w-off; x+=spc){
  let modifier = x*5
  let offsetAmount = 60;

  let x1 = x + offsetAmount * sin(modifier + t);
  let x2 = x - offsetAmount * sin(modifier + t);

  let d = dist(x1,x2,w/2,w/2)
  let dmap = map(d, 0, w/2+off/2, 1, 0)
  strokeWeight(dmap*30)

  x1 = x + offsetAmount * sin(modifier + t) * dmap;
  x2 = x - offsetAmount * sin(modifier + t) * dmap;

  point(x1, x2);

  let rad = 40*dmap;
  let div = TAU / 3;

  strokeWeight(10*dmap)
  angleOffset = noise(x1*0.01)*TAU

  for(a = t; a<TAU + t; a += div){
    let px = x1 + rad*cos(a);
    let py = x2 + rad*sin(a);

    point(px,py)

    let prevx = x1 + rad*cos(a + div);
    let prevy = x2 + rad*sin(a + div);

    strokeWeight(1)
    line(px,py,prevx,prevy)

    connectx = prevx1 + prevrad * cos(a);
    connecty = prevx2 + prevrad * sin(a);

    if(x != off){
      line(px,py,connectx, connecty)
    }
  }

  prevx1 = x1;
  prevx2 = x2;
  prevrad = rad;
}

}