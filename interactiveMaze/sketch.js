let grid;
let tileSize;


function setup() {
  createCanvas(1280, 720);
  let numberInX = 15;
  tileSize = (width-10)/(numberInX*sqrt(3)*3/4);
  grid = new TileGrid(tileSize);
  
}

function mouseClicked() {
  grid.rotate(mouseX, mouseY);
}

function mouseWheel(event) {
  if (event.delta > 0) {
    grid.change(mouseX, mouseY, 1);
  } else {
    grid.change(mouseX, mouseY, -1);
  }
}

function draw() {
  background(255);
  grid.show();
  
}