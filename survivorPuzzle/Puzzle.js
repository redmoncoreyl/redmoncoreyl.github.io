class Puzzle {
  constructor(n = 6, k = 5) {
    // n is the number of tracks
    // k is the number of different balls in each track
    // vals is the values of the tracks
    // selection is the current track selected
    this.n = n;
    this.k = k;
    this.vals = [];
    for (let i = 0; i < this.n - 1; i++) {
      this.vals.push([]);
      for (let j = 0; j < this.k; j++) {
        this.vals[i].push(j);
      }
    }
    this.vals.push([]);
    this.selection = -1;
  }

  shuffle(n = this.n*this.k*50) {
    for (let i = 0; i < n; i++) {
      let randArr1 = random(this.vals.filter(filterOutEmpty));
      let randArr2 = random(this.vals.filter(filterOutFull(this.k)));
      if (randArr1 != randArr2) {
        randArr2.push(randArr1.pop());
      }
    }
  }

  update(x) {
    if (this.selection == -1) {
      let possible = floor(x/(width/this.n));
      if (this.vals[possible].length > 0) {
        this.selection = possible;
      }
    } else {
      let swap = floor(x/(width/this.n));
      if (this.vals[swap].length < this.k || swap == this.selection) {
        this.vals[swap].push(this.vals[this.selection].pop());
        this.selection = -1;
      }
    }
  }

  isSolved() {
    for (let i = 0; i < this.n - 1; i++) {
      for (let j = 0; j < this.k; j++) {
        if (this.vals[i][j] != j) {
          return false;
        }
      }
    }
    return true;
  }

  show() {
    let xSpace = width/(this.n);
    let ySpace = height/(this.k);

    push();
    colorMode(HSB);
    rectMode(CENTER);
    strokeWeight(4);
    stroke(255);
    fill(30);

    // show outer boxes
    for (let i = 0; i < this.n; i ++) {
      stroke(220, 100, 100);
      if (i == this.selection) {
        stroke(0, 100, 100);
      }
      if (i == this.n - 1) {
        fill(15);
      }
      let x = width*i/this.n;
      rect(x + width/this.n/2, height/2, width/this.n-3, height-4);
    }

    // show individual balls
    stroke(255);
    let x = xSpace/2;
    let d = min(xSpace*0.8, ySpace*0.8);
    for (let i = 0; i < this.n; i++) {
      let y = height - ySpace/2;
      for (let j = 0; j < this.vals[i].length; j++) {
        fill(360*this.vals[i][j]/this.k, 100, 100);
        ellipse(x, y, d);
        y -= ySpace;
      }
      x += xSpace;
    }
    pop();
  }
}

function filterOutEmpty(arr) {
  return arr.length > 0;
}

function filterOutFull(maxSize) {
  return function(arr) {
    return arr.length < maxSize;
  }
}
