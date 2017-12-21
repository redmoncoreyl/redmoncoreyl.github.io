let puzzle;
let input;

function setup() {
  createCanvas(1280, 720);

  puzzle = new Puzzle();
  // puzzle.shuffle();
  input = -1;
  createP("Move one ball from the top of one stack to the top of another by clicking on one and then clicking on the other.");
  createP("In the solved state, the colors from bottom to top should be RED, YELLOW, GREEN, BLUE, PURPLE.");
  createP("In the solved state, the right-most track should be empty.");
  createP("Press 'S' at any time to shuffle the puzzle.");
}

function keyPressed() {
  if (key == "S") {
    puzzle.shuffle();
  }
}

function mousePressed() {
  puzzle.update(mouseX);
}

function draw() {
  background(0);
  puzzle.show();
  if (puzzle.isSolved()) {
    push();
    rectMode(CENTER);
    textAlign(CENTER, CENTER);
    textSize(height*0.4);
    fill(255, 0, 0, 210);
    stroke(255);
    strokeWeight(8);
    rect(width/2, height/2, width*0.8, height*0.6);
    fill(255);
    text("Solved", width/2, height/2);
    pop();
  }
}
