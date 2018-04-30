class Agent {
  constructor(id, n, pos, prefSpeed, maxSpeed, r, ksi = 2, dHor = 200, tHor = 150, maxF = 0.5) {
    this.id = id;
    this.blocker = floor(random(0, n));
    while (this.blocker == this.id) {
      this.blocker = floor(random(0, n));
    }
    this.enemy = floor(random(0, n));
    while (this.enemy == this.id || this.enemy == this.blocker) {
      this.enemy = floor(random(0, n));
    }
    this.pos = pos;
    this.vel = createVector(0, 0);
    this.prefSpeed = prefSpeed;
    this.goal = createVector(0, 0);
    this.gVel = createVector(0, 0);
    this.maxSpeed = maxSpeed;
    this.r = r;
    this.ksi = ksi;
    this.dHor = dHor;
    this.tHor = tHor;
    this.force = createVector(0, 0);
    this.maxF = maxF;
  }

  computeForces(allAgents, dt) {
    // compute goal and goal velocity
    this.goal = computeGoal(this, allAgents[this.blocker], allAgents[this.enemy]);
    this.gVel = p5.Vector.sub(this.goal, this.pos).setMag(this.prefSpeed);

    this.force = (p5.Vector.sub(this.gVel, this.vel)).div(this.ksi);
    // filter out far neighbors and self
    let closeNeighbors = allAgents.filter(a =>
      ((p5.Vector.dist(this.pos, a.pos) < this.dHor) && (this.id != a.id)));
    for (let neighbor of closeNeighbors) {
      // determine time to colision (ttc)
      let ttc = timeToCollision(this, neighbor);
      // determine unit force vector (n)
      let unitN = unitAvoidanceForce(this, neighbor, ttc);
      // determine avoidance force
      let avoid = avoidanceForce(unitN, ttc, this.tHor);
      // accumulate the avoidance force
      this.force.add(avoid);
    }
    wallForces(this);

    this.force.limit(this.maxF);
  }

  update() {
    this.vel.add(this.force.mult(dt)); // update the velocity
    this.vel.limit(this.maxSpeed); // limit vel
    this.pos.add(this.vel.mult(dt)); // update the position
  }

  show(allAgents) {
    push();
    let close = color(255, 0, 0);
    let far = color(174, 0, 255);
    colorMode(HSB);
    let percent = max(0, 200 - p5.Vector.dist(this.pos, this.goal))/200;
    fill(lerpColor(far, close, percent));
    // noStroke();
    ellipse(this.pos.x, this.pos.y, this.r);

    pop();
  }
}

function wallForces(agent) {
  if (agent.vel.x > 0) {
    let d = width - agent.pos.x - agent.r;
    let ttc = d/agent.vel.x;
    let unitN = createVector(-1, 0);
    let avoid = avoidanceForce(unitN, ttc, agent.tHor);
    avoid.mult(3);
    agent.force.add(avoid);
  }
  if (agent.vel.x < 0) {
    let d = agent.pos.x - agent.r;
    let ttc = -d/agent.vel.x;
    let unitN = createVector(1, 0);
    let avoid = avoidanceForce(unitN, ttc, agent.tHor);
    avoid.mult(3);
    agent.force.add(avoid);
  }
  if (agent.vel.y > 0) {
    let d = height - agent.pos.y - agent.r;
    let ttc = d/agent.vel.y;
    let unitN = createVector(0, -1);
    let avoid = avoidanceForce(unitN, ttc, agent.tHor);
    avoid.mult(3);
    agent.force.add(avoid);
  }
  if (agent.vel.y < 0) {
    let d = agent.pos.y - agent.r;
    let ttc = -d/agent.vel.y;
    let unitN = createVector(0, 1);
    let avoid = avoidanceForce(unitN, ttc, agent.tHor);
    avoid.mult(3);
    agent.force.add(avoid);
  }
}

function computeGoal(agent, blocker, enemy) {
  let d = (p5.Vector.sub(blocker.pos, enemy.pos)).normalize();
  let y = ((p5.Vector.sub(agent.pos, enemy.pos)).dot(d));
  let goal = p5.Vector.add(enemy.pos, p5.Vector.mult(d, y));
  let u = p5.Vector.sub(enemy.pos, blocker.pos);
  let v = p5.Vector.sub(agent.pos, blocker.pos);
  if (u.dot(v) > 0) {
    goal = blocker.pos;
  }
  if (p5.Vector.dist(goal, blocker.pos) < agent.r + blocker.r) {
    let offset = p5.Vector.sub(blocker.pos, enemy.pos);
    offset.setMag((agent.r + blocker.r));
    goal = p5.Vector.add(blocker.pos, offset);
  }
  return goal;
}

function timeToCollision(agent1, agent2) {
  let r = agent1.r + agent2.r;
  let x = p5.Vector.sub(agent1.pos, agent2.pos);
  let c = x.dot(x) - r*r;
  if (c < 0) { // agents are colliding
    return 0;
  }
  let v = p5.Vector.sub(agent1.vel, agent2.vel);
  let a = v.dot(v);
  let b = x.dot(v);
  if (b > 0) { // agents are moving away
    return Infinity;
  }
  let discr = b*b - a*c;
  if (discr <= 0) {
    return Infinity;
  }
  let ttc = c/(-b + sqrt(discr))
  if (ttc < 0) {
    return Infinity;
  }
  return ttc;
}

function unitAvoidanceForce(agent, other, ttc) {
  let n = createVector(0, 0);
  if (ttc === Infinity) {
    return n;
  }
  let futureAgent = p5.Vector.add(agent.pos, p5.Vector.mult(agent.vel, ttc));
  let futureOther = p5.Vector.add(other.pos, p5.Vector.mult(other.vel, ttc));
  n = p5.Vector.sub(futureAgent, futureOther);
  n.normalize();
  return n;
}

function avoidanceForce(unitV, ttc, timehor) {
    if (ttc === Infinity || ttc == 0) {
      return createVector(0, 0);
    }
    v = p5.Vector.mult(unitV, max(timehor - ttc, 0)/ttc);
    return v;
  }
