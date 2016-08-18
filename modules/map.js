var Tile = function Tile( config ){
  this.config = config;

  this.x = this.config.x;
  this.y = this.config.y;
  this.visible = this.config.hidden || true;
  this.content = '.';
}
Tile.prototype.tileSize = 16;

var Room = function( config ){
  this.config = config || {
    min: 4,
    max: 8
  }

  this.dimension = {
    width  : this.getRandomInt( this.config.min, this.config.max ),
    height : this.getRandomInt( this.config.min, this.config.max ),
    coord : {
      x: 0,
      y: 0
    }
  }

  this.tl = {
    x: 0,
    y: 0
  };

  this.br = {
    x: 0,
    y: 0
  };

  return this
}

Room.prototype.getRandomInt = function(min, max) {

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var Map = function( config ){
  this.config = config || {
    size: {
      width  : this.getRandomInt( 10, 40 ),
      height : this.getRandomInt( 10, 40 ),
    },
    rooms: {
      size: {
        min : 5,
        max : 10
      },
      count: 5
    }
  };

  this.roomCount = this.getRandomInt( 5, 10 );
  this._rooms    = [];
  this.celltype = [];


  // this.start();
}

Map.prototype.Tile = Tile;
Map.prototype.Room = Room;

Map.prototype.start = function() {
  var scope = this;
  document.addEventListener('DOMContentLoaded', function () {
    scope.empty();
  })
}

Map.prototype.getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Map.prototype.rooms = function() {
  for (var i = 0; i < this.roomCount; i++) {
    this._rooms.push( new this.Room() );
  }

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