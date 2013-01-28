function draw_line(start_x, start_y, end_x, end_y) {
  context.beginPath();
  context.moveTo(start_x, start_y);
  context.lineTo(end_x, end_y);
  context.stroke();
  context.closePath();
}

function put_x_in(position) {
  // don't need to check_empty() because it is already called in handle_mouse_click()
  place_image('assets/x.png', position);
  x_positions[position] = 1;
  last_human_move = position;
}

function put_o_in(position) {
  if (check_empty(position)){
    place_image('assets/o.png', position);
    o_positions[position] = 1;
  }
}

function check_empty(position) {
  return x_positions[position] == 0 && o_positions[position] == 0
}

function draw_winning_line(combo) {
  context.lineWidth = 4;
  context.strokeStyle = "red";
  // alert('called');
  draw_line(20, 50, 280, 50);

  switch (combo) {
    case 0:
      draw_line(20, 50, 280, 50);
      break;
    case 1:
      draw_line(20, 150, 280, 150);
      break;
    case 2:
      draw_line(20, 250, 280, 250);
      break;
    case 3:
      draw_line(50, 20, 50, 280);
      break;
    case 4:
      draw_line(150, 20, 150, 280);
      break;
    case 5:
      draw_line(250, 20, 250, 280);
      break;
    case 6:
      draw_line(20, 20, 280, 280);
      break;
    case 7:
      draw_line(20, 280, 280, 20);
      break;
  }
}

function place_image(path, position) {
  var x = get_x_from_position(position);
  var y = get_y_from_position(position);
  var img = new Image();
  img.onload = function() {
    context.drawImage(img, x + 6, y + 6);
  }
  img.src = path;
}

function get_x_from_position(position) {
  if (position == 8) return 100;
  var answer = (parseInt(2.5 * Math.sin(position * .5)) * 100);
  return (answer > 0) ? answer : 0;
}

function get_y_from_position(position) {
  if (position == 8) return 100;
  var answer = (parseInt(2.5 * Math.sin((position - 2) * .5)) * 100);
  return (answer > 0) ? answer : 0;
}