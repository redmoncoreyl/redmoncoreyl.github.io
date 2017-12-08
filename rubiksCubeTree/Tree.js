class Tree {
  constructor() {
    this.states = [];
    this.size = 0;
  }

  generate() {
    let base = new Rubik();
    let working = [];
    let totalCount = 1;
    working.push({state: base, parent: -1, id: 0, level: 0});
    while (working.length > 0) {
      let s = working.splice(0, 1);
      let up = s[0].state.copy();
      up.turn(0);
      up.turn(0);
      let right = s[0].state.copy();
      right.turn(2);
      right.turn(2);
      let left = s[0].state.copy();
      left.turn(4);
      left.turn(4);
      let down = s[0].state.copy();
      down.turn(5);
      down.turn(5);
      let proposed = [up, down, left, right];
      while (proposed.length > 0) {
        let addIt = true;
        for (let i = 0; i < this.size && addIt; i++) {
          if (this.states[i].state.equals(proposed[0])) {
            addIt = false;
          }
        }
        for (let i = 0; i < working.length && addIt; i++) {
          if (working[i].state.equals(proposed[0])) {
            addIt = false;
          }
        }
        let p = proposed.splice(0, 1);
        if (addIt) {
          let newLevel = s[0].level + 1;
          working.push({state: p[0], parent: this.size, id: totalCount++, level: newLevel});
        }
      }
      this.states.push(s[0]);
      this.size++;
    }
  }

  show(lines, r, l, rDecay, lDecay) {
    let working = [];
    working = working.concat(this.states.filter(childFilter(-1)));
    // a state has a rubik, a parent index, an id, level, position, radius, fromAngle, and fromLen
    working[0].position = createVector(width/2, height/2);
    working[0].radius = r;
    working[0].fromAngle = PI/2;
    working[0].fromLen = l;
    while (working.length > 0) {
      working[0].state.show(working[0].position, working[0].radius);
      if (working[0].id != 0 && lines) {
        let x1 = working[0].position.x;
        let y1 = working[0].position.y;
        let x2 = this.states[working[0].parent].position.x;
        let y2 = this.states[working[0].parent].position.y;
        x1 = (x1 - width/2)*14/9 + width/2;
        x2 = (x2 - width/2)*14/9 + width/2;
        line(x1, y1, x2, y2);
      }
      let newAdditions = this.states.filter(childFilter(working[0].id));
      let len = working[0].fromLen*lDecay;
      let r = working[0].radius*rDecay;
      let angleSpread = 2*PI/(newAdditions.length + (working[0].id != 0));
      for (let i = 0; i < newAdditions.length; i++) {
        let angle = working[0].fromAngle + (i + 1)*angleSpread - PI;
        let disp = p5.Vector.fromAngle(angle);
        disp.setMag(len);
        let p = p5.Vector.add(working[0].position, disp);
        newAdditions[i].position = p;
        newAdditions[i].radius = r;
        newAdditions[i].fromAngle = angle;
        newAdditions[i].fromLen = len;
      }
      working = working.concat(newAdditions);
      working.splice(0, 1);
    }
  }
}

function childFilter(n) {
  return function(obj) {
    return (obj.parent == n);
  }
}
