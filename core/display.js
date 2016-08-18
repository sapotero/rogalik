var Display = function( config ){
  this.config = config || {};
  this.start();
}


Display.prototype.process = function( Map ) {
  console.log('process', Map);
  var map = Map.map;

  for (var i = 0, length = map.length; i < length; i++) {
    var row = map[i];
    
    for (var j = 0, length = row.length; j < length; j++) {
      var tile = row[j];

      console.log( 'process :', tile );

      this.context.fillStyle = "rgb(0,0,0)";
      this.context.fillRect( tile.x*tile.tileSize, tile.y*tile.tileSize, tile.tileSize, tile.tileSize );

      this.context.strokeStyle = 'rgba(125,0,0,0.25)';
      this.context.rect( tile.x*tile.tileSize, tile.y*tile.tileSize, tile.tileSize, tile.tileSize );
      this.context.stroke();
    }
  }
}

Display.prototype.setCanvas = function() {
  this.canvas = document.querySelector('#core');
  this.context = this.canvas.getContext('2d');
  this.context.fillStyle = "rgb(255,255,255)";
  this.context.fillRect(0, 0, 1000, 1000);

  if ( this.config.hasOwnProperty('width') ) {
    canvas.width = parseInt( this.config.width, 10 );
  }
  if ( this.config.hasOwnProperty('height') ) {
    canvas.height = parseInt( this.config.height, 10 );
  }
}

Display.prototype.start = function() {
  this.setCanvas();
  this.bindEvents();
}

Display.prototype.bindEvents = function() {
  var scope = this;
  
  document.addEventListener('DOMContentLoaded', function () {
    core.events.on('map:ready', function( map ){
      scope.process( map );
    });
  })
};

module.exports = Display