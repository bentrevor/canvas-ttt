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


  