let shapes;
let drawMode;
let activeShape;
let weights;

function setup() {
  createCanvas(1280, 720);

  shapes = [];
  drawMode = false;
  activeShape = -1;
  dots = true;
  createP("Weights");
  weights = createInput("1,1");
  createP("");
  createP("Controls");
  createP("'S': Begins a new shape. click with mouse to add points. Press 'S' again to end shape.");
  createP("'.': Splits the active shape which is shown in red.");
  createP("'/': Averages active shape using weights above.");
  createP("';': Splits and averages until there are more than 200 points in the active shape.");
  createP("'R': Resets system and erases all shapes.");
  createP("'E': Erases active shape.");
  createP("'D': Duplicates active shape. Useful for seeing before and after.");
  createP("'C': Toggles visibility of dots on vertices of active shape.");
  createP("ENTER: Cycles through shapes to select active shape.");
  createP("'Q': Deactivates all shapes.");
}

function draw() {
  background(51);

  for (let i = 0; i < shapes.length; i++) {
    shapes[i].show(i == activeShape);
  }
}

function keyPressed() {
  if (key == 'R') {
    shapes = [];
    drawMode = false;
    activeShape = -1;
    dots = true;
  } else if (!drawMode) {
    if (keyCode == ENTER) {
      if (shapes.length == 0) {
        activeShape = -1;
      } else {
        activeShape = (activeShape + 1) % shapes.length;
      }
    } else if (key == 'Q') {
      activeShape = -1;
    } else if (key == 'S') {
      dots = true;
      activeShape = shapes.length;
      shapes.push(new Shape());
      drawMode = true;
    } else if (key == 'D') {
      if (activeShape >= 0) {
        shapes.push(shapes[activeShape].duplicate());
      }
    } else if (keyCode == 190) { // period
      if (activeShape >= 0) {
        shapes[activeShape].split();
      }
    } else if (keyCode == 191) { // forward slash
      if (activeShape >= 0) {
        let w = parseInputBox();
        shapes[activeShape].average(w);
      }
    } else if (keyCode == 186) { // semicolon
      if (activeShape >= 0) {
        let w = parseInputBox();
        while (shapes[activeShape].size() < 200) {
          shapes[activeShape].split();
          shapes[activeShape].average(w);
        }
      }
    } else if (key == 'C') {
      if (activeShape >= 0) {
        shapes[activeShape].changeDots();
      }
    } else if (key == 'E') {
      if (activeShape >= 0) {
        shapes.splice(activeShape, 1);
        activeShape = -1;
      }
    }
  } else if (key == 'S') {
    shapes[activeShape].close();
    drawMode = false;
  }
}

function mousePressed() {
  if (drawMode) {
    shapes[activeShape].add(mouseX, mouseY);
  }
}

function parseInputBox() {
  let string = weights.value();
  let array = string.split(',');
  let returnArray = [];
  for (let i = 0; i < array.length; i++) {
    returnArray.push(parseInt(array[i]));
  }
  return returnArray;
}
