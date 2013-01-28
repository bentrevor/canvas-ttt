function put_x_in(position) {
  // don't need to check_empty() because it is already called in handle_mouse_click()
  place_image(x_img, position);
  x_positions[position] = 1;
  last_human_move = position;
}

function put_o_in(position) {
  if (check_empty(position)){
    place_image(o_img, position);
    o_positions[position] = 1;
  }
}

function draw_winning_line(combo) {
  // the get_x/y_from_position() returns the upper left corner, so adding
  // 50 gives us the center of the position
  var start_x = get_x_from_position(winning_combinations[combo][0]) + 50;
  var start_y = get_y_from_position(winning_combinations[combo][0]) + 50;
  var end_x = get_x_from_position(winning_combinations[combo][2]) + 50;
  var end_y = get_y_from_position(winning_combinations[combo][2]) + 50;
  
  context.lineWidth = 5;
  context.strokeStyle = "red";
  context.lineCap = "round";
  context.beginPath();
  context.moveTo(start_x, start_y);
  context.lineTo(end_x, end_y);
  context.stroke();
  context.closePath();
}

function place_image(image, position) {
  // the get_x/y_from_position() returns the upper left corner of a position,
  // and the x and o images are about 90px by 90px, so adding 5 puts the image
  // of the x or the o in the center of the position
  var x = get_x_from_position(position) + 5;
  var y = get_y_from_position(position) + 5;

  context.drawImage(image, x, y);
}

function get_x_from_position(position) {
  if (position == 8) return 100;

  var coordinate = (parseInt(2.5 * Math.sin(position * .5)) * 100);
  return (coordinate > 0) ? coordinate : 0;
}

function get_y_from_position(position) {
  if (position == 8) return 100;

  var coordinate = (parseInt(2.5 * Math.sin((position - 2) * .5)) * 100);
  return (coordinate > 0) ? coordinate : 0;
}