// var size = 32, x, y, cx, cy;
// var map = new Array(size);

// for (var i = 0; i <= size * size; ++i) {
//   map[i] = new Array(size);
// }

// for (x = 1; x <= size; ++x) {
//   for (y = 1; y <= size; ++y) {
//     map[x][y] = 0;
//   }
// }

// var builderSpawned = 0
// var builderMoveDirection = 0;
// var allocatedBlocks = 50;
// var rootX = 16,
//     rootY = 16;
// var stepped = 10;
// var orthogonalAllowed = 0;


// while (allocatedBlocks < ((size * size) / 2)) { //quit when an eighth of the map is filled
//   if (builderSpawned != 1) {

//     cx = 4 + Math.floor( Math.random() * size - 2)
//     cy = 4 + Math.floor( Math.random() * size - 2)


//     if (Math.abs(rootX - cx) <= 0 && Math.abs(rootY - cy) <= 0) {
   
//    if (map[cx][cy] != 1) {
//      map[cx][cy] = 1;
//      allocatedBlocks++;
//    }
//     }
//     else {
//    builderSpawned = 1;
//    builderMoveDirection = Math.floor(Math.random() * 8);
//    stepped = 0;
//     } //end if
//   }
//   else {
//     /* North  */
//     if (builderMoveDirection == 0 && cy > 0) {
//    cy--;
//    stepped++;
//    /* East   */
//     }
//     else if (builderMoveDirection == 1 && cx < size) {
//    cx++;
//    stepped++;
//    /* South  */
//     }
//     else if (builderMoveDirection == 2 && cy < size) {
//    cy++;
//    stepped++;
//    /* West   */
//     }
//     else if (builderMoveDirection == 3 && cx > 0) {
//    cx++;
//    stepped++;
//    /* Northeast */
//     }
//     else if (builderMoveDirection == 4 && cx < size && cy > 0) {
//    cy--;
//    cx++;
//    stepped++;
//    /* Southeast */
//     }
//     else if (builderMoveDirection == 5 && cx < size && cy < size) {
//    cy++;
//    cx++;
//    stepped++;
//    /* Southwest */
//     }
//     else if (builderMoveDirection == 6 && cx > 0 && cy < size) {
//    cy++;
//    cx--;
//    stepped++;
//    /* Northwest */
//     }
//     else if (builderMoveDirection == 7 && cx > 0 && cy > 0) {
//    cy--;
//    cx--;
//    stepped++;
//     }
//      ensure that the builder is touching an existing spot 
//     if (cx < size && cy < size && cx > 1 && cy > 1 && stepped <= 5) {
//    /* East   */
//    if (map[cx + 1][cy] == 1) {
//      if (map[cx][cy] != 1) {
//     map[cx][cy] = 1;
//     allocatedBlocks++;
//      }
//      /* West   */
//    }
//    else if (map[cx - 1][cy] == 1) {
//      if (map[cx][cy] != 1) {
//     map[cx][cy] = 1;
//     allocatedBlocks++;
//      }
//      /* South  */
//    }
//    else if (map[cx][cy + 1] == 1) {
//      if (map[cx][cy] != 1) {
//     map[cx][cy] = 1;
//     allocatedBlocks++;
//      }
//      /* North  */
//    }
//    else if (map[cx][cy - 1] == 1) {
//      if (map[cx][cy] != 1) {
//     map[cx][cy] = 1;
//     allocatedBlocks++;
//      }
//      /* Northeast */
//    }
//    else if (map[cx + 1][cy - 1] == 1) {
//      if (map[cx][cy] != 1) {
//     map[cx][cy] = 1;
//     allocatedBlocks++;
//     if (!orthogonalAllowed) {
//       map[cx + 1][cy] = 1;
//       allocatedBlocks++;
//     }
//      }
//      /* Southeast */
//    }
//    else if (map[cx + 1][cy + 1] == 1) {
//      if (map[cx][cy] != 1) {
//     map[cx][cy] = 1;
//     allocatedBlocks++;
//     if (!orthogonalAllowed) {
//       map[cx + 1][cy] = 1;
//       allocatedBlocks++;
//     }
//      }
//      /* Southwest */
//    }
//    else if (map[cx - 1][cy + 1] == 1) {
//      if (map[cx][cy] != 1) {
//     map[cx][cy] = 1;
//     allocatedBlocks++;
//     if (!orthogonalAllowed) {
//       map[cx - 1][cy] = 1;
//       allocatedBlocks++;
//     }
//      }
//      /* Northwest */
//    }
//    else if (map[cx - 1][cy - 1] == 1) {
//      if (map[cx][cy] != 1) {
//     map[cx][cy] = 1;
//     allocatedBlocks++;
//     if (!orthogonalAllowed) {
//       map[cx - 1][cy] = 1;
//       allocatedBlocks++;
//     }
//      }
//    }
//     }
//     else {
//    builderSpawned = 0;
//     }
//   }
// }

