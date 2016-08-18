var Events = require('./core/events/events'),
  Utils    = require('./core/utils'),
  Player   = require('./core/player'),
  Queue    = require('./core/queue');
  Display  = require('./core/display');
  Keyboard = require('./core/keyboard');
  Map      = require('./modules/map');


var Core = function( config ){
  this.utils    = new Utils();
  this.events   = new Events();
  this.keyboard = new Keyboard();
  this.player   = new Player();
  this.queue    = new Queue();
  this.display  = new Display();
  this.map      = new Map();

  this.bindEvents();
}

Core.prototype.bindEvents = function() {
  var scope = this;

  document.addEventListener('DOMContentLoaded', function () {
  });
}

module.exports = Core