function move_for_computer() {
  var position = null;

  if (!human_played_first)
  {
    console.log(clicks);
    if (clicks == 1) {
      position = (last_human_move + 3) % 8;
      console.log("lhm: " + last_human_move);
      console.log("position: " + position);
    }
  }

  else // if human played first
  {

  }

  put_o_in(position);

}