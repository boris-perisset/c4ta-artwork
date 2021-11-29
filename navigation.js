let nav = [
    {
        name: "DrawBot",
        url: "/drawbot.html"
    },
    {
        name: "P5",
        url: "/p5.html"
    },
    {
        name: "Vanilla",
        url: "/vanilla.html"
    },
]


document.write("<div>");

var navbar = document.createElement('div')

document.body.appendChild(navbar);               // Append <button> to <body>
// navbar.parent('navigation')
navbar.setAttribute("id", "mainNav")
navbar.setAttribute("class", "navBar")

for (var i=0; i<=nav.length; i++){
    var navItem = document.createElement("a");   // Create a <button> element
    navItem.innerHTML = "nav.name[i]]";  
    navItem.setAttribute("href", "nav.url[i]")                 // Insert text
    // document.body.appendChild(btn);               // Append <button> to <body>
    // document.createElement('div')
        // document.write(nav[i]);
}

document.write("</div>");