// for (x = 1; x <= size; ++x) {
//   console.log(map[x].join(' ').replace(/0/gm, '□').replace(/1/gm, '.') );
// }


var CHARACTER_TILES = {
  0 : ' ',
  1 : '.',
  2 : '#'
}
 
 
var Generator = function(){
  this.__init__()
}
Generator.prototype.getRandomInt = function(min, max) {

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

Generator.prototype.__init__ = function(  width=32, height=32, max_rooms=15, min_room_xy=5, max_room_xy=10, rooms_overlap=false, random_connections=1, random_spurs=3, tiles=CHARACTER_TILES ) {

  this.width              = width;
  this.height             = height;
  this.max_rooms          = max_rooms;
  this.min_room_xy        = min_room_xy;
  this.max_room_xy        = max_room_xy;
  this.rooms_overlap      = rooms_overlap;
  this.random_connections = random_connections;
  this.random_spurs       = random_spurs;
  this.tiles              = CHARACTER_TILES;
  this.level              = [];
  this.room_list          = [];
  this.corridor_list      = [];
  this.tiles_level        = [];
};
 
Generator.prototype.gen_room = function(){

  var w = this.getRandomInt( this.min_room_xy, this.max_room_xy );
  var h = this.getRandomInt( this.min_room_xy, this.max_room_xy );
  var x = this.getRandomInt( 1, (this.width  - 1) )
  var y = this.getRandomInt( 1, (this.height - 1) )

  return [ x, y, w, h ];
}
 
Generator.prototype.room_overlapping = function(room, room_list){
  var x = room[0];
  var y = room[1];
  var w = room[2];
  var h = room[3];

  room_list.forEach( function(room, room_num){
    if (x > (room[0] + room[2]) || room[0] > (x + w) || y > (room[1] + room[3]) || room[1] > (y + h) ){
      return false
    } else{
      return true
    }
  })


 }
 
Generator.prototype.join_rooms = function(room_1, room_2){

    var x_overlap = false;
    var y_overlap = false;

    var x1 = room_1[0]
    var y1 = room_1[1]
    var w1 = room_1[2]
    var h1 = room_1[3]

    var x2 = room_2[0]
    var y2 = room_2[1]
    var w2 = room_2[2]
    var h2 = room_2[3]


    if ( ((x1 >= x2) && x1 <= (x2 + w2 - 1)) || (((x1 + w1 - 1) >= x2) && x1 + w1 - 1) <= (x2 + w2 - 1))  {
      x_overlap = true
    }

    if ( ((y1 >= y2) && y1 <= (y2 + h2 - 1)) || (((y1 + h1 - 1) >= y2) && y1 + h1 - 1) <= (y2 + h2 - 1)){
      y_overlap = true
    }

    if (x_overlap){
      var tmp_y;
      var tmp_h;
      var rand_x;

      var tmp_x_coords = [x1, x1 + w1 - 1, x2, x2 + w2 - 1]
      tmp_x_coords.sort()

      if ( tmp_x_coords.slice(1,2).pop() == tmp_x_coords.slice(2,3).pop() ){
        rand_x = tmp_x_coords.slice(1, 2).pop();
      } else {
        rand_x = this.getRandomInt(tmp_x_coords.slice(1,2).pop(), ( tmp_x_coords.slice(2,3).pop()) )
      }

      if (y2 >= y1 + h1 - 1){
        tmp_y = y1 + h1
        tmp_h = y2 - (y1 + h1)
      }
      else{
        tmp_y = y2 + h2
        tmp_h = y1 - (y2 + h2)
      }
      this.corridor_list.push([rand_x, tmp_y, 1, tmp_h])
    }

    else if (y_overlap){

      tmp_y_coords = [y1, y1 + h1 - 1, y2, y2 + h2 - 1]
      tmp_y_coords.sort()

      if ( tmp_y_coords.slice(1,2).pop() == tmp_y_coords.slice(2,3).pop() ){
        rand_y = tmp_y_coords.slice(1,2).pop()
      } else {
        rand_y = this.getRandomInt(tmp_y_coords.slice(1,2).pop(), ( tmp_y_coords.slice(2,3).pop()) )
      }

      if (x2 >= x1 + w1){
        tmp_x = x1 + w1
        tmp_w = x2 - (x1 + w1)
      } else {
        tmp_x = x2 + w2
        tmp_w = x1 - (x2 + w2)
      }
      this.corridor_list.push([tmp_x, rand_y, tmp_w, 1])
    }

    else{
      sortable = [room_1, room_2]
      sortable.sort()

      left_bottom = false
      start_on_x = false
      if (sortable[0][1] > sortable[1][1]){
        left_bottom = true
      }
      if (this.getRandomInt(0, 1) == 1){
        start_on_x = true
      }

      if (left_bottom){
        if (start_on_x){
          x1 = (sortable[0][0] + sortable[0][2] - 1) + 1
          y1  = this.getRandomInt(sortable[0][1], ( sortable[0][1] + sortable[0][3] - 1))
          tmp = this.getRandomInt(sortable[1][0], ( sortable[1][0] + sortable[1][2] - 1))
          w1 = (tmp - x1) + 1
          h1 = 1

          x2 = tmp
          y2 = (sortable[1][1] + sortable[1][3] - 1) + 1
          w2 = 1
          h2 = y1 - y2
        }

        else{
          x1 = this.getRandomInt(sortable[0][0], ( sortable[0][0] + sortable[0][2] - 1) )
          y1 = this.getRandomInt(sortable[1][1], ( sortable[1][1] + sortable[1][3] - 1) )
          w1 = 1
          h1 = sortable[0][1] - y1

          x2 = x1
          y2 = y1
          w2 = sortable[1][0] - x1
          h2 = 1
        }

        this.corridor_list.push([x1, y1, w1, h1])
        this.corridor_list.push([x2, y2, w2, h2])
      }
      else{
        if (start_on_x){
          x1 = (sortable[0][0] + sortable[0][2] - 1) + 1
          y1  = this.getRandomInt(sortable[0][1], ( sortable[0][1] + sortable[0][3] - 1) )
          tmp = this.getRandomInt(sortable[1][0], ( sortable[1][0] + sortable[1][2] - 1) )
          w1 = tmp - x1
          h1 = 1

          x2 = tmp
          y2 = y1
          w2 = 1
          h2 = sortable[1][1] - y1
        } else{
          x1 = this.getRandomInt( sortable[0][0], (sortable[0][0] + sortable[0][2] - 1))
          y1 = (sortable[0][1] + sortable[0][3] - 1) + 1
          w1 = 1
          tmp = this.getRandomInt(sortable[1][1], ( sortable[1][1] + sortable[1][3] - 1))
          h1 = tmp - (sortable[0][1] + sortable[0][3] - 1) - 1

          x2 = x1
          y2 = y1 + h1
          w2 = sortable[1][0] - x2
          h2 = 1
        }

        this.corridor_list.push([x1, y1, w1, h1])
        this.corridor_list.push([x2, y2, w2, h2])
      }
  }
}

Generator.prototype.gen_tiles_level = function(){
  var scope = this;
  this.level.forEach(function( row, row_num ){
    tmp_tiles = []
    row.forEach(function( col ){
      if (col == 0){
        tmp_tiles.push(scope.tiles[0])
      }
      if (col == 1){
        tmp_tiles.push(scope.tiles[1])
      }
      if (col == 2){
        tmp_tiles.push(scope.tiles[2])
     }
    });

  scope.tiles_level.push( tmp_tiles.join('') )
  });

  console.log('Room List: ', this.room_list)
  console.log('Corridor List: ', this.corridor_list)

  this.tiles_level.forEach(function( row ){
    console.log( row )
  });
  // console.log( this.tiles_level )
  
}

Generator.prototype.gen_level = function(){
  var scope = this;
  // build an empty dungeon, blank the room and corridor lists
  for (var a = 0; a < this.height; a++) {
    this.level.push( new Array(this.width).fill(0) )
  }

  this.room_list = []
  this.corridor_list = []

  max_iters = this.max_rooms * 5
  // do the random joins
  // console.log( this );

  for (var a = 0; a < max_iters; a++) {
    var tmp_room = this.gen_room()

    if (this.rooms_overlap || this.room_list  ){
      this.room_list.push(tmp_room)
    }
    else{
      tmp_room = this.gen_room()
      tmp_room_list = this.room_list

      if (this.room_overlapping(tmp_room, tmp_room_list.pop() ) == false){
        this.room_list.push(tmp_room)
      }
    }

    if (this.room_list.length >= this.max_rooms){
      break
    }
  }
  console.log( this.room_list, this.room_list.length );

  // connect the rooms
  for (var a = 0; a < this.room_list.length-1; a++) {
    this.join_rooms( this.room_list[a], this.room_list[a + 1] );
  }



  for (var a = 0; a < this.random_connections; a++) {
    room_1 = this.room_list[this.getRandomInt(0, this.room_list.length - 1)]
    room_2 = this.room_list[this.getRandomInt(0, this.room_list.length - 1)]
    this.join_rooms(room_1, room_2);
  }

  // do the spurs
  for (var a = 0; a < this.random_spurs; a++) {
    room_1 = [this.getRandomInt(2, this.width - 2), this.getRandomInt( 2, this.height - 2), 1, 1]
    room_2 = this.room_list[this.getRandomInt(0, this.room_list.length - 1)]
    this.join_rooms(room_1, room_2)
  }

  // fill the map
  // paint rooms
  this.room_list.forEach(function( room, room_num ){
    console.log( '[460] room:', room);
    for (var b = 0; b < room[2]; b++) {
      for (var c = 0; c < room[3]; c++) {
        console.log('scope', scope.level.length, room[1] + c, room[0] + b)
        if ( room[1] + c <= scope.width-1 ) {
          scope.level[room[1] + c -1][room[0] + b] = 1
        }
      }
    }
  });

  // paint corridors
  this.corridor_list.forEach(function( corridor, corr_num ){
    for (var b = 0; b < corridor[2]; b++) {
      for (var c = 0; c < corridor[3]; c++) {
        if ( corridor[1] + c <= scope.width-1 ) {
          scope.level[corridor[1] + c -1][corridor[0] + b] = 1
        }
      }
    }
  });

  // paint the walls
  for (var a = 1; a < this.level.length-1; a++) {
    for (var b = 1; b < this.level[a].length; b++) {
      console.log( '[484] str: ', a, b, this.level[a][b] )
      if (this.level[a][b] == 1){
        if (this.level[a - 1][b - 1] == 0){
          this.level[a - 1][b - 1] = 2
        }

        if (this.level[a - 1][b] == 0){
          this.level[a - 1][b] = 2
        }

        if (this.level[a - 1][b + 1] == 0){
          this.level[a - 1][b + 1] = 2
        }

        if (this.level[a][b - 1] == 0){
          this.level[a][b - 1] = 2
        }

        if (this.level[a][b + 1] == 0){
          this.level[a][b + 1] = 2
        }

        if (this.level[a + 1][b - 1] == 0){
          this.level[a + 1][b - 1] = 2
        }

        if (this.level[a + 1][b] == 0){
          this.level[a + 1][b] = 2
        }

        if (this.level[a + 1][b + 1] == 0){
          this.level[a + 1][b + 1] = 2
        }
      }
    }
  }
}


var gen = new Generator()
gen.gen_level()
gen.gen_tiles_level()