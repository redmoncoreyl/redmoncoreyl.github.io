function Puzzle(psize) {
  this.array = [];
  this.adj = [];
  this.asize = psize*psize;
  this.n = psize;
  for (i = 0; i < this.asize; i++) {
    this.array.push(i+1);
    this.adj.push([]);
    if ((i%this.n) != 0) {
      this.adj[i].push(i-1);
    }
    if ((i%this.n) != this.n-1) {
      this.adj[i].push(i+1);
    }
    if ((floor(i/this.n)) != 0) {
      this.adj[i].push(i-this.n);
    }
    if ((floor(i/this.n)) != this.n-1) {
      this.adj[i].push(i+this.n);
    }
  }
  this.array[this.asize-1] = 0;
  
  this.shuffle = function() {
    for (i = 0; i < 200; i++) {
      var ind = this.array.indexOf(0);
      var swapind = floor(random(0,this.adj[ind].length));
      var swap = this.adj[ind][swapind];
      var temp = this.array[ind];
      this.array[ind] = this.array[swap];
      this.array[swap] = temp;
    }
  }
  
  this.solved = function() {
    var solved = true;
    for (i = 0; i < this.asize-1; i++) {
      if (this.array[i] != i+1) solved = false;
    }
    if (this.array[this.asize-1] != 0) solved = false;
    return solved;
  }
  
  this.update = function (inKey) {
    var ind = this.array.indexOf(0);
    if (inKey == 0) {
      if (floor(ind/this.n) != this.n-1) {
        var temp = this.array[ind];
        this.array[ind] = this.array[ind+this.n];
        this.array[ind+this.n] = temp;
      }
    }
    if (inKey == 1) {
      if (floor(ind/this.n) != 0) {
        var temp = this.array[ind];
        this.array[ind] = this.array[ind-this.n];
        this.array[ind-this.n] = temp;
      }
    }
    if (inKey == 2) {
      if ((ind%this.n) != this.n-1) {
        var temp = this.array[ind];
        this.array[ind] = this.array[ind+1];
        this.array[ind+1] = temp;
      }
    }
    if (inKey == 3) {
      if ((ind%this.n) != 0) {
        var temp = this.array[ind];
        this.array[ind] = this.array[ind-1];
        this.array[ind-1] = temp;
      }
    }
  }
  
  this.show = function() {
    var step = (width-this.n*20-20)/this.n+20;
    var x = 20;
    var y = 20;
    for (i = 0; i < this.asize; i++) {
      if (this.array[i] != 0) {
        noStroke();
        fill(200,200,255);
        rect(x,y,step-20, step-20);
        textSize(step*3/4);
        textFont("Consolas");
        fill(0);
        if (this.array[i] > 9) {
          text(this.array[i], x+step/32, y+step*5/7);
        } else {
          text(this.array[i], x+step/4, y+step*5/7);
        }
      }
      if (i%this.n == this.n-1) {
        x = 20;
        y += step;
      } else {
        x += step;
      }
    }
  }
}