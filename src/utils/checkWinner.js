import isAvailableCells from "./isAvailableCells";

export default function checkWinner(board) {

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];

        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            return {winner: board[a], winnerRow: [a, b, c]};
        }
    }

    if (!isAvailableCells([...board])) return {winner: 'tie', winnerRow: []};

    return null;
}