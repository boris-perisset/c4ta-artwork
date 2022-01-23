/*
THE SVG ENGINE MAIN FUNCTIONS

SCALE ALL VECTORS
Default-Value
engine.scale({ width: 120 });
engine.scale({ height: 120 });

CREATE SVG ELEMENTS:
svg.makeLayer() // { parent, id, x = 0, y = 0 } // There is already 1 Layer Set to the stage to start. id.svgLayer. The Layer contains all other SVG Elements.
svg.makeLine() // { parent, id, d = "", color = "#ff00ff", stroke = 0.5, cap = "butt", join = "bevel" }
svg.makeShape() // { parent, id, d = "", color = "#ff00ff" }
  
CREATE PATH: Out of an Array of Cordinates of an Object [{x: 10, y: 10}] 
svg.path() 
svg.paths() 
svg.pathSoft()
svg.pathsSoft()

ENABLE PHYSICS
physics.makePoint() // { position = { x: 0, y: 0 }, drag = 0.97, acceleration = { x: 0, y: 0 }, id }
physics.makePoints() // { amount = 10, id, parent }
physics.calculate() // { point, force = { x: 0, y: 0 } }
physics.verlet() // { a, b, distance, stiffness, interations = 50 }

ENABLE PERLIN NOISE
let simplex = new SimplexNoise();
    value2d = simplex.noise2D(x, y),
    value3d = simplex.noise3D(x, y, z),
    value4d = simplex.noise4D(x, y, z, w);

or check  https://github.com/jwagner/simplex-noise.js/
 

ENABLE SOUND (with Variables)
Turn Sound on and off with link or unlink the sound.js file

gainNode1 // gainNode1.gain.value
gainNode2 //gainNode2.gain.value
gainNode3 //gainNode3.gain.value

osc1 // osc1.frequency.setValueAtTime(value)
osc2 // osc2.frequency.setValueAtTime(value)
osc3 // osc3.frequency.setValueAtTime(value)


*/


//////////////////////////////////////////////////////////////

// DO THE CODE DANCE //

//////////////////////////////////////////////////////////////


 // GLOBAL VARIABLES //

 // COLORS
let randomBlue = function () {
    let h = 200 + Math.floor(Math.random() * 130)
    let s = 30 + Math.floor(Math.random() * 100)
    let l = 30 + Math.floor(Math.random() * 10)
    return "hsl(" + h + ", " + s + "%, " + l + "%)";
}

// Hier werden die Punkte generiert
let dots = {};

let amount = Math.floor(50 * Math.random())

for(let i = 0; i < amount; i++){
    physics.makePoint({ id: "dot" + i, position: { x: -50, y: -50 }, parent: dots, color: randomBlue()});
}


// hier wird der Punkt definiert.
for (let id in dots) {
    svg.makeLine({ parent: dom.svgLayer, id: id, stroke: 3, color: randomBlue(), cap: "round" });
}


// ALMOST LIKE P5 //



function draw(time) {

    for (let id in dots) {

        let dot = dots[id];
        physics.calculate({ point: dot, force: { x: Math.random()/10, y: 0.2 } });

        if (dot.position.y > 50) {
            dot.acceleration.y = -12 * Math.random();
        }

        dom[id].setAttributeNS(null, "d", svg.path([dot.position]));

        if (dot.position.x >= 48) {
            dot.acceleration.x = -15*Math.random();
            dot.stroke = 30 * Math.random();
        }

        dom[id].setAttributeNS(null, "d", svg.path([dot.position]));

     
    }
    requestAnimationFrame(draw);
};

draw(0);