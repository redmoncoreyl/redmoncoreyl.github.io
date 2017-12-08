class Rubik {
  constructor() {
    this.vals = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [2, 2, 2, 2, 2, 2, 2, 2],
      [3, 3, 3, 3, 3, 3, 3, 3],
      [4, 4, 4, 4, 4, 4, 4, 4],
      [5, 5, 5, 5, 5, 5, 5, 5]
    ];
  }

  copy(r) {
    let c = new Rubik();
    c.setVals(this.vals);
    return c;
  }

  equals(r) {
    let v = r.getVals();
    for (let i = 0; i < this.vals.length; i++) {
      for (let j = 0; j < this.vals[i].length; j++) {
        if (this.vals[i][j] != v[i][j]) {
          return false;
        }
      }
    }
    return true;
  }

  turn(s) {
    let face = this.vals[s].slice();
    face = face.splice(6, 2).concat(face);
    this.vals[s] = face.slice();
    let bars = [];
    if (s == 0) {
      bars.push([4, 0]);
      bars.push([1, 0]);
      bars.push([2, 0]);
      bars.push([3, 0]);
    } else if (s == 1) {
      bars.push([4, 2]);
      bars.push([5, 0]);
      bars.push([2, 6]);
      bars.push([0, 4]);
    } else if (s == 2) {
      bars.push([1, 2]);
      bars.push([5, 2]);
      bars.push([3, 6]);
      bars.push([0, 2]);
    } else if (s == 3) {
      bars.push([2, 2]);
      bars.push([5, 4]);
      bars.push([4, 6]);
      bars.push([0, 0]);
    } else if (s == 4) {
      bars.push([3, 2]);
      bars.push([5, 6]);
      bars.push([1, 6]);
      bars.push([0, 6]);
    } else if (s == 5) {
      bars.push([4, 4]);
      bars.push([3, 4]);
      bars.push([2, 4]);
      bars.push([1, 4]);
    }
    let barVals = [];
    for (let i = 0; i < bars.length; i++) {
      this.vals[bars[i][0]] = this.vals[bars[i][0]].concat(this.vals[bars[i][0]].slice(0, 3));
      let v = this.vals[bars[i][0]].slice(bars[i][1], bars[i][1] + 3);
      this.vals[bars[i][0]].splice(8, 3);
      barVals.push(v);
    }
    barVals = barVals.concat(barVals.splice(0, 1));
    for (let i = 0; i < barVals.length; i++) {
      for (let j = 0; j < barVals[i].length; j++) {
        let len = this.vals[bars[i][0]].length;
        this.vals[bars[i][0]][(bars[i][1]+j)%len] = barVals[i][j];
      }
    }
  }

  show(pos, r) {
    push();
    let h = 0;
    for (let i = 0; i < this.vals[1].length; i++) {
      if (this.vals[1][i] == 1) {
        h++;
      }
    }
    h = map(h, 0, 9, 0, 360);
    let c = color(h, 100, 55, .80);
    fill(c);
    noStroke();
    ellipse((pos.x-width/2)*14/9+width/2, pos.y, r*2);
    pop();
  }

  setVals(v) {
    for (let i = 0; i < this.vals.length; i++) {
      for (let j = 0; j < this.vals[i].length; j++) {
        this.vals[i][j] = v[i][j];
      }
    }
  }

  getVals() {
    return this.vals;
  }
}
