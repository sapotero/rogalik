var Events   = require('./core/events/events'),
    Utils    = require('./core/utils'),
    Player   = require('./core/player'),
    Queue    = require('./core/queue');
    Display  = require('./core/display');
    Keyboard = require('./core/keyboard');
    Map      = require('./modules/map');


var Game = function( config ){
  this.events   = new Events();
  this.utils    = new Utils();
  this.player   = new Player();
  this.queue    = new Queue();
  this.display  = new Display();
  this.keyboard = new Keyboard();
  this.map      = new Map();
}

Game.prototype.start = function() {
};

module.exports = new Game()