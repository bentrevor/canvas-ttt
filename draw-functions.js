(function(benTTT, undefined) {
    benTTT.make_move = function(player, position) {
      if (player == 'x') {
        benTTT.place_image(benTTT.x_img, position);
        benTTT.x_positions[position] = 1;
      }

      else if (benTTT.check_empty(position)) {
        benTTT.place_image(benTTT.o_img, position);
        benTTT.o_positions[position] = 1; 
      }
    }

    benTTT.draw_winning_line = function(combo) {
      // the get_x/y_from_position() returns the upper left corner, so adding
      // 50 gives us the center of the position
      var start_x = benTTT.get_x_from_position(benTTT.winning_combinations[combo][0]) + 50;
      var start_y = benTTT.get_y_from_position(benTTT.winning_combinations[combo][0]) + 50;
      var end_x = benTTT.get_x_from_position(benTTT.winning_combinations[combo][2]) + 50;
      var end_y = benTTT.get_y_from_position(benTTT.winning_combinations[combo][2]) + 50;
      
      benTTT.context.lineWidth = 5;
      benTTT.context.strokeStyle = "red";
      benTTT.context.lineCap = "round";
      benTTT.context.beginPath();
      benTTT.context.moveTo(start_x, start_y);
      benTTT.context.lineTo(end_x, end_y);
      benTTT.context.stroke();
      benTTT.context.closePath();
    }

    benTTT.place_image = function(image, position) {
      // the get_x/y_from_position() returns the upper left corner of a position,
      // and the x and o images are about 90px by 90px, so adding 5 puts the image
      // of the x or the o in the center of the position
      var x = benTTT.get_x_from_position(position) + 11;
      var y = benTTT.get_y_from_position(position) + 11;

      benTTT.context.drawImage(image, x, y);
    }

    benTTT.get_x_from_position = function(position) {
      if (position == 8) return 100;

      var coordinate = (parseInt(2.5 * Math.sin(position * .5)) * 100);
      return (coordinate > 0) ? coordinate : 0;
    }

    benTTT.get_y_from_position = function(position) {
      if (position == 8) return 100;

      var coordinate = (parseInt(2.5 * Math.sin((position - 2) * .5)) * 100);
      return (coordinate > 0) ? coordinate : 0;
    }

    benTTT.draw_menu = function() {
      benTTT.context.font = "16pt Arial";
      benTTT.context.fillText("Would you like to go first?", 20, 350);
      benTTT.context.font = "12pt Arial";
      benTTT.context.fillText("yes", 68, 395);
      benTTT.context.fillText("no", 210, 395);

      benTTT.context.strokeRect(50, 380, 60, 20);
      benTTT.context.strokeRect(190, 380, 60, 20);
    }

    benTTT.draw_game_over_text = function() {
      benTTT.context.font = "12pt Arial";
      benTTT.context.fillText("You did not win.", 90, 350);
      benTTT.context.fillText("Refresh the page to play again.", 40, 370);
    }
}(window.benTTT = window.benTTT || {}));
