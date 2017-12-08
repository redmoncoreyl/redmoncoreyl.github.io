let g;

function setup() {
  createCanvas(1280, 720);
  colorMode(HSL);
  noLoop();

  g = new Graph();
  for (let i = 0; i < 20; i++) {
    g.addNode(50);
  }

  background(100);
  g.show();
}
