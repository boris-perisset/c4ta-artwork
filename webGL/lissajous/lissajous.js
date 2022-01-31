class Lissajous {
    constructor(x, y, z){
      this.size = 20
      this.pos = new p5.Vector(x, y, z)
      this.speedX = random(-1,1) * 1.2
      this.speedY = random(-1,1) * 1.2
      this.speedZ = random(-1,1) * 1.2
      this.color = random(color)
      this.display = function showLisa() {
        push()
        noStroke()
        translate(-w/8 + this.pos.x, h/8 + this.pos.y, this.pos.z)
        ambientLight(mainColor)
        ambientMaterial(mainColor)
        sphere(this.size * cos(a))
        pop()
      }
    }
  
    showLisa() {
      push()
      noStroke()
      translate(-w/8 + this.pos.x, h/8 + this.pos.y, this.pos.z)
      ambientLight(mainColor)
      ambientMaterial(mainColor)
      sphere(this.size * cos(a))
      pop()
    }

  }