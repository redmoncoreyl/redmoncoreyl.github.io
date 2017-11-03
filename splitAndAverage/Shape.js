class Shape {
  constructor() {
    this.startPoints = [];
    this.destPoints = [];
    this.animationStep = 1;
    this.isDrawing = true;
    this.isDots = true;
  }

  add(x, y) {
    let newPoint = createVector(x, y);
    this.startPoints.push(newPoint);
    this.destPoints.push(newPoint);
  }

  close() {
    this.isDrawing = false;
  }

  show(isActive) {
    push();
    stroke(255);
    strokeWeight(2);
    noFill();
    if (isActive) {
      stroke(255, 0, 0);
      strokeWeight(4);
    }
    beginShape();
    for(let i = 0; i < this.startPoints.length; i++) {
      let x = map(this.animationStep, 1, 60, this.startPoints[i].x, this.destPoints[i].x);
      let y = map(this.animationStep, 1, 60, this.startPoints[i].y, this.destPoints[i].y);
      vertex(x, y);
    }
    if (this.isDrawing) {
      endShape();
    } else {
      endShape(CLOSE);
    }
    if (this.isDots) {
      push();
      fill(255, 255, 125);
      stroke(0);
      strokeWeight(1);
      for(let i = 0; i < this.startPoints.length; i++) {
        let x = map(this.animationStep, 1, 60, this.startPoints[i].x, this.destPoints[i].x);
        let y = map(this.animationStep, 1, 60, this.startPoints[i].y, this.destPoints[i].y);
        ellipse(x, y, 9);
      }
      pop()
    }
    this.animationStep++;
    if (this.animationStep > 60) {
      this.animationStep = 60;
    }
    pop();
  }

  changeDots() {
    this.isDots = !this.isDots;
  }

  split() {
    for (let i = 0; i < this.destPoints.length; i += 2) {
      let l = this.destPoints.length;
      let x = (this.destPoints[i].x + this.destPoints[(i+1) % l].x) / 2;
      let y = (this.destPoints[i].y + this.destPoints[(i+1) % l].y) / 2;
      let newV = createVector(x, y);
      this.destPoints.splice(i + 1, 0, newV);
    }
    this.startPoints = this.destPoints.slice();
  }

  average(weights) {
    let sum = 0;
    for (let i = 0; i < weights.length; i++) {
      sum += weights[i];
    }
    let newD = [];
    let l = this.destPoints.length;
    for (let i = 0; i < this.destPoints.length; i++) {
      let x = 0;
      let y = 0;
      for (let j = 0; j < weights.length; j++) {
        x += this.destPoints[(i + j) % l].x * weights[j];
        y += this.destPoints[(i + j) % l].y * weights[j];
      }
      x /= sum;
      y /= sum;
      let v = createVector(x, y);
      newD.push(v);
    }
    this.destPoints = newD.slice();
    let shifts = floor((weights.length-1)/2);
    for (let i = 0; i < shifts; i++) {
      let v = this.destPoints.pop();
      this.destPoints.splice(0, 0, v);
    }
    this.animationStep = 1;
  }

  size() {
    return this.startPoints.length;
  }

  duplicate() {
    let newShape = new Shape();
    newShape.startPoints = this.startPoints.slice();
    newShape.destPoints = this.destPoints.slice();
    newShape.animationStep = this.animationStep;
    newShape.isDrawing = this.isDrawing;
    return newShape;
  }
}
