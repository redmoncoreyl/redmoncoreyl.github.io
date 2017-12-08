class BinomialTree {
  constructor(n) {
    this.val = n;
    this.color = color(n, 100, 60);
    this.size = 1;
    this.children = [];
  }

  addChild(c) {
    this.size += c.getSize();
    this.children.unshift(c);
  }

  getVal() {
    return this.val;
  }

  getSize() {
    return this.size;
  }

  show(xMin, xMax, yMin, yMax) {
    push();
    fill(this.color);
    stroke(0);
    strokeWeight(3);
    rectMode(CORNERS);

    // show this value:
    // draw a rectangle that takes up the 1/(1+c) top portion
    // of the window where c is the number of children
    let bottom = (yMax - yMin)/(1 + this.children.length) + yMin;
    rect(xMin, yMin, xMax, bottom);

    // show the children proportional to their size
    let totalSize = 0;
    for (let c of this.children) {
      totalSize += c.getSize();
    }
    let runningSize = 0;
    for (let c of this.children) {
      let left = (xMax - xMin)*runningSize/totalSize + xMin;
      runningSize += c.getSize();
      let right = (xMax - xMin)*runningSize/totalSize + xMin;
      c.show(left, right, bottom, yMax);
    }
    pop();
  }

  print() {
    console.log(this.val);
    for (let c of this.children) {
      c.print();
    }
  }
}
