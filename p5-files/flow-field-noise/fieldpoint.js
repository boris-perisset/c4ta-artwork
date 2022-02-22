class Point {
    constructor(xOff, yOff, zOff, direction, x, y, resolution, index) {
        this.direction = direction
        this.origin = createVector(xOff, yOff)
        this.gridPos = createVector(x, y)
        this.resolution = resolution
        this.index = index
        this.noiseX = noise(this.origin.x) * this.direction
        this.noiseY = noise(this.origin.y) * this.direction
        this.noiseZ = noise(zOff) * this.direction
        this.v = this.origin.add(this.noiseX, this.noiseY, this.noiseZ)
        // this.angle = noise(this.origin.x, this.origin.y, zOff) * this.direction
        // this.v = p5.Vector.fromAngle(this.angle)
    }

    show() {
        push()
        translate (this.gridPos.x * this.resolution, this.gridPos.y * this.resolution)
        stroke(150)
        fill(255, 0, 0)
        // circle(0, 0, 5)
        rotate(this.v.heading())
        // translate(this.v.x, this.v.y)
        this.v.setMag(resolution)
        line(0, 0, this.v.x, this.v.y)
        noStroke()
        circle(this.v.x, this.v.y, 4)
        pop()
    }

    update(z) {
        this.z = noise(z) * 1.02
        // this.z = createVector(z, z)
        // this.v.add(this.z)
        this.angle = noise(this.v.x, this.v.y, this.z) * this.direction
        this.v = p5.Vector.fromAngle(this.angle)
    }
}


class Grid {
    constructor(w, h, resolution) {
        this.leftX = int(w * -0.5)
        this.rightX  = int(w * 1.5)
        this.topY = int(h * -0.5)
        this.bottomY  = int(h * 1.5)
        this.resolution = resolution
        this.numCols = int((this.rightX - this.leftX) / this.resolution)
        this.numRows = int((this.bottomY - this.topY) / this.resolution)
        this.mainDirection = PI * 0.25
        this.xOff = 0
        this.yOff = 0
        this.zOff = 0
        this.inc = 0.00000002
        this.x = 0
        this.y = 0
        this.flowField = []//new Array(this.numCols * this.numRows)
        this.index = 0
    }

    build() {
        this.yOff = 0
        for (this.y = 0; this.y < this.numCols; this.y++) {
            this.xOff = 0
            for (this.x = 0; this.x < this.numCols; this.x++) {
                this.index++
                this.point = new Point(this.xOff, this.yOff, this.zOff, this.mainDirection, this.x, this.y, this.resolution, this.index)
                // this.point.show()
                this.flowField.push({dot:this.point, index:this.index})
              this.xOff += this.inc
            }
            this.yOff += this.inc
        } 
        console.log(this.flowField)
    }

    display() {
        for (let i = 0; i < this.flowField.length; i++) {
            this.flowField[i].dot.show()
        }
    }

    update() {
        for (let i = 0; i < this.flowField.length; i++) {
            this.flowField[i].dot.update(this.zOff)

        }
        // this.xOff += this.inc
        // this.yOff += this.inc
        this.zOff += 0.000002
    }


}