var canvas;
var context;
var clicks = 0;
var first_question = new Image();
// var open_positions = [0,1,2,3,4,5,6,7,8]
var x_positions = [0,0,0,0,0,0,0,0,0];
var o_positions = [0,0,0,0,0,0,0,0,0];
var human_played_first = false;

function init() {
  canvas = document.getElementById('myCanvas');
  canvas.addEventListener("click", handle_mouse_click, false);
  context = canvas.getContext('2d');

  first_question.onload = function() {
    context.drawImage(first_question, 0, 0);
  }
  first_question.src = 'images/first-question.png'
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
  if (clicks == 0) {
    if (position == 7) {
      // human plays first
      human_played_first = true;
      clicks++;
      draw_grid();
    }
    else if (position == 3) {
      // computer plays first
      clicks++;
      draw_grid();
      put_o_in(8);
    }
  }
  else {
    move_for_computer();
  }

  console.log("x positions: " + x_positions);
  console.log("o positions: " + o_positions);
}