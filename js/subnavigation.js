// Navigation Array

let grid = [
    {
        name: "Ping Kong",
        url: "./p5-files/ping-kong-game/index.html",
        img_src: ""
    },
    {
        name: "Fractal Tree",
        url: "./p5-files/fractal-tree/index.html"
    },
]



// subnav Loop
let subnav = document.createElement('div')
subnav.setAttribute("id", "subnavId")
subnav.setAttribute("class", "subnav")
document.getElementById('subheaderId').appendChild(subnav);

for (let i = 0; i < grid.length; i++){
    let subNavItem = document.createElement('a')
    subNavItem.innerHTML = grid[i].name;
    subNavItem.setAttribute("href", grid[i].url)
    subNavItem.setAttribute("class", "subNavItem")

    // console.log(subNavItem);
    document.getElementById('subnavId').appendChild(subNavItem);
}

