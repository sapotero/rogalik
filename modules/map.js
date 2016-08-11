var Tile = function Tile( config ){
  this.config = config;

  this.x = this.config.x;
  this.y = this.config.y;
  this.visible = this.config.hidden || true;
  this.content = '.';
}
Tile.prototype.tileSize = 16;


var Map = function( config ){
  this.config   = config;
  
  this.size = {
    x: 20,
    y: 20
  }

  this.map = [];

  this.start();
}
Map.prototype.Tile = Tile;
Map.prototype.start = function() {
  var scope = this;
  document.addEventListener('DOMContentLoaded', function () {
    scope.empty();
  })
}

Map.prototype.empty = function() {
  for (var i = 0; i < this.size.x; i++) {
    this.map[i] = [];

    for (var j = 0; j < this.size.x; j++) {
      this.map[i][j] = new this.Tile({
        x: i,
        y: j,
        hidden: false
      });
    }
  }
  core.events.emit('map:ready', this);
};

module.exports = Map