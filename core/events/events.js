var Channel    = require('./channel');
var Subscriber = require('./subscriber');

var Events = function() {
  if (!(this instanceof Events)) {
    return new Events();
  }

  this._channels = new Channel('');
}
Events.prototype.getChannel = function(namespace, readOnly) {
  var channel = this._channels,
      namespaceHierarchy = namespace.split(':'),
      x = 0,
      y = namespaceHierarchy.length;

  if (namespace === '') {
    return channel;
  }

  if (namespaceHierarchy.length > 0) {
    for(x, y; x < y; x++) {

      if (!channel.hasChannel(namespaceHierarchy[x])) {
        if (readOnly) {
          break;
        } else {
          channel.addChannel(namespaceHierarchy[x]);
        }
      }

      channel = channel.returnChannel(namespaceHierarchy[x]);
    }
  }

  return channel;
}
Events.prototype.subscribe = function(channelName, fn, options, context) {
  var channel = this.getChannel(channelName || "", false);

  options = options || {};
  context = context || {};

  return channel.addSubscriber(fn, options, context);
}
Events.prototype.once = function(channelName, fn, options, context) {
  options = options || {};
  options.calls = 1;

  return this.subscribe(channelName, fn, options, context);
}
Events.prototype.getSubscriber = function(identifier, channelName) {
  var channel = this.getChannel(channelName || "", true);
  
  
  if (channel.namespace !== channelName) {
    return null;
  }

  return channel.getSubscriber(identifier);
}
Events.prototype.remove = function(channelName, identifier) {
  var channel = this.getChannel(channelName || "", true);
  if (channel.namespace !== channelName) {
    return false;
  }

  channel.removeSubscriber(identifier);
}
Events.prototype.publish = function(channelName) {
  var channel = this.getChannel(channelName || "", true);
  if (channel.namespace !== channelName) {
    return null;
  }

  var args = Array.prototype.slice.call(arguments, 1);

  args.push(channel);

  channel.publish(args);
}
Events.prototype.on = Events.prototype.subscribe;
Events.prototype.bind = Events.prototype.subscribe;
Events.prototype.emit = Events.prototype.publish;
Events.prototype.trigger = Events.prototype.publish;
Events.prototype.off = Events.prototype.remove;

Events.Channel = Channel;
Events.Subscriber = Subscriber;

module.exports = Events