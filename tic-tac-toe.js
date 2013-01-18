var canvas;
var context;
var clicks = -1;
var first_question = new Image();


function handle_mouse_click(e) {
  clicks += 1;

  // handle first click to decide who goes first
  if (clicks == 0) {
    context.clearRect(0,0,300,300);

    // draw grid
    context.fillRect(98,0,4,300);
    context.fillRect(198,0,4,300);
    context.fillRect(0,98,300,4);
    context.fillRect(0,198,300,4);

    if (get_cursor_position(e) == 7) {
      human_plays_first();
    }
    else if (get_cursor_position(e) == 3) {
      computer_plays_first();
    }
  }

  var position = get_cursor_position(e);
  draw_x_at(position);

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

function init() {
  canvas = document.getElementById('myCanvas');
  context = canvas.getContext('2d');

  // draw grid
  context.fillRect(98,0,4,300);
  context.fillRect(198,0,4,300);
  context.fillRect(0,98,300,4);
  context.fillRect(0,198,300,4);

  canvas.addEventListener("click", handle_mouse_click, false);

  first_question.onload = function() {
    context.drawImage(first_question, 0, 0);
  }
  first_question.src = 'images/first-question.png'

}

function computer_plays_first() {
  draw_x_at(1);
}
function human_plays_first() {
  draw_x_at(5);
}

