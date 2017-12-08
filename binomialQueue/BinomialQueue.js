class BinomialQueue {
  constructor() {
    this.trees = [];
  }

  add(n) {
    let t = new BinomialTree(n);
    this.trees.push(t);
    let merging = true;
    while (merging) {
      merging = false;
      let len = this.trees.length;
      if (len > 1) {
        let tree1 = this.trees[len - 2];
        let tree2 = this.trees[len - 1];
        if (tree1.getSize() == tree2.getSize()) {
          let removal = mergeTrees(tree1, tree2);
          this.trees.splice(len - 1 - removal, 1);
          merging = true;
        }
      }
    }
  }

  show() {
    push();
    // show the trees proportional to their size
    let totalSize = 0;
    for (let c of this.trees) {
      totalSize += c.getSize();
    }
    let runningSize = 0;
    for (let c of this.trees) {
      let left = (width)*runningSize/totalSize;
      runningSize += c.getSize();
      let right = (width)*runningSize/totalSize;
      c.show(left, right, 0, height);
    }
    pop();
  }

  print() {
    for (let t of this.trees) {
      t.print();
    }
  }
}

function mergeTrees(t1, t2) {
  if (t1.getVal() < t2.getVal()) {
    t1.addChild(t2);
    return 0;
  } else {
    t2.addChild(t1);
    return 1;
  }
}
