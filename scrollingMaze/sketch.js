let grid;
let tileSize;


function setup() {
  createCanvas(1280, 720);
  tileSize = 80;
  colorMode(HSB);
  grid = new TileGrid(tileSize);
  
}

function draw() {
  background(15);
  grid.show();
  grid.update();
}