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
                            [6,8,2]];
var TOTAL_POSITIONS = x_positions.length;
var TOTAL_WINNING_COMBINATIONS = winning_combinations.length;
var x_img = new Image();
var o_img = new Image();

function init() {
  canvas = document.getElementById('myCanvas');
  canvas.addEventListener("click", handle_first_click, false);
  context = canvas.getContext('2d');
  
  x_img.src = 'assets/x.png';
  o_img.src = 'assets/o.png';

  draw_menu();
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

  if (y < 100) {
    if (x < 100)            { return 0; }
    if (x > 100 && x < 200) { return 1; }
    if (x > 200)            { return 2; }
  }
  if (y > 100 && y < 200) {
    if (x < 100)            { return 7; }
    if (x > 100 && x < 200) { return 8; }
    if (x > 200)            { return 3; } 
  }
  if (y > 200 && y < 300) {
    if (x < 100)            { return 6; }
    if (x > 100 && x < 200) { return 5; }
    if (x > 200)            { return 4; }
  }

  if (y > 380 && y < 400) {
    if (x > 50 && x < 110)  { return "yes"; }
    if (x > 190 && x < 250) { return "no"; }
  }
}

function handle_first_click(e) {
  var answer = get_cursor_position(e);

  if (typeof(answer) == "string") {
    if (answer == "yes") {
    }
    else if (answer == "no") {
      put_o_in(8);
    }

    context.clearRect(0, 300, 300, 150);
    canvas.removeEventListener("click", handle_first_click, false);
    canvas.addEventListener("click", handle_mouse_click, false);
  }
}

function handle_mouse_click(e) {
  var position = get_cursor_position(e);

  // only call move_for_computer() if position was a valid move
  if (move_for_human(position)){
    computer_move = decide_for_computer(position);
    if (computer_move == -1) {
      draw_game_over_text();
    }

    put_o_in(computer_move);

    var winning_combo_index = computer_wins();
    if (winning_combo_index != -1) {
      draw_winning_line(winning_combo_index);
      draw_game_over_text();
    }
  }
}

// returns a boolean so handle_mouse_click() knows if it was successful
function move_for_human(position) {
  if (check_empty(position)) {
    put_x_in(position);
    return true;
  }
  return false;
}
