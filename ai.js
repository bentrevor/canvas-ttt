function move_for_computer() {
  if (!human_played_first)
  {
    if (x_clicks() == 1) {
      put_o_in((last_human_move + 3) % 8);
    }
    else {
      try_to_win();
      try_to_block();
      default_move();
    }
  }

  else // if human played first
  {
    console.log("TODO: ai for human playing first")
  }
}

function try_to_win() {  
  // put_o_in(position);
}

function try_to_block() {
  // put_o_in(position);
  
}

function default_move() {
  for (var i = 0; i < 8; i++) {
    if (check_empty(i)) {
      put_o_in(i);
      break;
    }
  }
}