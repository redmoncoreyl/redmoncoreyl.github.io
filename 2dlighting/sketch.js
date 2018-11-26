let segments = [];

function setup() {
  createCanvas(900, 900);
  background(50);
  segments.push(new Segment(204, 325, 363, 216));
  segments.push(new Segment(363, 216, 452, 408));
  segments.push(new Segment(452, 408, 204, 325));

  segments.push(new Segment(294, 721, 509, 688));
  segments.push(new Segment(509, 688, 531, 571));
  segments.push(new Segment(531, 571, 638, 587));
  segments.push(new Segment(638, 587, 649, 774));
  segments.push(new Segment(649, 774, 445, 786));
  segments.push(new Segment(445, 786, 294, 721));

  segments.push(new Segment(671, 105, 681, 262));
  segments.push(new Segment(681, 262, 795, 346));
  segments.push(new Segment(795, 346, 782, 39));
  segments.push(new Segment(782, 39, 671, 105));

  segments.push(new Segment(0, 0, 900, 0));
  segments.push(new Segment(900, 0, 900, 900));
  segments.push(new Segment(900, 900, 0, 900));
  segments.push(new Segment(0, 900, 0, 0));

  segments.push(new Segment(50, 50, 100, 50));
  segments.push(new Segment(150, 50, 200, 50));
  segments.push(new Segment(250, 50, 300, 50));
  segments.push(new Segment(350, 50, 400, 50));
  segments.push(new Segment(450, 50, 500, 50));
  segments.push(new Segment(550, 50, 600, 50));
}

function ccw(p1, p2, p3) {
  return (p2.x - p1.x)*(p3.y - p1.y) - (p2.y - p1.y)*(p3.x - p1.x);
}

function cross2D(r1, r2) {
  return r1.x*r2.y - r1.y*r2.x;
}

function calculateLight(segs, mx, my) {
  if (mx < 0 || mx > width || my < 0 || my > height) {
    return [];
  }
  let rays = [];
  let m = createVector(mx, my);
  for (let i = 0; i < segs.length; i++) {
    let np = createVector(segs[i].x1, segs[i].y1);
    let d1 = p5.Vector.sub(np, m);
    let d2 = d1.copy().rotate(0.0001);
    let d3 = d1.copy().rotate(-0.0001);
    rays.push(d1);
    rays.push(d2);
    rays.push(d3);
  }
  for (let i = 0; i < segs.length; i++) {
    let np = createVector(segs[i].x2, segs[i].y2);
    let d1 = p5.Vector.sub(np, m);
    let d2 = d1.copy().rotate(0.0001);
    let d3 = d1.copy().rotate(-0.0001);
    rays.push(d1);
    rays.push(d2);
    rays.push(d3);
  }
  let zeroV = createVector(0, 0);
  rays.sort(function (a, b) {return ccw(zeroV, a, b);});

  let points = [];
  for (let i = 0; i < rays.length; i++) {
    let bestT = Infinity;
    for (let j = 0; j < segs.length; j++) {
      let inter = segs[j].rayIntersect(m, rays[i]);
      if (inter.v && inter.t > 0 && inter.u >= 0 && inter.u <= 1 && inter.t < bestT) {
        bestT = inter.t;
      }
    }
    points.push(p5.Vector.add(m, p5.Vector.mult(rays[i], bestT)));
  }

  return points;
}

function draw() {
  background(0);
  for (s of segments) {
    s.show();
  }
  let lightPoints = calculateLight(segments, mouseX, mouseY);
  if (lightPoints.length != 0) {
    push();
    noStroke();
    fill(255);
    beginShape();
    for (let i = 0; i < lightPoints.length; i++) {
      vertex(lightPoints[i].x, lightPoints[i].y);
    }
    endShape(CLOSE);
    pop();
  }
}
