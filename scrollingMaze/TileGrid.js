function TileGrid(tsz) {
  this.tileSize = tsz;
  this.segments = [
    [1,0,1,0,0,0],
    [1,0,0,1,0,0],
    [0,1,0,1,0,0],
    [0,1,0,1,0,1]
  ];
  this.nx = 22;
  this.ny = 10;
  this.xoff = -100;
  this.yoff = -100;
  
  let cx = this.xoff+this.tileSize*sqrt(3)/2;
  let cy = this.yoff+this.tileSize*3/4;
  let orientation = false;
  let cxinc = this.tileSize*sqrt(3)/2;
  let cyinc = this.tileSize*3/2;
  let cyoff = this.tileSize/4;
  
  this.currentColor = 0;
  this.tiles = [];
  for (let i = 0; i < this.ny; i++) {
    orientation = (i%2)==1;
    cx = this.xoff+this.tileSize*sqrt(3)/2;
    cyoff = this.tileSize/4;
    if (orientation) cyoff *= -1;
    for (let j = 0; j < this.nx; j++) {
      this.tiles.push(new Tile(this.segments, orientation, cx, (cy+cyoff), this.tileSize, color(this.currentColor, 255, 255)));
      cx += cxinc;
      cyoff *= -1;
      orientation = !orientation;
    }
    this.currentColor += 3;
    cy += cyinc;
  }
}

TileGrid.prototype.show = function() {
  for (let i = 0; i < this.tiles.length; i++) {
    this.tiles[i].show();
  }
}

TileGrid.prototype.update = function() {
  for (let i = 0; i < this.tiles.length; i++) {
    this.tiles[i].update(this.segments);
  }
}