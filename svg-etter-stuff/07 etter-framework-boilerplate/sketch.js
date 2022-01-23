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


 //To append all SVG Elements into one SVG Layer the parent should be dom.svgLayer or a child of it.
 svg.makeLine({ parent: dom.svgLayer, id: "rope", join: "bevel", cap: "round", stroke: 0.5, color: "#fff" });
 svg.makeLine({ parent: dom.svgLayer, id: "circles", stroke: 4, color: "#ff0", cap: "round" });


 // GLOBAL VARIABLES //

  let speed = 500;
  let size = 8;
  let long = 1;
  let interations = 50;

  let dots = [];
  physics.makePoints({ parent: dots, id: "dot", amount: 10 });

  let simplex = new SimplexNoise();


// ALMOST LIKE P5 //



function draw(time) {

    //circles
    let circleLeft = { position: { x: simplex.noise2D(10, time/2000)*50, y: 0 } };
    let circleRight = { position: { x: simplex.noise2D(20, time/2000)*50, y: 0 } };
    dom.circles.setAttributeNS(null, "d", svg.paths([[circleLeft.position], [circleRight.position]]));

    //osc1.frequency.value = circleLeft.position.y+100;
    gainNode1.gain.value = circleLeft.position.x/10;
    gainNode2.gain.value = circleRight.position.x/10;
    gainNode3.gain.value = Math.sin(time/4000)*2;
    osc2.frequency.setValueAtTime(Math.sin(time/4000)*200, audioCtx.currentTime);

    //verlet
    physics.verlet({ a: circleLeft, b: dots[0], distance: 0, stiffness: 1, interations: interations });
    for (let i = 0; i < dots.length - 1; i++) {
        physics.verlet({ a: dots[i], b: dots[(i + 1)], distance: long, stiffness: 0.8, interations: interations });
    }
    physics.verlet({ a: dots[dots.length - 1], b: circleRight, distance: 0, stiffness: 1, interations: interations });

    let collect = [];
    for (let i = 0; i < dots.length; i++) {
        let dot = dots[i];
        physics.calculate({ point: dot, force: { x: 0, y: 0.02 } });
        collect.push(dot.position)
    }
    dom.rope.setAttributeNS(null, "d", svg.pathSoft(collect));

    requestAnimationFrame(draw);
};

draw(0);