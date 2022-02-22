class Pointfield {
    constructor(angle) {
        this.angle = angle
        this.v = p5.Vector.fromAngle(this.angle)

    }

    show(x, y, resolution) {
        stroke(0)
        push()
        translate (x * resolution, y * resolution)
        rotate(this.v.heading())
        line(0, 0, resolution, 0)
        pop()
    }

    update() {
        yOff += inc
        zOff += 0.002
    }

}

// class Field {
//     constructor() {
//         this.inc = 0.1
//         this.leftX = int(w * -0.5)
//         this.rightX  = int(w * 1.5)
//         this.topY = int(h * -0.5)
//         this.bottomY  = int(h * 1.5)
//         this.resolution = int(w * 0.03)
//         this.numCols = int((rightX - leftX) / resolution)
//         this.numRows = int((bottomY - topY) / resolution)
//         this.flowField = new Array(this.numCols * this.numRows)
//         this.initialFlowDirection = random(0, TAU)
//         // this.build = function() {
//         //     this.yOff = 0
//         //     for (this.y = 0; this.y < this.numCols; this.y++) {
//         //         this.xOff = 0
//         //         for (this.x = 0; this.x < this.numCols; this.x++) {

//         //         this.angle = noise(this.xOff, this.yOff) * this.initialFlowDirection
    
//         //         this.fieldPoint = new Pointfield(this.angle)
//         //         this.fieldPoint.show(this.x, this.y, this.resolution)
            
//         //         this.flowField.push(this.fieldPoint)
//         //         this.xOff += this.inc
//         //         }
//         //         this.yOff += this.inc
//         //         this.zOff += 0.002
//         //     }
//         // }
//     }

//     build() {
//         this.yOff = 0
//         for (this.y = 0; this.y < this.numCols; this.y++) {
//             this.xOff = 0
//             for (this.x = 0; this.x < this.numCols; this.x++) {

//             this.angle = noise(this.xOff, this.yOff) * this.initialFlowDirection
  
//             this.fieldPoint = new Pointfield(this.angle)
//             this.fieldPoint.show(this.x, this.y, this.resolution)
           
//             this.flowField.push(this.fieldPoint)
//             this.xOff += this.inc
//             }
//             this.yOff += this.inc
//             this.zOff += 0.002
//         }
//     }
// }



