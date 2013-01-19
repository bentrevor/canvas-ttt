function draw_grid() {
  context.clearRect(0,0,300,300);

  context.fillRect(98,0,4,300);
  context.fillRect(198,0,4,300);
  context.fillRect(0,98,300,4);
  context.fillRect(0,198,300,4);
}

function draw_line(start_x, start_y, end_x, end_y) {
  context.beginPath();
  context.moveTo(start_x, start_y);
  context.lineTo(end_x, end_y);
  context.stroke();
  context.closePath();
}

function draw_x(x, y) {
  draw_line(x, y, x + 90, y + 90);
  draw_line(x + 90, y, x, y + 90);
}

function draw_o(x, y) {
  context.beginPath();
  context.arc(x, y, 45, 0, 7, false);
  context.stroke()
  context.closePath();
}

function draw_x_at(position) {
  switch (position) {
    case 0:
      draw_x(5, 5);
      break;
    case 1:
      draw_x(105, 5);
      break;
    case 2:
      draw_x(205, 5);
      break;
    case 3:
      draw_x(205, 105);
      break;
    case 4:
      draw_x(205, 205);
      break;
    case 5:
      draw_x(105, 205);
      break;
    case 6:
      draw_x(5, 205);
      break;
    case 7:
      draw_x(5, 105);
      break;
    case 8:
      draw_x(105, 105);
      break;
  }
}

function draw_o_at(position) {
  switch (position) {
    case 0:
      draw_o(50, 50);
      break;
    case 1:
      draw_o(150, 50);
      break;
    case 2:
      draw_o(250, 50);
      break;
    case 3:
      draw_o(250, 150);
      break;
    case 4:
      draw_o(250, 250);
      break;
    case 5:
      draw_o(150, 250);
      break;
    case 6:
      draw_o(50, 250);
      break;
    case 7:
      draw_o(50, 150);
      break;
    case 8:
      draw_o(150, 150);
      break;
  }
}

function put_x_in(position) {
  // don't need to check_empty() because it is already called in handle_mouse_click()
  draw_x_at(position);
  x_positions[position] = 1;
  last_human_move = position;
}

function put_o_in(position) {
  if (check_empty(position)){
    draw_o_at(position);
    o_positions[position] = 1;
  }
}

function check_empty(position) {
  return x_positions[position] == 0 && o_positions[position] == 0
}

function draw_winning_line(combo) {
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