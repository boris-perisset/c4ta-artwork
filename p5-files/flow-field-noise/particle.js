class Particle {
    constructor(){
        this.position = createVector(random(0, w), random(0, h))
        this.velocity = createVector(0, 0)
        this.accumulation = createVector(0, 0)
        this.maxSpeed = 2
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
        stroke(col, 200, 200)
        // noStroke()
        fill(col, 100, 100)
        circle(this.position.x, this.position.y, 30 * sin(zOff))

    }


    edges() {
        if (this.position.x > w - 200) {
            this.position.x = w + 200
        }
        if (this.position.x < w - 200) {
            this.position.x = w + 200
        }
        if (this.position.y > h - 200) {
            this.position.y = h + 200
        }
        if (this.position.y < h - 200) {
            this.position.y = h + 200
        }
    }

}