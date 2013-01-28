var canvas = null;
var context = null;
var x_positions = [0,0,0,0,0,0,0,0,0];
var o_positions = [0,0,0,0,0,0,0,0,0];
var winning_combinations = [[0,1,2],
                            [7,8,3],
                            [6,5,4],
                            [0,7,6],
                            [1,8,5],
                            [2,3,4],
                            [0,8,4],
                            [6,2,8]];
var human_played_first = false;
var game_started = false;
var last_human_move = null;
var blocked = false;
var x_img = new Image();
var o_img = new Image();

function init() {
  canvas = document.getElementById('myCanvas');
  canvas.addEventListener("click", handle_mouse_click, false);
  context = canvas.getContext('2d');
  
  x_img.src = 'assets/x.png';
  o_img.src = 'assets/o.png';
}

function get_cursor_position(e) {
  var x;
  var y;
  if (e.pageX != undefined && e.pageY != undefined) {
    x = e.pageX;
    y = e.pageY;
  }
  else {
    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }

  x -= canvas.offsetLeft;
  y -= canvas.offsetTop;

  if (x < 100) {
    if (y < 100)            { return 0; }
    if (y > 100 && y < 200) { return 7; }
    if (y > 200)            { return 6; }
  }
  if (x > 100 && x < 200) {
    if (y < 100)            { return 1; }
    if (y > 100 && y < 200) { return 8; }
    if (y > 200)            { return 5; } 
  }
  if (x > 200) {
    if (y < 100)            { return 2; }
    if (y > 100 && y < 200) { return 3; }
    if (y > 200)            { return 4; }
  }
}



function handle_mouse_click(e) {
  var position = get_cursor_position(e);

  // handle first click to decide who goes first
  if (!game_started) {
    if (position == 7) {
      // human plays first
      human_played_first = true;
      game_started = true;
    }
    else if (position == 3) {
      // computer plays first
      put_o_in(8);
      game_started = true;
    }
  }
  else if (check_empty(position)){
      put_x_in(position);
      move_for_computer();
  }
}

function x_clicks() {
  return x_positions[0] + x_positions[1] + x_positions[2] + x_positions[3] + 
    x_positions[4] + x_positions[5] + x_positions[6] + x_positions[7] + x_positions[8];
}