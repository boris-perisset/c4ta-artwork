class Cell {
    constructor(posCell, Cellsize) {
        this.pos = posCell;
        this.Cellsize = Cellsize;
        this.forest = [];
        this.forest.push(new Tree(this.Cellsize))
    }

    show() {
        // rect(this.pos.x, this.pos.y, this.Cellsize)
        push();
        translate(this.pos.x, this.pos.y);
        for (let bonsai of this.forest) {
            bonsai.grow();
        }
        pop();
    }
}

class Tree {
    constructor(treeSize) {
        //Eröffnet den Baum als Liste
        this.tree = [];

        this.midPoint = treeSize / 2
        // Begin Vector Zeichnung (Vector (x, y, z) allesamt Optional)
        this.begin = createVector(this.midPoint, this.midPoint*1.5); //der Beginn ist pro Zelle x mittig unten
        this.end = createVector(this.midPoint, this.midPoint); //das Ende ist pro Zelle x mittig bis ins Zentrum
        // Anzahl Äste am Baum
        this.twig = random(1,50)
        // Der Baum wird initialisiert
        this.root = new Branch(this.begin, this.end);
    } 
    grow() {
        // Der Stamm des Baums
        this.tree[0] = this.root;
        // Die Äste des Baums
        for (var i =  0 ; i < this.twig; i++) {
            this.tree[i].winkelRotation();// Warum bewegt es sich nicht??
            push()
            this.tree.push(this.tree[i].branchA())
            this.tree.push(this.tree[i].branchB())
            this.tree[i].show();
            pop()

        }
    }
}

class Branch {
    constructor(begin, end) {    
        this.begin = begin
        this.end = end

        //Winkelspiel
        this.a = random(0.6/0.8); //eigentlich sollte hier 0 stehen... um die Sinus Animation zu machen.
        this.winkel;
        this.increment;

        //Farbspiel
        this.green = random(150,250);
        this.blue = random(150,250);

        //Ast A
        this.branchA = function() {
            let dir = p5.Vector.sub(this.end, this.begin);
            dir.rotate(this.winkel)
            dir.mult(0.45)
            let newEnd = p5.Vector.add(this.end, dir)  
            let b = new Branch (this.end, newEnd)
            return b;
        }
        //Ast B
        this.branchB = function() {
            
            let dir = p5.Vector.sub(this.end, this.begin);
            dir.rotate(-this.winkel)
            dir.mult(0.45)
            let newEnd = p5.Vector.add(this.end, dir)  
            let b = new Branch (this.end, newEnd)
            return b;
        }
    }  

    show() {
        stroke(0, this.green, this.blue);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y)
        fill(0, this.green, this.blue)
        circle(this.begin.x, this.begin.y-35, random(2,5)) // proof obs bis hier hin funktioniert
    }

    // wie kann ich diese Funktion so einstellen, damit sich die Sinuskurve bewegt?
    winkelRotation() {
        this.increment = TWO_PI / 25;
        this.a = this.a + this.increment
        this.winkel = sin(this.a);
      }

}

