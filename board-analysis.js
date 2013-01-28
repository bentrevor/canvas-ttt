function x_clicks() {
  var clicks = 0;
  for (var i = 0; i < TOTAL_POSITIONS; i++) {
    clicks += x_positions[i];
  }
  return clicks;
}

function human_played_first() {
  var sum_of_x = 0;
  var sum_of_o = 0;
  for (var i = 0; i < TOTAL_POSITIONS; i++) {
    sum_of_o += o_positions[i];
    sum_of_x += x_positions[i];
  }

  return sum_of_x > sum_of_o;
}