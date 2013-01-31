(function(benTTT, undefined) {
    benTTT.decide_for_computer = function(last_human_move) {
      switch (benTTT.x_clicks()) {
        case 0:
          return 8;

        case 1:
          if (benTTT.check_empty(8)) {
            return 8;
          }
          else if (!benTTT.human_played_first()) {
            return (last_human_move + 3) % 8;
          }

        case 2:
          if (benTTT.x_positions[8] == 1) {
            if (last_human_move == 4) {
              return 2;
            }
          }

          else if (benTTT.human_played_first()) {
            return benTTT.handle_second_click();
          }

        default:
          return benTTT.default_move();
      }
    }

    benTTT.try_to_win = function() {
      var combo_index = benTTT.computer_can_win();
      if (combo_index != -1) {
        for (var i = 0; i < 3; i++) {
          var final_move = benTTT.winning_combinations[combo_index][i];

          if (benTTT.o_positions[final_move] == 0) {
            return final_move;
          }
        }
      }

      return -1;
    }

    benTTT.try_to_block = function() {
      var combo_index = benTTT.human_can_win();
      if (combo_index != -1) {
        for (var i = 0; i < 3; i++) {
          var blocking_move = benTTT.winning_combinations[combo_index][i];

          if (benTTT.x_positions[blocking_move] == 0) {
            return blocking_move;
          }
        }
      }

      return -1;
    }

    benTTT.default_move = function() {
      var move = benTTT.win_or_block();
      if (move != -1) { return move; }
      
      for (var i = 0; i < benTTT.TOTAL_POSITIONS; i++) {
        if (benTTT.check_empty(i)) {
          return i;
          break;
        }
      }

      return -1;
    }

    benTTT.win_or_block = function() {
      var winner = benTTT.try_to_win();
      if (winner != -1) { return winner; }

      var blocker = benTTT.try_to_block();
      if (blocker != -1) { return blocker; }

      return -1;
    }

    // handles special cases for when the human plays non-center first
    benTTT.handle_second_click = function() {
      var required_move = benTTT.win_or_block();
      if (required_move != -1) { return required_move; }
      
      var smaller = benTTT.get_smaller();
      var larger = benTTT.get_larger();

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
    }
}(window.benTTT = window.benTTT || {}));
