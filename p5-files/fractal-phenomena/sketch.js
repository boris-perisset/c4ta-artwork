/*
=====================     G L O B A L      ========================================
*/
let width = 800;
let height = 800;

let cellNumb = 5
let cellSize = width / cellNumb;
let grid = [];


/*
=====================     S E T U P      ========================================
*/

function setup() {

  const canvas = createCanvas(width, height);
  canvas.parent('pi5-canvas');
  
  for (let col = 0; col < cellNumb; col += 1) {
    for (let row = 0; row < cellNumb; row += 1) {
      let posX = row * cellSize;
      let posY = col * cellSize;
      let posCell = {x: posX, y: posY}
      let newCell = new Cell(posCell, cellSize)

      grid.push(newCell)
    }
  }
}
  /*
  =====================     D R A W      ========================================
  */

function draw () {
  background(50);
  // myForest.planting();

  for (let i = 0; i < grid.length; i += 1) {
    let currentCell = grid[i]
    currentCell.show()
  }

}