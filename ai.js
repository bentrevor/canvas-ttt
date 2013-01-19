function move_for_computer() {
  if (!human_played_first) {
    switch (x_clicks()) {
      // first move was already to the center position
      case 1: // second move
        put_o_in((last_human_move + 3) % 8);
        break;
      case 4: // after 4 Human moves, the board is full and the game is tied
        default_move();
        game_over();
        break;
      default:
        default_move();
    }
  }

  else if (x_positions[8] == 1) { // if Human played center first
    // console.log("x clicks: " + x_clicks());
    switch (x_clicks()) {
      case 1:
        default_move();
        break;
      case 2:
        if (last_human_move == 4) {
          put_o_in(2);
        }
        else {
          default_move();
        }
        break;
      case 5:
        game_over();
        break;
      default:
        default_move();
    }
  }

  else { // Human played non-center first
    switch (x_clicks()) {
      case 1:
        put_o_in(8);

      // case 2:

    }
  }
}

function try_to_win() {
  // iterate through winning_combinations array
  for (var i = 0; i < 8; i++) {
    var winning_combo = winning_combinations[i];
    // if the Computer has exactly 2 out of 3 positions in any winning combination
    // and the Human doesn't have the other one, the Computer can win
    if ((o_positions[winning_combo[0]] + o_positions[winning_combo[1]] +
        o_positions[winning_combo[2]] == 2) && (x_positions[winning_combo[0]] + 
        x_positions[winning_combo[1]] + x_positions[winning_combo[2]] == 0))
      {
      // find the empty position, fill it in with O, and end the game
      for (var j = 0; j < 3; j++) {
        var final_move = winning_combo[j];

        if (o_positions[final_move] == 0) {
          put_o_in(final_move);
          draw_winning_line(i);
          game_over();
        }
      }
    }
  }
}

function try_to_block() {
  // same logic as the try_to_win() function
  for (var i = 0; i < 8; i++) {
    var winning_combo = winning_combinations[i];

    if ((o_positions[winning_combo[0]] + o_positions[winning_combo[1]] +
        o_positions[winning_combo[2]] == 0) && (x_positions[winning_combo[0]] + 
        x_positions[winning_combo[1]] + x_positions[winning_combo[2]] == 2))
    {
      for (var j = 0; j < 3; j++) {
        var blocking_move = winning_combo[j];

        if (x_positions[blocking_move] == 0) {
          put_o_in(blocking_move);
          blocked = true;
        }
      }
    }
  }
}

function default_move() {
  try_to_win();
  blocked = false;
  try_to_block();
  if (!blocked) {
    for (var i = 0; i < 8; i++) {
      if (check_empty(i)) {
        put_o_in(i);
        break;
      }
    }
  }
}

function game_over() {
  for (var i = 0; i < 8; i++) {
    // prevent any more clicks from registering as valid moves
    x_positions[i] = 1;
    o_positions[i] = 1;
  }

  alert("You didn't win.  Refresh the page to play again.");
}
