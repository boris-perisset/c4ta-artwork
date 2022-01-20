class Susuwatari {
    constructor(radius, posX, posY, id) {
      this.id = id
      this.ring = []
      this.radius = radius
      this.vect = createVector(posX, posY)
      this.xSpeed = random() * 2.2 * vw
      this.ySpeed = random() * 2.2 * vw
      this.degree = TAU / points
      this.radMin = radius/25
      this.points = 360
      this.eyesize = radius/3
      this.pupille = radius/8
      this.eyedistance = radius/2.5
      this.eyeheight = radius/3
      susu.randomBlink = true
      this.display = function() {
        push()
          translate(this.vect.x, this.vect.y)
          strokeJoin(ROUND)
          fill(0)
        
          // the quirkly shape instead of a circle
          for (let i = 0; i < this.points; i++)  {
            let x = sin(i * this.degree) * radius + random(-this.radMin,this.radMin)
            let y = cos(i * this.degree) * radius + random(-this.radMin,this.radMin)  
            this.ring.push({x: x, y: y})
          }
          
          beginShape()
          for (let i = 0; i < this.points; i++){
            vertex(this.ring[i].x, this.ring[i].y);
          }
          endShape()   
        pop()
      }
    }

    // A random positioned vector travels across the canvas and opens the eye of the susuwataris when they are near by.
    eyeBlinking() {
      let dEye = dist(this.vect.x, this.vect.y, openEye.x, openEye.y)
      this.openEyeMovement()

      openEyeRadius = 180*vw

        if (dEye < openEyeRadius) { 
          push()
          translate(this.vect.x, this.vect.y)
          fill(255)
          ellipse(this.eyedistance,  this.eyeheight, this.eyesize, this.eyesize)
          fill(0)
          circle(this.eyedistance,  this.eyeheight, this.pupille)
          fill(255)
          ellipse(-this.eyedistance,  this.eyeheight, this.eyesize, this.eyesize)
          fill(0)
          circle(-this.eyedistance,  this.eyeheight, this.pupille)
          pop()
        }
    }
    openEyeMovement() {
      openEye.x += this.xSpeed * 2;
      openEye.y += this.ySpeed * 2;
  
      if (openEye.x <= -w/2 + openEyeRadius) this.xSpeed *= -1
      if (openEye.x > w/2 - openEyeRadius) this.xSpeed *= -1
      if (openEye.y <= -h/2 + openEyeRadius) this.ySpeed *= -1
      if (openEye.y > h/2 - openEyeRadius) this.ySpeed *= -1
    }
    
    move() {
        // let inc = TWO_PI / 360
        this.vect.x += this.xSpeed + random(-1.8*vw,1.8*vw)// * sin(b)
        this.vect.y += this.ySpeed + random(-1.8*vw,1.8*vw)// * cos(b)
        // b = b + inc

        if (this.vect.x <= -w/2 + this.radius) this.xSpeed *= -1
        if (this.vect.x > w/2 - this.radius) this.xSpeed *= -1
        if (this.vect.y <= -h/2 + this.radius) this.ySpeed *= -1
        if (this.vect.y > h/2 - this.radius) this.ySpeed *= -1

      }
    
    intersects(others) {
      let bounceX = this.vect.x - others.vect.x
      bounceRight =  bounceX >= 0

      let bounceY = this.vect.y - others.vect.y
      bounceUp = bounceY >= 0
      
      let bounceDifference = p5.Vector.sub(this.vect, others.vect);
      bounceDifference.setMag(4);

      let d = dist(this.vect.x, this.vect.y, others.vect.x, others.vect.y)
      if (d < (this.radius) + others.radius) {
        return true
      } else {
        return false
      }
    }

    mouseFear(mausX, mausY) {
      let lineMaxDist = vw * 300;
      let distance = dist(mausX, mausY, this.vect.x, this.vect.y);

      let directionX = mausX - this.vect.x
      let isRight =  directionX >= 0

      let directionY = mausY - this.vect.y
      let isAbove = directionY >= 0

      let mouse = createVector(mausX, mausY);

      let difference = p5.Vector.sub(mouse, this.vect);
      difference.setMag(30*(vw/1.5));
      // console.log(distance)
      if (distance <  lineMaxDist) {
        // console.log(distance)

        this.vect.sub(difference);
        push()
   
        translate(this.vect.x, this.vect.y)
        if (isRight){
          this.vect.x = this.vect.x + this.xSpeed * 40
        } else {
          this.vect.x = this.vect.x - this.xSpeed * -40
        }

        if (isAbove){
          this.vect.y = this.vect.y + this.ySpeed * 40
        } else {
          this.vect.y = this.vect.y - this.ySpeed * -40
        }
      

        fill(255)
        ellipse(this.eyedistance,  this.eyeheight, this.eyesize, this.eyesize)
        fill(0)
        circle(this.eyedistance,  this.eyeheight, this.pupille)
        fill(255)
        ellipse(-this.eyedistance,  this.eyeheight, this.eyesize, this.eyesize)
        fill(0)
        circle(-this.eyedistance,  this.eyeheight, this.pupille)
        pop()
      }
    }

    bounces() {
        // this.xSpeed *= -1
        // this.ySpeed *= -1

        // this.vect.x = this.vect.x + this.xSpeed * PI
        // this.vect.y = this.vect.y + this.ySpeed * PI
  

        // this.xSpeed *= 1.3 * vw
        // this.ySpeed *= 1.3 * vw

        this.vect.sub(bounceDifference);
        push()
   
        translate(this.vect.x, this.vect.y)

        if (bounceRight){ 
          this.xSpeed *= -1.6 * vw;
          this.vect.x = this.vect.x + this.xSpeed * PI
        } else {
          this.xSpeed *= -1.6 * vw;
          this.vect.x = this.vect.x + this.xSpeed * -PI
        }

        if (bounceUp){
          this.ySpeed *= -1.6 * vw;
          this.vect.y = this.vect.y + this.ySpeed * PI
        } else {
          this.ySpeed *= -1.6 * vw;
          this.vect.y = this.vect.y + this.ySpeed * -PI
        }
        pop()
    }
  }
  