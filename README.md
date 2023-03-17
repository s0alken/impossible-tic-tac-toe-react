
# Impossible Tic Tac Toe

The classic Tic Tac Toe game with difficulty levels and online mode. This is a [Frontendmentor challenge](https://www.frontendmentor.io/challenges/tic-tac-toe-game-Re7ZF_E2v). Visit the live demo [HERE](https://impossible-tic-tac-toe-react.netlify.app/).

![screenshot_1](https://user-images.githubusercontent.com/57046544/225476773-5bf5c8b0-88b1-4abb-9040-c0b376dfa498.png)

![screenshot_2](https://user-images.githubusercontent.com/57046544/225476783-5e5bcb59-f342-432d-a466-8ef20ccea184.png)

## Technologies used
 - [React](https://es.reactjs.org/)
 - [Socket.IO](https://socket.io/)
 - [Sass](https://sass-lang.com/)
 - [Express](https://expressjs.com/)
 - [Node](https://nodejs.org/en/)

## How it works

### Difficulty levels

The difficulty levels are implemented by using the [Minimax Algorithm](https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-1-introduction/) which computes all possible moves that a player can make, and then recursively simulates all the possible moves that the opponent can make in response to each of those moves. Also, it makes use of a simple probability function to decide whether to make a perfect move or a random move:

```
const probability = n => {
    return Math.random() < n; //Math.random returns a number greater or equal to 0 and less than 1
}
```

 - Easy: n = -1 (0% chance of making a perfect move).
 - Medium: n = .5 (50% chance of making a perfect move).
 - Hard: n = .75 (75% chance of making a perfect move).
 - Impossible: n = 1 (100% chance of making a perfect move).

### Online mode

The game also includes an online mode that uses WebSockets for real-time communication between players, when a player makes a move, the current board state is sent to the server and then broadcast back to all the clients. 

## Running locally

Install dependencies in both client and server folders

```bash
  npm install
```

Start the server (available at http://localhost:5000)

```bash
  npm start
```

Start the client (available at http://localhost:3000)

```bash
  npm start
```

## Playing the game

When entering the game, you will be prompted to choose your player's mark and the game type:

### Vs CPU

You will be promted to choose the difficulty level, once picked, the game will start. X always makes the first move. To make your move, click on an empty cell on the board. The CPU will make its move automatically.

### Vs Player

You can join a room or create a new room. The game will start automatically when the second player joins the room. The second player's mark will be automatically assigned the opposite of the 1st player's mark.
