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

  add_game_over_element();
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
    if (x > 110 && x < 200) { return 1; }
    if (x > 210)            { return 2; }
  }
  if (y > 110 && y < 200) {
    if (x < 100)            { return 7; }
    if (x > 110 && x < 200) { return 8; }
    if (x > 210)            { return 3; } 
  }
  if (y > 210 && y < 300) {
    if (x < 100)            { return 6; }
    if (x > 110 && x < 200) { return 5; }
    if (x > 210)            { return 4; }
  }

  if (y > 380 && y < 400) {
    if (x > 50 && x < 110)  { return "yes"; }
    if (x > 190 && x < 250) { return "no"; }
  }
}

function handle_first_click(e) {
  var answer = get_cursor_position(e);

  if (typeof(answer) == "string") {
    if (answer == "no") {
      make_move('o', 8);
    }

    context.clearRect(0, 300, 300, 150);
    canvas.removeEventListener("click", handle_first_click, false);
    canvas.addEventListener("click", handle_mouse_click, false);
  }
}

function handle_mouse_click(e) {
  var position = get_cursor_position(e);

  // only call decide_for_computer() if position was a valid move
  if (check_empty(position)){
    make_move('x', position);

    computer_move = decide_for_computer(position);
    if (computer_move == -1) {
      game_over();
    }
    else {
      make_move('o', computer_move);

      var winning_combo_index = computer_wins();
      if (winning_combo_index != -1) {
        draw_winning_line(winning_combo_index);
        game_over();
      }
      else if (board_is_full()) {
        game_over();
      }
    }
  }
}

function game_over() {
  draw_game_over_text();
  canvas.removeEventListener("click", handle_mouse_click, false);
  add_game_over_element();
}

function add_game_over_element() {
  var game_over_text = document.createElement('p');
  game_over_text.setAttribute('id', human_wins());

  document.body.insertBefore(game_over_text, document.body.firstChild.nextSibling.nextSibling);
}