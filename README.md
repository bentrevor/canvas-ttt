Trying to win at tic-tac-toe is an exercise in futility, so rather than create an AI that makes the _best_ move, I made an AI that just avoids losing.  It will win if it can, but it never tries to set up a situation where it has two winning moves - let's call this a "fork".  The only way I could think to try setting up forks would be to hardcode combinations of moves, but I'm not sure that could be considered "AI".

This is how I numbered the board:

    0 1 2
    7 8 3
    6 5 4

This was the convenient for two reasons.  A few times, the Computer has to decide to move relative to the Human's last move, and this numbering scheme makes that easy.  I also took advantage of the fact that all the edge positions are odd and all the corners are even.  The only downside is that it made the code to get the cursor position and to draw X's and O's a little ugly.


#### Strategy

So all the Computer has to do is prevent the Human from setting up a fork, which actually makes any of the Computer's turns pretty simple.  It has three priorities in the game:

1. win (successfully avoid losing the game)
2. block the Human from winning (successfully avoid losing on that turn)
3. prevent the Human from setting up a fork

So the first step of any turn is to always try the first two using a function called `win_or_block()`.  If it can't do either of those things, it's next highest priority is to avoid letting the Human set up a fork.  There's a very limited number of ways a fork can be set up, so this turned out to be pretty simple in many cases.

Tic-tac-toe is a relatively finite game, so it is very possible to hardcode the entire tree of possible moves, but I tried to avoid that as much as I could.  I wanted to give the computer the simplest set of rules possible to prevent it from losing.  If it can win or block, it has to do that, but if the Computer has nowhere to win or block, it needs a default move to fall back on.  I arbitrarily decided it would be the lowest available position on the board, which turned out to be pretty effective in preventing most forks.  The ones that weren't prevented are handled individually.  (This is where the AI can be "improved" to try to play a move that tries to set up a fork, but if it is playing against any reasonably intelligent Human, it won't ever have that opportunity in the first place.)

With the win/block/default rule, it ended up being really simple to prevent most forks.  In general, it is easier to prevent the Human from setting up a fork if the Computer has the center, so it always moves there if it can.  There are a few sequences of moves that can take advantage of the default move, so there are a few cases when the Computer has to move somewhere other than the lowest open position.


##### Computer plays first

When the Computer moves to the center first, there is a simple set of rules to never lose.  Thanks to the symmetry of the board, the Human only has the option of moving to a corner or an edge.  When the Human plays an edge as their first move, there is an easy strategy for the Computer to always set up a fork, which is to play a non-adjacent corner:

    _|_|_       O|_|_       O|_|_
    _|O|_  -->  _|O|_  -->  _|O|_
     |X|         |X|X       O|X|X


So this is just a matter of playing 3 positions away from the Human's last move, which was easy because of the way I numbered the positions.  If the Human plays a corner, there is a unique sequence of moves that gives it a fork:

    _|_|_        _|X|_        X|X|_
    _|O|_  -->   _|O|_  -->   _|O|_
    X| |         X|O|         X|O|O


Since that is the only series of moves that sets up a fork for the Human, the Computer just has to avoid playing an edge next to the corner that the Human played in.  Conveniently, playing 3 positions away from the Human's last move satisfies this, so the rules are simple to prevent the computer from ever losing if it moves first:

1. Move to the center
2. Move 3 positions away from the Human's move  
and for the rest of the moves:
3. Try to win
4. Try to block
5. Move to the lowest open position

##### Human plays first

When the Human moved first, it was a little trickier to prevent forks, but the win/block/default rule still covered most positions.  Again, the Computer tries to play the center as its first move, but the Human may already have moved there.  If that is the case, there is a relatively simple set of rules to follow.  The computer is prone to the same fork described above, so it's first move has to be in a corner, which the default rule sets to the top left (0).

The win/block/default rule forces a tie for every move the Human can make except for the opposite corner (4):

    O|_|_       O|O|_       O|O|X
    _|X|_  -->  _|X|_  -->  _|X|_
     | |         | |X        | |X
 

To prevent this fork, the Computer just needs to move to another one of the corners, or 2 positions away from the Human's last move.

The only other cases I had to cover were if the Human's first move was to a corner or an edge.  If the Human's two first moves need to be blocked, then the game ends in a series of forced blocks where setting up a fork is impossible.  This left four combinations for the Human to win:

    _|_|X
    _|O|_
    X| | 
 
    _|X|_
    _|O|_
    X| |
 
    _|_|_
    _|O|X
     |X| 
 
    _|X|_
    _|O|_
     |X|

There's no way the last one can make a fork, so we don't need to worry about it.  For the third one, the Human can only make a fork if it plays in the corner between his first two moves.  So for the computer's second move, if both moves are on an edge (i.e. both moves are odd), the computer should play the average of them.

The other two patterns can set up forks:

    _|_|X        O|_|X
    _|O|_  -->   _|O|_
    X| |         X| |X
 
    _|_|_        O| |_
    _|O|X  -->   _|O|X
    X| |         X| |X


So I had to check each orientation of these patterns to see which ones led to the Human winning.  The first case (both of the Human's moves are even) is easily solved by taking any edge position.

When the Human moves to a corner and a non-adjacent edge, there are a few orientations that can set up a fork.  In order to prevent this, the Computer just needs to move "between" the Human's moves.  They are 3 positions away in one direction and 5 positions away in the other, so the Computer needs to move in the smaller gap to prevent the Human from setting up a fork.
