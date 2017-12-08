class Node {
  constructor(p) {
    this.pos = p.copy();
    this.color = color(random(0, 360), 100, 55, 0.3);
    this.neigh = [];
  }

  connect(n) {
    this.neigh.push(n);
  }

  getPos() {
    return this.pos;
  }

  show() {
    push();
    // sort the neighbors based on their relative headings
    this.neigh.sort(compareRelHeading(this.pos));

    // make an array of angles
    let angles = [];
    let len = this.neigh.length;
    for (let i = 0; i < len; i++) {
      let v1 = p5.Vector.sub(this.neigh[i].getPos(), this.pos);
      let v2 = p5.Vector.sub(this.neigh[(i + 1)%len].getPos(), this.pos);
      let a = p5.Vector.angleBetween(v1, v2);
      angles.push({ang: a, ind: i});
    }

    // remove any angles greater than 180 degrees or less than ~11 degrees
    for (let i = 0; i < angles.length; i++) {
      if (angles[i].ang > PI || angles[i].ang < PI/8) {
        angles.splice(i, 1);
        i--;
      }
    }

    if (angles.length == 0) return;

    // pick an angle at random and show it
    let a = random(angles);
    let v1 = p5.Vector.sub(this.neigh[a.ind].getPos(), this.pos);
    let v2 = p5.Vector.sub(this.neigh[(a.ind + 1)%len].getPos(), this.pos);
    v1.setMag(width + height);
    v2.setMag(width + height);
    let p1 = p5.Vector.add(this.pos, v1);
    let p2 = p5.Vector.add(this.pos, v2);

    fill(this.color);
    noStroke();
    triangle(this.pos.x, this.pos.y, p1.x, p1.y, p2.x, p2.y);
    pop();
  }
}

function compareRelHeading(pos) {
  return function(a, b) {
    let va = p5.Vector.sub(a.getPos(), pos);
    let vb = p5.Vector.sub(b.getPos(), pos);
    return (va.heading() - vb.heading());
  }
}
