class Segment {
  constructor(x1_, y1_, x2_, y2_) {
    this.x1 = x1_;
    this.y1 = y1_;
    this.x2 = x2_;
    this.y2 = y2_;
  }

  show() {
    push();
    strokeWeight(1);
    stroke(255);
    line(this.x1, this.y1, this.x2, this.y2);
    pop();
  }

  rayIntersect(p, r) {
    let q = createVector(this.x1, this.y1);
    let s = createVector(this.x2-this.x1, this.y2-this.y1);
    if (cross2D(r, s) == 0) {
      return {v: false}; // maybe should pick entire line if co-linear...?
    }
    let t = cross2D(p5.Vector.sub(q, p), s) / cross2D(r, s);
    let u = cross2D(p5.Vector.sub(q, p), r) / cross2D(r, s);
    let poi = p5.Vector.add(p, p5.Vector.mult(r, t));
    return {v: true, t: t, u: u, x: poi.x, y: poi.y};
  }
}
