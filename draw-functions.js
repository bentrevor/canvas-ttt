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

function draw_x(x, y) {
  context.beginPath();
  context.moveTo(x,y);
  context.lineTo(x + 90,y + 90);
  context.stroke();
  context.closePath();

  context.beginPath();
  context.moveTo(x + 90, y);
  context.lineTo(x, y + 90);
  context.stroke();
  context.closePath();
}

function draw_o(x, y) {
  context.beginPath();
  context.arc(x, y, 45, 0, 7, false);
  context.stroke()
  context.closePath();
}