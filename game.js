var Events = require('./core/events/events'),
    Utils  = require('./core/utils'),
    Player = require('./core/player'),
    Queue  = require('./core/queue');


var Game = function( config ){
  this.events = new Events();
  this.player = new Player();
  this.queue  = new Queue();
  this.utils  = new Utils();
}

Game.prototype.start = function() {
};

module.exports = new Game()