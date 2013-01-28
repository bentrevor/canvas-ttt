function x_clicks() {
  return x_positions[0] + x_positions[1] + x_positions[2] + x_positions[3] + 
    x_positions[4] + x_positions[5] + x_positions[6] + x_positions[7] + x_positions[8];
}

function human_played_first() {
  var sum_of_x = 0;
  var sum_of_o = 0;
  for (var i = 0; i < 9; i++) {
    sum_of_o += o_positions[i];
    sum_of_x += x_positions[i];
  }

  return sum_of_x > sum_of_o;
}