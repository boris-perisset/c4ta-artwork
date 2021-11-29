// Navigation Array

let nav = [
    {
        name: "DrawBot",
        url: "./index.html"
    },
    {
        name: "P5",
        url: "./p5.html"
    },
    {
        name: "Vanilla",
        url: "./vanilla.html"
    },
]

// Header Logo Link
let logoLink = document.createElement('a')
logoLink.setAttribute("id", "logoLinkId")
logoLink.setAttribute("href", "./index.html")
document.getElementById('headerId').appendChild(logoLink)

//Header Logo Image
let logo = document.createElement('img')
logo.setAttribute("class", "logo")
logo.setAttribute("src", "./images/design/atelier-perisset-logo-icon-weiss.svg")
logo.setAttribute("alt", "Atelier Périsset Logo")
document.getElementById('logoLinkId').appendChild(logo)


// Navbar Loop
let navbar = document.createElement('div')
navbar.setAttribute("id", "navBarId")
navbar.setAttribute("class", "navBar")
document.getElementById('headerId').appendChild(navbar);

for (let i = 0; i < nav.length; i++){
    let navItem = document.createElement('a')
    navItem.innerHTML = nav[i].name;
    navItem.setAttribute("href", nav[i].url)
    navItem.setAttribute("class", "navItem")

    // console.log(navItem);
    document.getElementById('navBarId').appendChild(navItem);
}

