var Key = function(){
  console.log('start');

  this._pressed = {};

  this.LEFT     = 37;
  this.UP       = 38;
  this.RIGHT    = 39;
  this.DOWN     = 40;

  this.bindEvents();
};

Key.prototype.isDown =  function( key ) {
  // console.log(this, key)
  // debugger;
  return !!this._pressed[ key ];
};

Key.prototype.onKeydown =  function(event) {
  console.log('onKeydown', event, this)
  this._pressed[event.keyCode] = true;

  if ( this.isDown( this.UP ) ){
    console.log('moveUp');
  }
  if ( this.isDown( this.LEFT ) ){
    console.log('moveLeft');
  }
  if ( this.isDown( this.DOWN ) ){
    console.log('moveDown');
  }
  if ( this.isDown( this.RIGHT ) ){
    console.log('moveRight');
  }
};

Key.prototype.onKeyup =  function(event) {
  console.log('onKeyup', event, this)
  delete this._pressed[event.keyCode];
};

Key.prototype.bindEvents = function() {
  var scope = this;

  document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('keyup',   scope.onKeyup.bind(scope)  , false);
    window.addEventListener('keydown', scope.onKeydown.bind(scope), false);
  });
};

module.exports = Key