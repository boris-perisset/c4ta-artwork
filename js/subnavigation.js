// Navigation Array

let grid = [
    {
        name: "Ping Kong",
        url: "./p5-files/ping-kong-game/index.html",
        img_src: "./p5-files/ping-kong-game/ping-pong.png",
        alt_tag: "Ping Pong Screenshot"
    },
    {
        name: "Fractal Tree",
        url: "./p5-files/fractal-tree/index.html",
        img_src: "./p5-files/fractal-tree/fractal-tree.png",
        alt_tag: "A tree with two branches on every branch"
    },
    {
        name: "Fractal Swarm",
        url: "./p5-files/fractal-swarm/index.html",
        img_src: "./p5-files/fractal-swarm/fractal-swarm.png",
        alt_tag: "A swarm of trees floating around"
    },
    {
        name: "Fractal Phenomena",
        url: "./p5-files/fractal-phenomena/index.html",
        img_src: "./p5-files/fractal-phenomena/fractal-phenomena.png",
        alt_tag: "Many Trees but each one is different"
    },
    {
        name: "Sinus Cosinus",
        url: "./p5-files/sinus-cosinus/index.html",
        img_src: "./p5-files/sinus-cosinus/sinus-cosinus.png",
        alt_tag: "A snake like sinus-cosinus creature"
    },
    {
        name: "Sinus Movements",
        url: "./p5-files/sinus-movements/index.html",
        img_src: "./p5-files/sinus-movements/sinus-movement.png",
        alt_tag: "a lissajous spiral moving"
    },
    {
        name: "Spuren",
        url: "./p5-files/spuren/index.html",
        img_src: "./p5-files/spuren/spuren-2.png",
        alt_tag: "Floatings things with other things flollowing them"
    },
    {
        name: "Time Keeper",
        url: "./p5-files/time-keeper/index.html",
        img_src: "./p5-files/time-keeper/time-keeper.png",
        alt_tag: "Like a clock"
    },
    {
        name: "Time will tell",
        url: "./p5-files/time-will-tell/index.html",
        img_src: "./p5-files/time-will-tell/time-will-tell.png",
        alt_tag: "Dots floating chaotically ordered"
    },
]




// collection Loop
let collection = document.createElement('div')
collection.setAttribute("id", "collectionId")
collection.setAttribute("class", "collection")
document.getElementById('gridID').appendChild(collection);

for (let i = 0; i < grid.length; i++){
    let collectionItem = document.createElement('a')
    collectionItem.setAttribute("href", grid[i].url)
    collectionItem.setAttribute("id", "collectionItem" + [i])
    collectionItem.setAttribute("class", "collection-item")
    document.getElementById('collectionId').appendChild(collectionItem);

    let collectionItemContainer = document.createElement('div')
    collectionItemContainer.setAttribute("id", "collectionItemContainer" + [i])
    collectionItemContainer.setAttribute("class", "collection-item-container")
    document.getElementById('collectionItem' + [i]).appendChild(collectionItemContainer);

    let collectionItemImage = document.createElement('img')
    collectionItemImage.setAttribute("class", "drawbot-image")
    collectionItemImage.setAttribute("src", grid[i].img_src)
    collectionItemImage.setAttribute("alt", grid[i].alt_tag)
    document.getElementById('collectionItemContainer' + [i]).appendChild(collectionItemImage);

    let collectionItemDescription = document.createElement('div')
    collectionItemDescription.setAttribute("id", "collectionItemDescription" + [i])
    collectionItemDescription.setAttribute("class", "collection-description")
    document.getElementById('collectionItem' + [i]).appendChild(collectionItemDescription);

    let collectionItemName = document.createElement('h2')
    collectionItemName.innerHTML = grid[i].name;
    collectionItemName.setAttribute("class", "font-500")
    document.getElementById('collectionItemDescription' + [i]).appendChild(collectionItemName);

    let collectionItemP = document.createElement('p')
    collectionItemP.innerHTML = grid[i].alt_tag;
    collectionItemP.setAttribute("class", "font-100")
    document.getElementById('collectionItemDescription' + [i]).appendChild(collectionItemP);

    // console.log(collectionItem);
}

