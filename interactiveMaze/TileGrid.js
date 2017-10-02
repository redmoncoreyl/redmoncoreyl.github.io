function TileGrid(tsz) {
  this.tileSize = tsz;
  this.segments = [
    [0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,0,0,0,0,0,1,1,0,0,1],
    [1,1,1,0,0,1,0,1,0,1,0,1],
    [1,1,1,0,1,1,0,0,0,0,0,0],
    [1,1,0,0,0,0,1,0,1,0,0,0],
    [1,1,1,0,0,1,0,1,0,0,0,0],
    [1,1,1,0,0,0,0,1,0,0,0,0],
    [1,1,1,0,1,1,0,0,0,0,1,0],
    [1,1,0,0,0,0,0,1,0,1,0,1],
    [0,0,0,0,0,0,0,0,1,0,0,1],
    [1,0,0,0,0,1,0,0,1,0,0,1],
    [0,0,0,0,0,0,0,0,1,1,1,1],
    [1,1,0,0,0,1,0,0,0,0,0,0],
    [1,0,0,1,0,0,0,1,0,1,0,0],
    [1,0,0,1,0,0,0,1,0,0,1,0],
    [1,1,1,1,1,1,0,0,0,0,0,0],
    [1,1,1,0,0,0,0,1,0,1,0,0],
    [1,1,1,0,0,0,1,0,0,1,1,0],
    [1,1,1,0,0,0,0,1,0,1,0,1],
    [0,1,1,0,0,1,0,1,0,0,0,1],
    [0,0,1,1,0,0,1,0,0,1,0,0],
    [1,0,0,1,1,1,0,0,0,0,0,0],
    [1,1,0,0,1,1,0,0,0,0,0,0],
    [1,0,0,1,0,0,1,0,0,0,1,0],
    [0,0,0,0,0,0,1,1,0,1,1,0],
    [0,0,0,0,0,0,1,0,1,1,0,0],
    [0,0,1,0,0,1,1,0,0,1,0,0]
  ];
  this.nx = floor(width/(this.tileSize*sqrt(3)*3/4));
  this.ny = floor(height/(this.tileSize*3/2));
  this.xoff = (width-this.nx*this.tileSize*sqrt(3)*3/4)/2;
  this.yoff = (height-this.ny*this.tileSize*3/2)/2;
  
  let cx = this.xoff+this.tileSize*sqrt(3)/2;
  let cy = this.yoff+this.tileSize*3/4;
  let orientation = false;
  let cxinc = this.tileSize*sqrt(3)/2;
  let cyinc = this.tileSize*3/2;
  let cyoff = this.tileSize/4;
  
  this.tiles = [];
  for (let i = 0; i < this.ny; i++) {
    orientation = (i%2)==1;
    cx = this.xoff+this.tileSize*sqrt(3)/2;
    cyoff = this.tileSize/4;
    if (orientation) cyoff *= -1;
    for (let j = 0; j < this.nx; j++) {
      this.tiles.push(new Tile(this.segments, orientation, cx, (cy+cyoff), this.tileSize));
      cx += cxinc;
      cyoff *= -1;
      orientation = !orientation;
    }
    cy += cyinc;
  }
}

TileGrid.prototype.show = function() {
  let last = null;
  for (let i = 0; i < this.tiles.length; i++) {
    let current = this.tiles[i].show(0);
    if (current != null) {
      last = current;
    }
  }
  if (last != null) {
    last.show(1);
  }
}

TileGrid.prototype.rotate = function(mx, my) {
  for (let i = 0; i < this.tiles.length; i++) {
    this.tiles[i].rotate(mx, my);
  }
}

TileGrid.prototype.change = function(mx, my, c) {
  for (let i = 0; i < this.tiles.length; i++) {
    this.tiles[i].change(mx, my, c, this.segments);
  }
}