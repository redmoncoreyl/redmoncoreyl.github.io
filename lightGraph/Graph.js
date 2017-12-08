class Graph {
  constructor() {
    this.nodes = [];
    this.size = 0;
  }

  addNode(r) {
    let gettingPoint = true;
    let pos;
    while (gettingPoint) {
      gettingPoint = false;
      pos = createVector(random(width), random(height));
      for (let n of this.nodes) {
        if (distSq(pos, n.getPos()) < r*r) {
          gettingPoint = true;
          break;
        }
      }
    }
    let n = new Node(pos);
    let connections = min(floor(random(2, 5)), this.size);
    shuffleA(this.nodes);
    for (let i = 0; i < connections; i++) {
      n.connect(this.nodes[i]);
      this.nodes[i].connect(n);
    }
    this.nodes.push(n);
    this.size++;
  }

  show() {
    for (let n of this.nodes) {
      n.show();
    }
  }
}

function distSq(a, b) {
  let x = b.x - a.x;
  let y = b.y - a.y;
  return (x*x + y*y);
}

function shuffleA(a) {
  let temp;
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    temp = a[i];
    a[i] = a[j];
    a[j] = temp;
  }
}
