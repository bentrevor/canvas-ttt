function move_for_computer() {
  if (!human_played_first)
  {
    if (x_clicks() == 1) {
      put_o_in((last_human_move + 3) % 8);
    }
    else {
      try_to_win();
      blocked = false;
      try_to_block();
      if (!blocked) {
        default_move();
      }
    }
  }

  else // if human played first
  {
    console.log("TODO: ai for human playing first")
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
          // alert('game over');
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
  for (var i = 0; i < 8; i++) {
    if (check_empty(i)) {
      put_o_in(i);
      break;
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
