class Shape {
    constructor(vectors) {
        this.startingPoint = random(vectors)
    }

    build() {
        // let x = floor(this.position.x / scale)
        // let y = floor(this.position.y / scale)
        // let index = x + y * cols
        translate (x * scale, y * scale)

        let trans = p5.Vector.fromAngle(angle)
        stroke(255, 0,0)
        strokeWeigth(4)
        fill(255, 0, 0)
        circle(this.startingPoint.x, this.startingPoint.y, 50)
        this.startingPoint.add(trans)

        
        beginShape()
        for (let i = 0; i < 10; i++) {
            push()
            rotate(v.heading())
            vertex(this.startingPoint.x * i, this.startingPoint.y * i)
            pop()
        }
        endShape()

        // stroke(col)
        // push()
        // //go to point in grid
        // translate (x * scale, y * scale)
        // //rotate the direction of the vector
        // rotate(v.heading())
        // //draw a line to with the length of scale with that rotation
        // line(0, 0, scale, 0)
        // pop()


        // beginShape()
        // for (let i = 0; i < 10; i++) {
        //     push()
        //     rotate(angle)
        //     let xOffset = startPoint.x + i * scale
        //     let yOffset = startPoint.y + i * scale
        //     pop()
        // curveVertex(xOffset, yOffset)
        // }
        // endShape()
    }

    // show() {
    //     stroke(255, 0,0)
    //     circle(this.startingPoint.x, this.startingPoint.y, 40)

    // }
    
}