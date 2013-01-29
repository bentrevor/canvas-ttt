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

function check_empty(position) {
  return x_positions[position] == 0 && o_positions[position] == 0;
}

// these functions return the larger/smaller of the first two human moves
function get_larger() {
  for (var i = 0; i < TOTAL_POSITIONS; i++) {
    if (x_positions[7 - i] == 1) {
      return 7 - i;
    }
  }
}

function get_smaller() {
  for (var i = 0; i < TOTAL_POSITIONS; i++) {
    if (x_positions[i] == 1) {
      return i;
    }
  }
}

function computer_can_win() {
  for (var i = 0; i < TOTAL_WINNING_COMBINATIONS; i++) {
    var winning_combo = winning_combinations[i];

    if ((o_positions[winning_combo[0]] + o_positions[winning_combo[1]] +
        o_positions[winning_combo[2]] == 2) && (x_positions[winning_combo[0]] + 
        x_positions[winning_combo[1]] + x_positions[winning_combo[2]] == 0))
    {
      return i;
    }
  }

  return -1;
}

function human_can_win() {
  for (var i = 0; i < TOTAL_WINNING_COMBINATIONS; i++) {
    var winning_combo = winning_combinations[i];

    if ((o_positions[winning_combo[0]] + o_positions[winning_combo[1]] +
        o_positions[winning_combo[2]] == 0) && (x_positions[winning_combo[0]] + 
        x_positions[winning_combo[1]] + x_positions[winning_combo[2]] == 2))
    {
      return i;
    }
  }

  return -1;
}