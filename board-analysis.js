(function(benTTT, undefined) {
    benTTT.x_clicks = function() {
      var clicks = 0;
      for (var i = 0; i < benTTT.TOTAL_POSITIONS; i++) {
        clicks += benTTT.x_positions[i];
      }
      return clicks;
    }

    benTTT.human_played_first = function() {
      var sum_of_x = 0;
      var sum_of_o = 0;
      for (var i = 0; i < benTTT.TOTAL_POSITIONS; i++) {
        sum_of_o += benTTT.o_positions[i];
        sum_of_x += benTTT.x_positions[i];
      }

      return sum_of_x > sum_of_o;
    }

    benTTT.check_empty = function(position) {
      return benTTT.x_positions[position] == 0 && benTTT.o_positions[position] == 0;
    }

    // these functions return the larger/smaller of the first two human moves
    benTTT.get_larger = function() {
      for (var i = 0; i < benTTT.TOTAL_POSITIONS; i++) {
        if (benTTT.x_positions[7 - i] == 1) {
          return 7 - i;
        }
      }
    }

    benTTT.get_smaller = function() {
      for (var i = 0; i < benTTT.TOTAL_POSITIONS; i++) {
        if (benTTT.x_positions[i] == 1) {
          return i;
        }
      }
    }

    benTTT.computer_can_win = function() {
      for (var i = 0; i < benTTT.TOTAL_WINNING_COMBINATIONS; i++) {
        var winning_combo = benTTT.winning_combinations[i];

        if ((benTTT.o_positions[winning_combo[0]] + benTTT.o_positions[winning_combo[1]] +
            benTTT.o_positions[winning_combo[2]] == 2) && (benTTT.x_positions[winning_combo[0]] + 
            benTTT.x_positions[winning_combo[1]] + benTTT.x_positions[winning_combo[2]] == 0))
        {
          return i;
        }
      }

      return -1;
    }

    benTTT.human_can_win = function() {
      for (var i = 0; i < benTTT.TOTAL_WINNING_COMBINATIONS; i++) {
        var winning_combo = benTTT.winning_combinations[i];

        if ((benTTT.o_positions[winning_combo[0]] + benTTT.o_positions[winning_combo[1]] +
            benTTT.o_positions[winning_combo[2]] == 0) && (benTTT.x_positions[winning_combo[0]] + 
            benTTT.x_positions[winning_combo[1]] + benTTT.x_positions[winning_combo[2]] == 2))
        {
          return i;
        }
      }

      return -1;
    }

    benTTT.board_is_full = function() {
      for (var i = 0; i < benTTT.TOTAL_POSITIONS; i++) {
        if (benTTT.check_empty(i) == 1) {
          return false;
        }
      }

      return true;
    }

    benTTT.computer_wins = function() {
      for (var i = 0; i < benTTT.TOTAL_WINNING_COMBINATIONS; i++) {
        var winning_combo = benTTT.winning_combinations[i];

        if ((benTTT.o_positions[winning_combo[0]] + benTTT.o_positions[winning_combo[1]] +
            benTTT.o_positions[winning_combo[2]] == 3))
        {
          return i;
        }
      }

      return -1;
    }

    benTTT.human_wins = function() {
      for (var i = 0; i < benTTT.TOTAL_WINNING_COMBINATIONS; i++) {
        var winning_combo = benTTT.winning_combinations[i];

        if ((benTTT.x_positions[winning_combo[0]] + benTTT.x_positions[winning_combo[1]] +
            benTTT.x_positions[winning_combo[2]] == 3))
        {
          return "bad";
        }
      }

      return "good";
    }
}(window.benTTT = window.benTTT || {}));
