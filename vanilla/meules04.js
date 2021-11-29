<!doctype html>
<html>

<head>

    <title>meules</title>

    <meta charset="utf-8">
    <meta name="viewport" content="initial-scale=1, minimum-scale=1, user-scalable=no, viewport-fit=cover">

    <script language="javascript" type="text/javascript" src="simplex-noise.min.js"></script>

    <style>
        body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            font-size: 0;
            font-family: sans-serif;
            color: #fff;
            background-color: rgb(51, 11, 97);
            user-select: none;
        }

        stage,
        svg,
        path {
            position: fixed;
            overflow: visible;
        }
    </style>

</head>

<body>
</body>

<script>

    //CODE

    let twrk = {};


    //COORDINATES

    twrk.scale = function ({ width, height }) {
        if (width) {
            twrk.width = width;
            twrk.res = window.innerWidth / twrk.width;
            twrk.height = window.innerHeight / twrk.res;
        } else if (height) {
            twrk.height = height;
            twrk.res = window.innerHeight / twrk.height;
            twrk.width = window.innerWidth / twrk.res;
        }
        twrk.center = { x: twrk.width / 2, y: twrk.height / 2 };
    }
    twrk.scale({ height: 120 });


    //SVG

    let svg = {};

    svg.nameSpace = "http://www.w3.org/2000/svg";

    svg.path = function (ia) {
        let output = "M ";
        for (var i = 0; i < ia.length; i++) {
            output += ia[i].x * twrk.res + " " + ia[i].y * twrk.res + " ";
        }
        output += "z";
        return output;
    };

    svg.makeLayer = function ({ parent, id, x = 0, y = 0 }) {
        dom[id] = document.createElementNS(svg.nameSpace, "svg");
        dom[id].id = id;
        dom[id].style.transform = "translateX(" + (x * twrk.res) + "px) translateY(" + (y * twrk.res) + "px)";
        parent.appendChild(dom[id]);
    };

    svg.makeLine = function ({ parent, id, d = "", color = "#ff00ff", stroke = 1, cap = "butt", join = "round" }) {
        dom[id] = document.createElementNS(svg.nameSpace, "path");
        dom[id].setAttributeNS(null, "fill", "none");
        dom[id].setAttributeNS(null, "d", d);
        dom[id].setAttributeNS(null, "stroke-width", stroke * twrk.res);
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

    //drehung
    lineRotation = function ({ center, radius, rotation }) {
        return [
            { x: center.x + Math.sin(rotation) * radius, y: center.y + Math.cos(rotation) * radius },
            { x: center.x - Math.sin(rotation) * radius, y: center.y - Math.cos(rotation) * radius }
        ];
    };

    //DOM

    let dom = {};

    //stage
    dom.stage = document.createElement("stage");
    dom.stage.style.transform = "translateX(" + (twrk.center.x * twrk.res) + "px) translateY(" + (twrk.center.y * twrk.res) + "px)";
    dom.stage.id = "stage";
    document.body.appendChild(dom.stage);

    //svg layer
    svg.makeLayer({ parent: dom.stage, id: "svgLayer", x: 0, y: 0 });


    twrk.getDistance = function (a, b) {
        let aa = a.x - b.x;
        let bb = a.y - b.y;
        return Math.sqrt(aa * aa + bb * bb);
    };

    //drawing
    for (let i = 0; i < 1000; i++) {

        let temp = { x: (-1 + Math.random() * 2) * 50, y: (-1 + Math.random() * 2) * 50 };


        let ranColor1 = Math.random() * 255
        let ranColor2 = Math.random() * 255


        let line = lineRotation({
            center: temp,
            rotation: Math.random() * Math.PI,
            radius: 2
        });

        if (twrk.getDistance(temp, { x: 0, y: 0 }) > 30) {

            let path = svg.path(line);

            svg.makeLine({
                id: "line_" + i, parent: dom.svgLayer, cap: "round", stroke: 0.2, color: "rgb(" + 0 + "," + ranColor1 + "," + ranColor2 + ")", d: path
            });
        }

    }


    //drawing
    for (let i = 0; i < 500; i++) {

        let temp = { x: (-1 + Math.random() * 2) * 50, y: (-1 + Math.random() * 2) * 50 };

        let ranColor1 = Math.random() * 255
        let ranColor2 = Math.random() * 255

        let line = lineRotation({
            center: temp,
            rotation: Math.random() * Math.PI,
            radius: 2
        });

        if (twrk.getDistance(temp, { x: 0, y: 0 }) < 33) {


            let path = svg.path(line);

            svg.makeLine({
                id: "line2_" + i, parent: dom.svgLayer, cap: "round", stroke: 0.4, color: "rgb(" + ranColor1 + "," + 0 + "," + ranColor2 + ")", d: path
            });
        }

    }


</script>

</html>