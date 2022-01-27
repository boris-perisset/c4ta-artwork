class Particle {
    constructor(x, y, z){
      this.size = 20
      this.vec = new p5.Vector(x, y, z)
      this.speedX = random(-1,1) * 2.2
      this.speedY = random(-1,1) * 2.2
      this.speedZ = random(-1,1) * 2.2
    }
  
    showDot() {
      push()
      translate(this.vec.x, this.vec.y, this.vec.z)
      // normalMaterial()
      ambientMaterial(255)
      noStroke()
      sphere(this.size)
      pop()
    }
  
    updatePos(){
      this.vec.x += this.speedX + random(-0.2,0.2)
      this.vec.y += this.speedY + random(-0.2,0.2)
      this.vec.z += this.speedZ + random(-0.2,0.2)
  
      if (this.vec.x <= -w/2) this.speedX *= -1
      if (this.vec.x > w/2) this.speedX *= -1
      if (this.vec.y <= -h/2) this.speedY *= -1
      if (this.vec.y > h/2) this.speedY *= -1
      if (this.vec.z <= -50) this.speedZ *= -1
      if (this.vec.z > 50) this.speedZ *= -1
    }
  
      //Mouse repels particles
    //Also makes sure they don't leave the canvas
    repel() {
      this.vec.x = constrain(this.vec.x, 0, w);
      this.vec.y = constrain(this.vec.y, 0, h);
      let distance = dist(this.vec.x, this.vec.y, mouseX, mouseY);
  
      let mouse = createVector(mouseX, mouseY);
      let difference = p5.Vector.sub(mouse, this.vec);
      difference.setMag(8);
      //If the mouse comes near a particle, it moves away
      if (distance < lineMaxDist) {
        this.vec.sub(difference);
      }
    }
  }