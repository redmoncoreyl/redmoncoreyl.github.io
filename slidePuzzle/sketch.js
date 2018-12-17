var mode;
var psize;
var puzzle = [];

function setup() {
  createCanvas(900,900);
  mode = 0;
  psize = 3;
  puzzle.push(new Puzzle(3));
  puzzle.push(new Puzzle(4));
  puzzle.push(new Puzzle(5));
}

function keyPressed() {
  if (mode == 0) {
    if (keyCode == UP_ARROW) {
      psize--;
      if (psize < 3) psize++;
    }
    if (keyCode == DOWN_ARROW) {
      psize++;
      if (psize > 5) psize--;
    }
    if (keyCode == ENTER) {
      mode = 1;
      puzzle[psize-3].shuffle();
    }
  } else if (mode == 1) {
    if (keyCode == UP_ARROW) {
      puzzle[psize-3].update(0);
    }
    if (keyCode == DOWN_ARROW) {
      puzzle[psize-3].update(1);
    }
    if (keyCode == LEFT_ARROW) {
      puzzle[psize-3].update(2);
    }
    if (keyCode == RIGHT_ARROW) {
      puzzle[psize-3].update(3);
    }
    if (keyCode == 27) {
      mode = 0;
    }
    if (keyCode == ENTER) {
      puzzle[psize-3].shuffle();
    }
  }
}

function draw() {
  background(100,100,255);
  
  if (mode == 0) {
    noStroke();
    fill(200,200,255);
    if (psize == 3) rect(360,362,150,-70);
    if (psize == 4) rect(360,512,150,-70);
    if (psize == 5) rect(360,662,150,-70);
    textSize(70);
    textFont("Consolas");
    fill(0);
    text("Choose Puzzle Size", 100, 200);
    text("3x3",375,350);
    text("4x4",375,500);
    text("5x5",375,650);
  } else if (mode == 1) {
    puzzle[psize-3].show();
    if (puzzle[psize-3].solved()) {
      fill(255,100,100,230);
      rect(width/8, height/3, width*3/4, height/3);
      textSize(150);
      textFont("Consolas");
      fill(0);
      text("Solved!", width*3/16, height*5/9);
    }
  }
}