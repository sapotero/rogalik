var Queue = function(){
  this.current = 0;
  this.stack = [];
}

Queue.prototype.clear = function() {
  this.stack = [];
};

Queue.prototype.remove = function( index ) {
  if ( this.stack.length > index ) {
    this.stack.splice( index, 1 );
  }
};

Queue.prototype.add = function( event ) {
  this.stack.push( event );
};

Queue.prototype.hasNext = function( event ) {
  var result = false;

  if ( this.stack.length ) {
    result = true;
  }

  return result;
};

Queue.prototype.process = function( event ) {
  this.stack = this.stack.reverse();

  while( this.hasNext() ){
    var event = this.stack.shift();
    console.log( 'event', event );
  }

};


module.exports = Queue