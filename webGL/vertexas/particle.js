class Particle {
    constructor(x, y, z){
      this.size = 20
      this.vec = new p5.Vector(x, y, z)
      this.speedX = random(-1,1) * 1.2
      this.speedY = random(-1,1) * 1.2
      this.speedZ = random(-1,1) * 1.2
      this.color = random(color)
    }
  
    showDot() {
      push()
      // lightFalloff(1, 0, 0);
      ambientLight(0);

      translate(this.vec.x, this.vec.y, this.vec.z)
      // normalMaterial()
      // emissiveMaterial(125, 0, 0)
      noStroke()
      // emissiveMaterial(this.color)
      ambientMaterial(this.color)
      sphere(2)
  
      pop()
    }
  
    connect() {
      particles.forEach(particle => {
        let distance = dist(this.vec.x, this.vec.y, this.vec.z, particle.vec.x, particle.vec.y, particle.vec.z);
        if (distance < lineMaxDist) {
          // stroke(color(0, 255, 0, map(distance, 0, lineMaxDist, 255, 0)));
          push()
          // specularMaterial(255)
          // shininess(50)
          stroke(this.color)
          strokeWeight(map(distance, 0, lineMaxDist, 2, 0));
          line(this.vec.x, this.vec.y, this.vec.z, particle.vec.x, particle.vec.y, particle.vec.z);
          pop()

          if (distance <= 50 && distance > 0) {
            push()
            noStroke()
            translate(this.vec.x, this.vec.y, this.vec.z)
            // blendMode(OVERLAY)
            ambientLight(this.color);
            ambientMaterial(this.color)
            sphere(distance/2)
            pop()
          }
        }
      })
    }
  

    updatePos(){
      this.vec.x += this.speedX + random(-0.2,0.2)
      this.vec.y += this.speedY + random(-0.2,0.2)
      this.vec.z += this.speedZ + random(-0.2,0.2)
  
      if (this.vec.x <= -w/2) this.speedX *= -1
      if (this.vec.x > w/2) this.speedX *= -1
      if (this.vec.y <= -h/2) this.speedY *= -1
      if (this.vec.y > h/2) this.speedY *= -1
      if (this.vec.z <= -500) this.speedZ *= -1
      if (this.vec.z > 500) this.speedZ *= -1
    }
  
    //Mouse repels particles
    //Also makes sure they don't leave the canvas
    repel() {
      this.vec.x = constrain(this.vec.x, -w/2, w/2);
      this.vec.y = constrain(this.vec.y, -h/2, h/2);
      this.vec.z = constrain(this.vec.z, -500, 500);

      let distance = dist(this.vec.x, this.vec.y, this.vec.z, mouseX, mouseY, 0);
  
      let mouse = createVector(mouseX, mouseY);
      let difference = p5.Vector.sub(mouse, this.vec);
      difference.setMag(8);
      //If the mouse comes near a particle, it moves away
      if (distance < lineMaxDist) {
        this.vec.sub(difference);
      }
    }
  }