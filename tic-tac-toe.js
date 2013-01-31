(function(benTTT, undefined) {
    benTTT.canvas = null;
    benTTT.context = null;
    benTTT.x_positions = [0,0,0,0,0,0,0,0,0];
    benTTT.o_positions = [0,0,0,0,0,0,0,0,0];
    benTTT.winning_combinations = [[0,1,2],
                                [7,8,3],
                                [6,5,4],
                                [0,7,6],
                                [1,8,5],
                                [2,3,4],
                                [0,8,4],
                                [6,8,2]];
    benTTT.TOTAL_POSITIONS = benTTT.x_positions.length;
    benTTT.TOTAL_WINNING_COMBINATIONS = benTTT.winning_combinations.length;
    benTTT.x_img = new Image();
    benTTT.o_img = new Image();

    benTTT.init = function() {
      benTTT.canvas = document.getElementById('myCanvas');
      benTTT.canvas.addEventListener("click", benTTT.handle_first_click, false);
      benTTT.context = benTTT.canvas.getContext('2d');
      
      benTTT.x_img.src = 'assets/x.png';
      benTTT.o_img.src = 'assets/o.png';

      benTTT.draw_menu();

      benTTT.add_game_over_element();
    }

    benTTT.get_cursor_position = function(e) {
      var x;
      var y;
      if (e.pageX != undefined && e.pageY != undefined) {
        x = e.pageX;
        y = e.pageY;
      }
      else {
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
      }

      x -= benTTT.canvas.offsetLeft;
      y -= benTTT.canvas.offsetTop;

      if (y < 100) {
        if (x < 100)            { return 0; }
        if (x > 110 && x < 200) { return 1; }
        if (x > 210)            { return 2; }
      }
      if (y > 110 && y < 200) {
        if (x < 100)            { return 7; }
        if (x > 110 && x < 200) { return 8; }
        if (x > 210)            { return 3; } 
      }
      if (y > 210 && y < 300) {
        if (x < 100)            { return 6; }
        if (x > 110 && x < 200) { return 5; }
        if (x > 210)            { return 4; }
      }

      if (y > 380 && y < 400) {
        if (x > 50 && x < 110)  { return "yes"; }
        if (x > 190 && x < 250) { return "no"; }
      }
    }

    benTTT.handle_first_click = function(e) {
      var answer = benTTT.get_cursor_position(e);

      if (typeof(answer) == "string") {
        if (answer == "no") {
          benTTT.make_move('o', 8);
        }

        benTTT.context.clearRect(0, 300, 300, 150);
        benTTT.canvas.removeEventListener("click", benTTT.handle_first_click, false);
        benTTT.canvas.addEventListener("click", benTTT.handle_mouse_click, false);
      }
    }

    benTTT.handle_mouse_click = function(e) {
      var position = benTTT.get_cursor_position(e);

      // only call decide_for_computer() if position was a valid move
      if (benTTT.check_empty(position)){
        benTTT.make_move('x', position);

        var computer_move = benTTT.decide_for_computer(position);
        if (computer_move == -1) {
          benTTT.game_over();
        }
        else {
          benTTT.make_move('o', computer_move);

          var winning_combo_index = benTTT.computer_wins();
          if (winning_combo_index != -1) {
            benTTT.draw_winning_line(winning_combo_index);
            benTTT.game_over();
          }
          else if (benTTT.board_is_full()) {
            benTTT.game_over();
          }
        }
      }
    }

    benTTT.game_over = function() {
      benTTT.draw_game_over_text();
      benTTT.canvas.removeEventListener("click", benTTT.handle_mouse_click, false);
      benTTT.add_game_over_element();
    }

    benTTT.add_game_over_element = function() {
      var game_over_text = document.createElement('p');
      game_over_text.setAttribute('id', benTTT.human_wins());

      document.body.insertBefore(game_over_text, document.body.firstChild.nextSibling.nextSibling);
    }
}(window.benTTT = window.benTTT || {}));

