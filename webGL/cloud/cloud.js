class Cloud {
    constructor(x, y, z){
      this.size = random(4,30)
      this.a = 0.001
      this.inc = PI/80
      this.pos = new p5.Vector(x, y, z)
      this.determination = random([0.05, -0.1])
    }
  
    showCloud() {
      push()
      noStroke()
      translate(this.pos.x, this.pos.y, this.pos.z)
      shininess(20)
      specularMaterial(color1)
      sphere(this.size)
      pop()
    }

    deforming() {
      let wave = 0.5
      this.size = this.size + this.determination
      this.a = this.a + this.inc

      this.pos.x = this.pos.x + random(-wave,wave) 
      this.pos.y = this.pos.y + random(-wave,-wave * (random(1,3)))
      this.pos.z = this.pos.z + random(-wave,wave)

      if (this.pos.y <= -h) {
        this.pos.y = h
      }

    }

  }

  