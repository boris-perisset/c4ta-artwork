class Bubbles {
    constructor(x, y){
      this.size = random(4, 10)
      this.vec = new p5.Vector(x, y)
      this.speedX = random(-1,1) * 2.2
      this.speedY = random(-1,1) * 2.2
    }
  
    showDot() {
        ellipseMode(CENTER);
        stroke("#af740d")
        // push()
        noFill()
        ellipse(this.vec.x, this.vec.y, this.size, this.size/1.2)
        noStroke()
        fill("#fff9ba")
        ellipse(this.vec.x, this.vec.y+1, this.size/1.3, this.size/1.6)
        fill("#c79d29")
        ellipse(this.vec.x, this.vec.y-2, this.size/2, this.size/2.4)
        // pop()
    }
  
    //Minus Values to let the bubbles rise up to the top
    updatePos(){

        if(this.size > 7) {
        this.vec.x += this.speedX + random(-0.5,0.5)
        this.vec.y += this.speedY + random(-1,-3)
        } else {
            this.vec.x += this.speedX + random(-0.5,0.5)
            this.vec.y += this.speedY + random(-1,-10)
        }
      if (this.vec.x <= 0) this.speedX *= -1
      if (this.vec.x > w) this.speedX *= -1
      //if a bubbles reaches the top, the start again from the bottom
      if (this.vec.y <= 0) this.vec.y = h
      if (this.vec.y > h) this.speedY *= -1
    }
  }
  