function move_for_computer(last_human_move) {
  if (!human_played_first()) {
    switch (x_clicks()) {
      // first move was already to the center position
      case 1: // second move
        return (last_human_move + 3) % 8;
        break;
      case 4: // after 4 Human moves, the board is full and the game is tied
        return default_move();
        game_over();
        break;
      default:
        return default_move();
    }
  }

  else if (x_positions[8] == 1) { // if Human played center first
    switch (x_clicks()) {
      case 1:
        return default_move();
        break;
      case 2:
        if (last_human_move == 4) {
          return 2;
        }
        else {
          return default_move();
        }
        break;
      case 5:
        game_over();
        break;
      default:
        return default_move();
    }
  }

  else { // Human played non-center first
    switch (x_clicks()) {
      case 1:
        return 8;
        break;
      case 2:
        if (win_or_block() != -1) { return win_or_block(); }
        var smaller = get_smaller();
        var larger = get_larger();

        // if first two moves are odd (edges), move exactly between them
        if (smaller % 2 == 1 && larger % 2 == 1) {
          // handle special case
          if (smaller == 1 && larger == 7) {
            return 0;
          }
          else {
            return (smaller + larger)/2;
          }
        }
        
        // if first two moves are opposite corners, move to any edge
        else if (smaller % 2 == 0 && larger - smaller == 4) {
          return 1;
        }

        // if first two moves are corner and non-adjacent edge, move between smaller gap
        else if (larger - smaller == 3) {
          return larger - 1;
        }

        else if (larger - smaller == 5) {
          return (larger + 1) % 8;
        }

        break;
      case 5:
        game_over();
        break;

      default:
        return default_move();
    }
  }
}

function try_to_win() {
  var combo_index = computer_can_win();
  if (combo_index != -1) {
    for (var i = 0; i < 3; i++) {
      var final_move = winning_combinations[combo_index][i];

      if (o_positions[final_move] == 0) {
        game_over();
        draw_winning_line(combo_index);
        return final_move;
      }
    }
  }

  return -1;
}

function try_to_block() {
  var combo_index = human_can_win();
  if (combo_index != -1) {
    for (var i = 0; i < 3; i++) {
      var blocking_move = winning_combinations[combo_index][i];

      if (o_positions[blocking_move] == 0) {
        return blocking_move;
      }
    }
  }

  return -1;
}

function default_move() {
  var move = win_or_block();
  if (move != -1) { return move; }
  if (!blocked) {
    for (var i = 0; i < TOTAL_POSITIONS; i++) {
      if (check_empty(i)) {
        return i;
        break;
      }
    }
  }
}

function win_or_block() {
  var winner = try_to_win();
  if (winner != -1) { return winner; }
  blocked = false;
  var blocker = try_to_block();
  if (blocker != -1) { return blocker; }

  return -1;
}

