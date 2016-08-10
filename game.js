var Checkbox = function Checkbox( config ) {
  // console.log( 'new Checkbox ->', config );
  this.config = config;

  this.element = document.createElement('div');
  this.element.classList.add('checkbox');
  this.element.classList.add('form-group');
  

  if ( this.config.drag !== false ) {
    this.element.classList.add('draggable');

    this.handle = document.createElement('span');
    this.handle.classList.add('handle');
    // this.handle.classList.add('handlerWrapper');
    this.handle.textContent = '+';

    this.delete = document.createElement('span');
    this.delete.classList.add('delete');
    this.delete.classList.add('hidden');
    // this.delete.classList.add('handlerWrapper');
    this.delete.textContent = 'x';

    this.element.appendChild(this.handle);
    this.element.appendChild(this.delete);
  }

  this.input = document.createElement('input');
  this.input.type = 'checkbox';
  this.input.id = this.config.id || core.utils.generateId();
  this.input.config = config;

  this.populate();
  this.render();
}

Checkbox.prototype.populate = function(){
  var scope = this;

  [ 'id', 'class', 'text', 'value', 'name' ].map( function( property ){
    if ( scope.config.hasOwnProperty(property) ) {
      scope[ core.utils.toCamelCase('set-' + property) ]();
    };
  });
};
Checkbox.prototype.setName = function( name ){
  if ( name ) {
    this.config.name = name;
  }
  this.input.name = this.config.name;
};
Checkbox.prototype.setText = function( text ){
  if ( text ) {
    this.config.text = text;
  }
  this.input.textContent = this.config.text;
};
Checkbox.prototype.setValue = function( value ){
  if ( value ) {
    this.config.value = value;
  }
  this.input.value = this.config.value;
};
Checkbox.prototype.setId = function( id ){
  if ( id ) {
    this.config.id = id;
  }
  this.input.id = this.config.id;
};
Checkbox.prototype.addChild = function( item ){
  if ( item.hasOwnProperty('element') ) {
    this.element.appendChild( item.element );
  }
};
Checkbox.prototype.export = function(){
  var result = {
    type  : 'checkbox',
    id    : this.input.id,
    class : this.config.class || [],
    text  : this.config.text  || '',
    width : this.config.width || '',
    value : this.config.value || '',
  };

  if ( this.config.childs && this.config.childs.length ) {
    result.childs = [];

    for (var i = 0; i < this.config.childs.length; i++) {
      result.childs.push( this.config.childs[i].export() );
    }
  }

  return result;
};

Checkbox.prototype.setClass = function(_class){
  if ( _class ) {
    this.config.class = _class;
  }
  
  if ( this.config.hasOwnProperty('class') && this.config.class.constructor === Array ) {
    for (var i = 0; i < this.config.class.length; i++) {
      this.element.classList.add( this.config.class[i] );
    }
  } else {
    this.element.className += ' ' + this.config.class;
  }
};

Checkbox.prototype.render = function(){
  
  this.label = document.createElement('label');
  this.element.appendChild( this.label );

  this.label.appendChild( this.input );
  this.label.appendChild( document.createTextNode(this.config.label) );
  
  this.element.config = this;

  this.element.dataset.element = 'checkbox';
  this.element.dataset.type  = this.type;
  this.element.dataset.name  = this.input.name;
  this.element.dataset.width = this.width;
  this.element.dataset.label = this.label.textContent;
  this.element.dataset.value = this.config.value || '';
  
  
  return this;
};

module.exports = Checkbox;