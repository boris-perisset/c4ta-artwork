class Particle {
    constructor(x, y, z){
      this.size = random(4,20)
      this.vec = new p5.Vector(x, y, z)
      this.speedX = random(-1,1) * 1.2
      this.speedY = random(-1,1) * 1.2
      this.speedZ = random(-1,1) * 1.2
      this.a = random(1,2)
      this.speedRot = random(0.1, 0.001)
      this.inc = random(PI/360, PI/700)
    }
  
    showDot() {
      push()
      // specularColor(255)
      pointLight(mainColor,(mouseX-(windowWidth/2)), -(mouseY-(windowHeight/2)),this.vec.z)

      translate(this.vec.x, this.vec.y, this.vec.z)
      // normalMaterial()
      // emissiveMaterial(125, 0, 0)
      
      specularMaterial(mainColor);
      shininess(20)
      // ambientMaterial(mainColor)
      noStroke()
      rotateX(frameCount * this.speedRot)
      rotateZ(frameCount * this.speedRot * 0.7)
      push()
      rotateZ(frameCount * 0.01)
      ambientMaterial(mainLight)
      torus(this.size, this.size/20)
      pop()
      push()
      rotateY(HALF_PI)
      rotateX(frameCount * 0.01)
      ambientMaterial(mainLight)
      torus(this.size*1.4, this.size/20)
      pop()
      sphere(10 + this.size/2 * sin(this.a))
      pop()
      this.a = this.a + this.inc
    }

    showFlare() {
      let spotColor = mainLight
      let spotPosition = this.vec
      let spotDirection = this.vec
      // spotLight(spotColor, spotPosition, spotDirection)
      // pointLight(255, 255, 0, this.vec.x, this.vec.y, this.vec.z, this.vec.x+100, this.vec.y+100, this.vec.z+100, TAU, 5000)

      push()
      // lightFalloff(1, 0, 0);
      translate(this.vec.x, this.vec.y, this.vec.z)
      // pointLight(255, 255, 0, 0, 0, 0)
      emissiveMaterial(mainLight)

      // ambientMaterial(mainColor)
      noStroke()
      cone(this.size * sin(a))
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
      if (this.vec.z <= -500) this.speedZ *= -1
      if (this.vec.z > 500) this.speedZ *= -1    }
  
    //Mouse repels particles
    //Also makes sure they don't leave the canvas
    repel() {
      this.vec.x = constrain(this.vec.x, -w/2, w/2);
      this.vec.y = constrain(this.vec.y, -h/2, h/2);
      this.vec.z = constrain(this.vec.z, -500, 500);

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