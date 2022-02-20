class Particle {
    constructor(){
        this.position = createVector(random(0, w), random(0, h))
        this.velocity = createVector(0, 0)
        this.accumulation = createVector(0, 0)
        this.maxSpeed = 3
        this.size = 40
        this.color = int(random(0, colorSet.colors.length))
        this.colorBG = int(random(0, colorSet.colors.length))
    }

    update() {
        this.velocity.add(this.accumulation)
        this.velocity.limit(this.maxSpeed)
        this.position.add(this.velocity)
        this.accumulation.mult(0)
    }

    follow(vectors) {
        let x = floor(this.position.x / scale)
        let y = floor(this.position.y / scale)
        let index = x + y * cols
        let force = vectors[index]
        this.applyForce(force)
    }

    applyForce(force) {
        this.accumulation.add(force)
    }

    show() {
        stroke(colorSet.colors[this.color])
        // noStroke()
        fill(colorSet.colors[this.colorBG])
        circle(this.position.x, this.position.y, this.size * (sin(tOff)*1))
    }

    closeUp() {
        this.size -= 0.09
    }

    combine(others) {
        fill(0,2)
        noStroke()
        beginShape()
        curveVertex(others.position.x, others.position.y, zOff)
        curveVertex(this.position.y, this.position.x, zOff)
        // curveVertex(this.position.x, others.position.y, zOff)
        // curveVertex(others.position.y, this.position.x, zOff)
        vertex(mouseX, mouseY)
        endShape(CLOSE)

    }

    combine2(others) {
        fill(255,2)
        noStroke()
        beginShape()
        vertex(mouseY-200, mouseX+200)
        curveVertex(this.position.x, others.position.y, zOff)
        curveVertex(others.position.y, this.position.x, zOff)
        // curveVertex(others.position.x, others.position.y, zOff)
        // curveVertex(others.position.y, this.position.x, zOff)
        endShape(CLOSE)

    }


    edges() {
        if (this.position.x > rightX ) {
            this.position.x = leftX
        }
        if (this.position.x < leftX) {
            this.position.x = rightX
        }
        if (this.position.y > bottomY) {
            this.position.y = topY
        }
        if (this.position.y < topY) {
            this.position.y = bottomY
        }
    }

}