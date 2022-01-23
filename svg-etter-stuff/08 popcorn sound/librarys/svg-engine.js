  //CODE

  let engine = {};

  //COORDINATES

  engine.scale = function ({ width, height }) {
      if (width) {
          engine.width = width;
          engine.res = window.innerWidth / engine.width;
          engine.height = window.innerHeight / engine.res;
      } else if (height) {
          engine.height = height;
          engine.res = window.innerHeight / engine.height;
          engine.width = window.innerWidth / engine.res;
      }
      engine.center = { x: engine.width / 2, y: engine.height / 2 };
  }
  engine.scale({ width: 120 });


  //SVG GENERATE PATH FUNCTIONS
  
  let svg = {};

  svg.nameSpace = "http://www.w3.org/2000/svg";


  svg.path = function (ArrayOfCoordinates) {
      let output = "M ";
      for (var i = 0; i < ArrayOfCoordinates.length; i++) {
          output += ArrayOfCoordinates[i].x * engine.res + " " + ArrayOfCoordinates[i].y * engine.res + " ";
      }
      if (ArrayOfCoordinates.length == 1) output += "z";
      return output;
  };

  svg.paths = function (ArrayOfCoordinates) {
      let output = "";
      for (var i = 0; i < ArrayOfCoordinates.length; i++) {
          output += svg.path(ArrayOfCoordinates[i]);
      }
      return output;
  };

  svg.pathSoft = function (ArrayOfCoordinates) { //[{x: 10, y: 10}, {x:20, y: 20}, {x: 30, y: -20}]
      ArrayOfCoordinates.unshift(ArrayOfCoordinates[0]);
      let output = "M ";
      for (let i = 1; i < ArrayOfCoordinates.length; i++) {
          output += (ArrayOfCoordinates[i - 1].x + ArrayOfCoordinates[i].x) / 2 * engine.res + "," + (ArrayOfCoordinates[i - 1].y + ArrayOfCoordinates[i].y) / 2 * engine.res + " Q";
          output += ArrayOfCoordinates[i].x * engine.res + "," + ArrayOfCoordinates[i].y * engine.res + " ";
      }
      output += ArrayOfCoordinates[ArrayOfCoordinates.length - 1].x * engine.res + "," + ArrayOfCoordinates[ArrayOfCoordinates.length - 1].y * engine.res + " ";
      return output;
  };

  svg.pathsSoft = function (ArrayOfCoordinates) {
      let output = "";
      for (var i = 0; i < ArrayOfCoordinates.length; i++) {
          output += svg.pathSoft(ArrayOfCoordinates[i]);
      }
      return output;
  };


//SVG GENERATE LAYER FUNCTIONS

  svg.makeLayer = function ({ parent, id, x = 0, y = 0 }) {
      dom[id] = document.createElementNS(svg.nameSpace, "svg");
      dom[id].id = id;
      dom[id].style.transform = "translateX(" + (x * engine.res) + "px) translateY(" + (y * engine.res) + "px)";
      parent.appendChild(dom[id]);
  };

  svg.makeLine = function ({ parent, id, d = "", color = "#ff00ff", stroke = 0.5, cap = "butt", join = "bevel" }) {
      dom[id] = document.createElementNS(svg.nameSpace, "path");
      dom[id].setAttributeNS(null, "fill", "none");
      dom[id].setAttributeNS(null, "d", d);
      dom[id].setAttributeNS(null, "stroke-width", stroke * engine.res);
      dom[id].setAttributeNS(null, "stroke", color);
      dom[id].setAttributeNS(null, "stroke-linecap", cap);
      dom[id].setAttributeNS(null, "stroke-join", join);
      dom[id].id = id;
      parent.appendChild(dom[id]);
  };

  svg.makeShape = function ({ parent, id, d = "", color = "#ff00ff" }) {
      dom[id] = document.createElementNS(svg.nameSpace, "path");
      dom[id].setAttributeNS(null, "fill", color);
      dom[id].setAttributeNS(null, "d", d);
      dom[id].id = id;
      parent.appendChild(dom[id]);
  };

  //PHYSICS

  let physics = {};

  physics.makePoint = function ({ position = { x: 0, y: 0 }, drag = 0.97, acceleration = { x: 0, y: 0 }, id }) {
      output = {};
      output.id = id;
      output.position = position;
      output.drag = drag;
      output.acceleration = acceleration;
      return output;
  };

  //make physics dots
  physics.makePoints = function ({ amount = 10, id, parent }) {
      for (let i = 0; i < amount; i++) {
          parent.push(physics.makePoint({
              id: id + i,
              position: { x: -50 + Math.random() * 50, y: Math.random() * 100 }
          }));
      }
  };

  physics.calculate = function ({ point, force = { x: 0, y: 0 } }) {
      point.acceleration = { x: point.acceleration.x * point.drag, y: point.acceleration.y * point.drag };
      point.acceleration = { x: point.acceleration.x + force.x, y: point.acceleration.y + force.y };
      point.position = { x: point.position.x + point.acceleration.x, y: point.position.y + point.acceleration.y };
  };

  physics.verlet = function ({ a, b, distance, stiffness, interations = 50 }) {
      for (let i = 0; i < interations; i++) {
          let difference = { x: a.position.x - b.position.x, y: a.position.y - b.position.y };
          let dot = (difference.x * difference.x) + (difference.y * difference.y);

          if (dot == 0) dot = 0.001;

          let scalar = (distance - dot) / dot * stiffness * 0.5;
          let move = { x: difference.x * scalar, y: difference.y * scalar };

          a.position = { x: a.position.x + move.x, y: a.position.y + move.y };
          b.position = { x: b.position.x - move.x, y: b.position.y - move.y };
      }
  };

  

  //DOM AN OBJECT WHICH CREATES A STAGE FOR THE SVG TO SHINE
  let dom = {};

  //stage
  dom.stage = document.createElement("stage");
  dom.stage.style.transform = "translateX(" + (engine.center.x * engine.res) + "px) translateY(" + (engine.center.y * engine.res) + "px)";
  dom.stage.id = "stage";
  document.body.appendChild(dom.stage);

  svg.makeLayer({ parent: dom.stage, id: "svgLayer", x: 0, y: 0 });


 